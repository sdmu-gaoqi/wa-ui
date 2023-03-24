import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { concatCss, getElementPosition } from '../../utils/utils';
import Show from '../show/show';
import {
  StyledDropDownContent,
  StyledDropDownLine,
  StyledDropDownMask,
  StyledDropDownWrapper,
  StyledMenu,
} from './dropdown.ui';
import { ClassConfig } from '../../../types';
import { useUpdateEffect } from 'react-use';
import { Triangle } from '../../css/global.style';

export interface MenuItem {
  title: React.ReactNode;
  key: string | number;
  suffix?: React.ReactNode;
  desc?: React.ReactNode;
}

export interface Dropdown {
  element?: React.ReactNode;
  line: React.ReactNode;
  classConfig?: ClassConfig;
  closeOnMaskClick?: boolean;
  onVisibleChange?: (open: boolean) => void;
  menu?: MenuItem[];
  defaultKey?: string | number;
  placement?: 'top' | 'bottom';
  onChange?: (item: MenuItem) => void;
  showLine?: boolean;
  icon?: false | React.ReactNode;
}

export interface DropdownRef {
  changeOpen: () => void;
  changeActive: (key: string | number) => void;
}

const Dropdown: ForwardRefRenderFunction<DropdownRef, Dropdown> = (
  props,
  ref,
) => {
  const {
    element,
    line,
    classConfig = { line: '', wrapper: '', mask: '', content: '' },
    closeOnMaskClick = true,
    onVisibleChange,
    menu,
    defaultKey,
    placement = 'bottom',
    onChange,
    showLine = true,
    icon = <Triangle />
  } = props;
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(defaultKey);
  const dataRef = useRef({ overflow: '' }).current

  const maskRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const changeOpen = () => {
    setOpen(!open);
  }

  const clickItem = item => {
    if(!item.key) {
      return
    }
    setActiveKey(item.key);
    onChange && onChange(item)
  };

  const changeActive = (key) => {
    setActiveKey(key)
  }

  useImperativeHandle(ref, () => {
    return {
      changeOpen,
      changeActive
    };
  });

  useLayoutEffect(() => {
    if (open && lineRef?.current) {
      // 计算高度 设置背景
      const top = getElementPosition(lineRef?.current).top;
      const clientTop = showLine ? lineRef?.current?.clientHeight as number : 0;
      const maskTop = top + clientTop;
      if (maskRef.current) {
        const toPlacement = {
          top: 'bottom',
          bottom: 'top'
        }[placement]
        maskRef.current.style[toPlacement] = `${maskTop}px`
      }
      if(open) {
        dataRef.overflow = document.body.style.overflow || 'unset'
        document.body.style.overflow = 'hidden'
      }
    }
    else if(!open) {
      document.body.style.overflow = dataRef.overflow
    }
  }, [open]);

  useUpdateEffect(() => {
    if (onVisibleChange) {
      onVisibleChange(open);
    }
  }, [open]);

  return (
    <>
      <StyledDropDownLine
        onClick={changeOpen}
        className={concatCss(['dropdown-card'], classConfig.line)}
        ref={lineRef}
      >
        {line}
        <div className={concatCss(['dropdown-card-icon'])}>{icon}</div>
      </StyledDropDownLine>
      <div>
        <Show show={open}>
          <StyledDropDownMask
            className={concatCss('dropdown-mask', classConfig.mask)}
            onClick={() => {
              if (closeOnMaskClick) {
                setOpen(false);
                return;
              }
            }}
            ref={maskRef}
          >
            <StyledDropDownWrapper
              className={concatCss('dropdown-wrapper', classConfig.wrapper)}
              onClick={e => e.stopPropagation()}
            >
              <StyledDropDownContent
                className={concatCss('dropdown-content', classConfig.content)}
              >
                <Show show={element && !menu}>{element}</Show>
                <Show show={menu}>
                  <StyledMenu>
                  {menu?.map((item: MenuItem) => {
                    return (
                      <div
                        onClick={() => clickItem(item)}
                        className={concatCss([
                          'dropdown-menu-item',
                          activeKey === item?.key && item.key
                            ? 'dropdown-menu-activeItem'
                            : '',
                        ])}
                        key={item.key}
                      >
                        <div
                          className={concatCss('dropdown-menu-item-content')}
                        >
                          <div
                            className={concatCss(
                              'dropdown-menu-item-content-title',
                            )}
                          >
                            {item.title}
                          </div>
                          <div
                            className={concatCss(
                              'dropdown-menu-item-content-desc',
                            )}
                          >
                            {item.desc}
                          </div>
                        </div>
                        <Show show={item.suffix}>
                          <div
                            className={concatCss(
                              'dropdown-menu-item-suffix',
                            )}
                          >
                            {item.suffix}
                          </div>
                        </Show>
                      </div>
                    );
                  })}
                  </StyledMenu>
                </Show>
              </StyledDropDownContent>
            </StyledDropDownWrapper>
          </StyledDropDownMask>
        </Show>
      </div>
    </>
  );
};

export default forwardRef(Dropdown);

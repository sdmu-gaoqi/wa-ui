import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useDebounce } from 'react-use';
import { concatCss, getElementPosition } from '../../utils/utils';
import Show from '../show/show';
import {
  StyledDropDownContent,
  StyledDropDownLine,
  StyledDropDownMask,
  StyledDropDownWrapper,
} from './dropdown.ui';
import { ClassConfig } from '../../../types';
import { useUpdateEffect } from 'react-use';

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
  closeOnMaskClick: boolean;
  onVisibleChange: (open: boolean) => void;
  menu?: MenuItem[];
  defaultKey?: string | number;
}

export interface DropdownRef {
  changeOpen: () => void;
}

const Dropdown: ForwardRefRenderFunction<DropdownRef, Dropdown> = (
  props,
  ref,
) => {
  const {
    element,
    line,
    classConfig = { line: '', wrapper: '', mask: '', content: '' },
    closeOnMaskClick = false,
    onVisibleChange,
    menu,
    defaultKey,
  } = props;
  const [open, setOpen] = useState(false);
  const [activeKey, setActiveKey] = useState(defaultKey);

  const maskRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const [, changeOpen] = useDebounce(() => {
    setOpen(!open);
  }, 300);

  const clickItem = item => {
    setActiveKey(item.key);
  };

  useImperativeHandle(ref, () => {
    return {
      changeOpen,
    };
  });

  useLayoutEffect(() => {
    if (open) {
      // 计算高度 设置背景
      const top = getElementPosition(lineRef?.current).top;
      const clientTop = lineRef?.current?.clientHeight as number;
      const maskTop = top + clientTop;
      if (maskRef.current) {
        maskRef.current.style.borderTop = `${maskTop}px solid transparent`;
      }
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
      </StyledDropDownLine>
      <div>
        <Show show={open}>
          <StyledDropDownMask
            className={concatCss('dropdown-wrapper', classConfig.mask)}
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
                  {menu?.map((item: MenuItem) => {
                    return (
                      <div
                        onClick={() => clickItem(item)}
                        className={concatCss([
                          'dropdown-menu-item',
                          activeKey === item?.key
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
                              'dropdown-menu-item-content-suffix',
                            )}
                          >
                            {item.suffix}
                          </div>
                        </Show>
                      </div>
                    );
                  })}
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

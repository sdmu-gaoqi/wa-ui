import React from 'react';
import styles from './scrollBar.less';
import _ from 'lodash';
import LeftIcon from './svg/left.svg';
import RightIcon from './svg/right.svg';
import Show from '../show/show';
import { getShouldTransfer, handleTransfer } from '../../utils/utils';

type SCROLLBAR = {
  style?: any;
  wrapperStyle?: any;
  children?: any;
  width?: string | number;
  icons?: Array<any>;
};
type BUTTON = {
  type: 'left' | 'right';
  icons?: any;
  onClick?: any;
};

const ToButton: React.FC<BUTTON> = (props: BUTTON) => {
  const { type, icons, onClick } = props;
  const imgLeft = LeftIcon;
  const imgRight = RightIcon;
  const handleClick = _.debounce(() => {
    onClick && onClick(type);
  }, 0);
  return (
    <>
      <Show show={type === 'left' && _.isEmpty(icons?.[0])}>
        <img src={imgLeft} className={styles.icons} onClick={handleClick} />
      </Show>
      <Show show={type === 'right' && _.isEmpty(icons?.[1])}>
        <img src={imgRight} className={styles.icons} onClick={handleClick} />
      </Show>
      <Show show={type === 'left' && !_.isEmpty(icons)}>
        {!!icons?.[0] &&
          React.cloneElement(icons?.[0], {
            className: styles.icons,
            onClick: handleClick,
          })}
      </Show>
      <Show show={type === 'right' && !_.isEmpty(icons)}>
        {!!icons?.[1] &&
          React.cloneElement(icons?.[1], {
            className: styles.icons,
            onClick: handleClick,
          })}
      </Show>
    </>
  );
};

const ScrollBar: React.FC<SCROLLBAR> = (props: SCROLLBAR) => {
  /**
   * @param {boolean} shouldShowIcon 是否展示移动按钮
   */
  const { children, style = {}, width, icons, wrapperStyle } = props;
  const [shouldShowIcon, setShouldShowIcon] = React.useState<boolean>(false);

  const elementRef: any = React.useRef();
  const wrapperRef: any = React.useRef();

  React.useEffect(() => {
    getShouldTransfer(wrapperRef.current).then((res: any) => {
      setShouldShowIcon(res);
    });
  }, []);

  const onClickToButton = React.useCallback(type => {
    handleTransfer({
      element: elementRef.current,
      type,
    });
  }, []);

  return (
    <div className={styles.body} style={style}>
      <Show show={shouldShowIcon}>
        <ToButton icons={icons} type="left" onClick={onClickToButton} />
      </Show>
      <div
        ref={wrapperRef}
        className={styles.wrapper}
        style={{ width, ...wrapperStyle }}
      >
        <div ref={elementRef} className={`${styles.scrollBar} scrollBar-wa`}>
          {children}
        </div>
      </div>
      <Show show={shouldShowIcon}>
        <ToButton icons={icons} type="right" onClick={onClickToButton} />
      </Show>
    </div>
  );
};

export default ScrollBar;

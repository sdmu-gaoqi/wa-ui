import React, { useState } from 'react';
import { Popup } from '@diezhi/yesio';
import CloseIcon from '@diezhi/yesio/es/icon/close';
import ReactDom from 'react-dom';
import styles from './index.scss';

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const KeyCode = ({ hidden }) => {
  return (
    <div className={styles.keyboard} hidden={hidden}>
      <div className={styles['keyboard-left']}>
        {keys.map((item) => (
          <div className={`${styles['keyboard-code']} ${styles['keyboard-number']}`}>{item}</div>
        ))}
      </div>
      <div className={styles['keyboard-btns']}>
        <div className={styles['keyboard-code']}>
          <CloseIcon />
        </div>
        <div className={styles['keyboard-code']}>确定</div>
      </div>
    </div>
  );
};

/**
 * @param props {React.InputHTMLAttributes<HTMLInputElement>}
 * */
const Input = (props) => {
  const [visible, setVisible] = useState(false);
  const onFocus = () => {
    setVisible(true);
    if (props?.onFocus) {
      props.onFocus();
    }
  };
  const onBlur = () => {
    if (props?.onBlur) {
      props.onBlur();
    }
  };
  return (
    <>
      <div>
        <input
          value={props.value}
          className={`${styles.input} ${props?.className || ''}`}
          onBlur={onBlur}
          onFocus={onFocus}
          readOnly
        />
      </div>
      {ReactDom.createPortal(<KeyCode hidden={!visible} />, document.querySelector('.limit-time-activity-wrapper'))}
      {/* <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        position='bottom'
        closeOnMaskClick
        maskStyle={{ background: 'transparent' }}
        bodyClassName={styles['input-number-keycode']}
      >
        <KeyCode />
      </Popup> */}
    </>
  );
};

export default Input;

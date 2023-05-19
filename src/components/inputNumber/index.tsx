import React, { useEffect, useRef, useState } from 'react';
import ReactDom from 'react-dom';
import './index.scss';
import { cloneDeep, fill, flatMap, isEmpty, isNumber } from 'lodash';
import { useClickOutside } from '../../hooks';
import DeleteIcon from '../../assets/img/delete.png'

type InPutNumberProps = {
  placeholder?: string;
  className?: string;
  max?: number;
  maxLength?: number;
  deleteIcon?: React.ReactNode;
  onOk?: (value: string) => void;
  defaultValue?: number | '';
  decimal?: boolean;
}

type KeyCodeProps = {
  hidden?: boolean;
  onClick?: (value) => void;
  onDelete?: () => void;
}

const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const InputNumber = (props: InPutNumberProps) => {

  const { placeholder = '请输入', defaultValue = '', decimal = false } = props

  const formatDefaultValue = isNumber(defaultValue) ? String(defaultValue) : ''

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(formatDefaultValue)
  const [activeCursor, setActiveCursor] = useState(value?.length - 1 || 0)
  const valueMap = value?.split('') || []

  useEffect(() => {
    const formatDefaultValue = isNumber(defaultValue) ? String(defaultValue) : ''
    setValue(formatDefaultValue)
    setActiveCursor(formatDefaultValue?.length - 1)
  }, [defaultValue])

  const inputRef = useRef(null)
  const keyCodeRef = useRef(null)

  const KeyCode = ({ hidden, onClick, onDelete }: KeyCodeProps) => {
    return (
      <div ref={keyCodeRef} className={'wa-keyboard'} hidden={hidden}>
        <div className={'keyboard-left'}>
          {keys.map((item) => (
            <div className={`keyboard-code keyboard-number ${!Number(item) ? 'keyboard-0' : ''}`} onClick={e => {
              e.stopPropagation()
              if (onClick) {
                onClick(item)
              }
            }}>{item}</div>
          ))}
          { decimal && <div className={`keyboard-code keyboard-decimal`}>.</div> }
        </div>
        <div className={'keyboard-btns'}>
          <div className={'keyboard-code keyboard-delete-code'} onClick={(e) => {
            e.stopPropagation()
            if (onDelete) {
              onDelete()
            }
          }}>
            {props?.deleteIcon ? props.deleteIcon : <img src={DeleteIcon} />}
          </div>
          <div className={'keyboard-code'} onClick={() => {
            if (props?.onOk) {
              props?.onOk(value)
              setVisible(false)
            }
          }}>确定</div>
        </div>
      </div>
    );
  };

  useClickOutside(() => {
    setVisible(false)
  }, [inputRef, keyCodeRef])

  const changeActiveCursor = (index: number) => {
    setActiveCursor(index < 0 ? 0 : index)
  }

  return (
    <>
      <div>
        <div ref={inputRef} className={`wa-input-number ${props.className || ''}`} onClick={(e: any) => {
          setVisible(true)
          if (e.target.classList.contains('wa-input-number-value-item')) {
            const index = [].indexOf.call(e.target.parentNode.querySelectorAll('.wa-input-number-value-item'), e.target)
            changeActiveCursor(index)
          }
          else {
            changeActiveCursor(valueMap.length - 1)
          }
        }}>
          <div className={'wa-input-number-placeholder'} hidden={!isEmpty(value)}>{visible && isEmpty(value) && <span className='wa-input-number-cursor'></span>}{placeholder}</div>

          {valueMap.map((item, index) => {
            return (
              <span className='wa-input-number-value-item' key={index}>{item}{index === activeCursor && <span className='wa-input-number-cursor' />}</span>
            )
          })}
        </div>
      </div>
      {visible && ReactDom.createPortal(<KeyCode hidden={false} onClick={(v) => {
        if (isEmpty(value)) {
          setValue(v)
          changeActiveCursor(0)
          return
        }
        let newValueMap = cloneDeep(valueMap)
        fill(newValueMap, [newValueMap[activeCursor], v], activeCursor, activeCursor + 1)
        newValueMap = flatMap(newValueMap)
        const newValue = newValueMap.join('')
        if (props?.max && Number(newValue) > props?.max) {
          return
        }
        if (props?.maxLength && newValue?.length >= props?.maxLength) {
          return
        }
        setValue(newValue)
        changeActiveCursor(activeCursor + 1)
      }}
        onDelete={() => {
          if (isEmpty(value)) {
            return
          }
          let newValueMap = cloneDeep(valueMap)
          fill(newValueMap, '', activeCursor, activeCursor + 1)
          newValueMap = newValueMap.filter(item => !!item)
          const newValue = newValueMap.join('')
          setValue(newValue)
          changeActiveCursor(activeCursor - 1)
        }}
      />, document.body)}
    </>
  );
};

export default InputNumber;

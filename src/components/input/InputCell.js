import styles from './InputCell.module.css'

import React from 'react'

export default function InputCell({ disabled, index, extraData, type, value, handleChange, name, handleKeyUp, handleBlur, style, extraClassName }) {
  return (
    <input disabled={disabled} className={`${styles.inputCell} ${extraClassName}`} type={type} value={value} onChange={(e) => handleChange(e.target.value, index, name, extraData)} onKeyUp={handleKeyUp} onBlur={handleBlur} style={style}></input>
  )
}

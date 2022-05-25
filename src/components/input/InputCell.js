import styles from './InputCell.module.css'

import React from 'react'

export default function InputCell({ index, type, value, handleChange, name, handleKeyUp, handleBlur, style }) {
  return (
    <input className={styles.inputCell} type={type} value={value} onChange={(e) => handleChange(e.target.value, index, name)} onKeyUp={handleKeyUp} onBlur={handleBlur} style={style}></input>
  )
}

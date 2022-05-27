import { useEffect, useState } from 'react'
import styles from './Button.module.css'

const buttonClasses  = {
  //general
  btn: styles.btn,
  //types
  square: styles.btnSquare,
  circle: styles.btnCircle,
  //colors
  red: styles.btnRed,
  green: styles.btnGreen,
  //sizes
  regular: styles.btnRegular,
  medium: styles.btnMedium,
  small: styles.btnSmall
}
export default function Button({label, onClick, type='square', size='regular', color}) {

  const className = `${buttonClasses.btn} ${buttonClasses[type]} ${buttonClasses[size]} ${buttonClasses[color]}`
  

  return (
    <button className={className} onClick={onClick}>{label}</button>
  )
}

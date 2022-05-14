import styles from './Button.module.css'


export default function Button({label, onClick, color='green'}) {
  return (
    <button className={` ${styles.btn} ${color === 'red' ? styles.btnRed : styles.btnGreen}`} onClick={onClick}>{label}</button>
  )
}

import styles from './Modal.module.css'


export default function Modal({ children, text, onBackgroundClick }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <span className={styles.modalText}>{text}</span>
        {children}
      </div>
      <div className={styles.modalBackground} onClick={onBackgroundClick}></div>
    </div>
  )
}

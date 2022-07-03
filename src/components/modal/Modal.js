import Icon from '../Icon/Icon'
import styles from './Modal.module.css'


export default function Modal({ children, text, onClose }) {
  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <span className={styles.modalText}>{text}</span>
        <div className={styles.closeIcon} tabIndex='0'>
          <Icon name='closeIcon' handleIconClick={onClose}/>
        </div>
        {children}
      </div>
      <div className={styles.modalBackground} onClick={onClose}></div>
    </div>
  )
}

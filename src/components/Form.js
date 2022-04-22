import Button from './Button'
import styles from './Form.module.css'

export default function Form({ children, buttonLabel, onSubmit }) {
  
  return (
    <div className={styles.formContainer}>
      <form onSubmit={onSubmit}>
        {children}
        <Button label={buttonLabel} />
      </form>
    </div>
  )
}

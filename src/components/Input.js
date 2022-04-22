import styles from './Input.module.css'

export default function Input({ text, type, value, onChange }) {
  return (
    <label className={styles.label}>
      <span>{text}</span>
      <input 
        className={styles.input} 
        required 
        type={type} 
        onChange={(e) => onChange(e.target.value)} 
        value={value}
      />
    </label>
  )
}

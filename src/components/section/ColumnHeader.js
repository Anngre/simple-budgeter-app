import styles from './ColumnHeader.module.css'

export default function ColumnHeader({text, size, style}) {
  return (
    <span className={size === 'small' ? styles.columnHeaderSmall : styles.columnHeaderRegular} style={style}>{text}</span>
  )
}

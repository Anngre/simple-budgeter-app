import styles from './ColumnHeader.module.css'

export default function ColumnHeader({text, size, style, extraClassName}) {

  return (
    <span className={size === 'small' ? `${styles.columnHeaderSmall} ${extraClassName}` : `${styles.columnHeaderRegular} ${extraClassName}`} style={style}>{text}</span>
  )
}

import Button from '../components/button/Button'
import styles from './SectionTitle.module.css'

export default function SectionTitle({title, handleAddClick, handleDelClick}) {
  return (
    <div className={styles.titleContainer}>
        <h4 className={styles.title}>{title}</h4>
        <Button label='+' onClick={handleAddClick}/>
        <Button label='-' onClick={handleDelClick} color='red'/>
      </div>
  )
}

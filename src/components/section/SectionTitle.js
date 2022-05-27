import Button from '../button/Button'
import Icon from '../Icon/Icon'
import styles from './SectionTitle.module.css'

export default function SectionTitle({title, handleAddClick, handleDelClick, isExpandable, size}) {
  const buttonSize = size === 'small' ? 'small' : 'medium'
  return (
    <div className={styles.titleContainer}>
        <h4 className={size === 'small' ? styles.titleSmall : styles.titleRegular}>{title}</h4>
        {isExpandable && 
        <div className={styles.icon} tabIndex='0'>
          <Icon name='showIcon' /> 
          {/* <Icon name='hideIcon' /> */}
        </div>}
        <div className={styles.buttonsContainer}>
          <Button label='+' onClick={handleAddClick} type='circle' size={buttonSize} color='green'/>
          <Button label='-' onClick={handleDelClick} type='circle' size={buttonSize} color='red'/>
        </div>
      </div>
  )
}

import Button from '../button/Button'
import Icon from '../Icon/Icon'
import styles from './SectionTitle.module.css'

export default function SectionTitle({title, handleAddClick, handleDelClick, handleIconClick, index, isContainerVisible, size}) {
  const buttonSize = size === 'small' ? 'small' : 'medium'
  return (
    <div className={styles.titleContainer}>
        <h4 className={size === 'small' ? styles.titleSmall : styles.titleRegular}>{title}</h4>
        {isContainerVisible !== undefined && 
          <Icon name={isContainerVisible ? 'hideIcon' : 'showIcon'} handleIconClick={handleIconClick} index={index}/>
        }
        <div className={styles.buttonsContainer}>
          <Button label='+' onClick={() => handleAddClick(index)} type='circle' size={buttonSize} color='green'/>
          <Button label='-' onClick={() => handleDelClick(index)} type='circle' size={buttonSize} color='red'/>
        </div>
      </div>
  )
}

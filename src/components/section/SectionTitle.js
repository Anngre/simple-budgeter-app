import { useState } from 'react'
import Button from '../button/Button'
import Icon from '../Icon/Icon'
import styles from './SectionTitle.module.css'

export default function SectionTitle({title, handleAddClick, handleDelClick, handleIconClick, index, isContainerVisible, size}) {
  const buttonSize = size === 'small' ? 'small' : 'medium'
  return (
    <div className={styles.titleContainer}>
        <h4 className={size === 'small' ? styles.titleSmall : styles.titleRegular}>{title}</h4>
        {isContainerVisible !== undefined && 
        <div className={styles.icon} onClick={() => handleIconClick(index)} tabIndex='0'>
          <Icon name={isContainerVisible ? 'hideIcon' : 'showIcon'} />
        </div>}
        <div className={styles.buttonsContainer}>
          <Button label='+' onClick={handleAddClick} type='circle' size={buttonSize} color='green'/>
          <Button label='-' onClick={handleDelClick} type='circle' size={buttonSize} color='red'/>
        </div>
      </div>
  )
}

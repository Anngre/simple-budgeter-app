import styles from './Icon.module.css'

export default function Icon({name, handleIconClick}) {
  switch (name) {
    case 'showIcon':
      return (
        <div className={styles.icon} onClick={handleIconClick} tabIndex='0'>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill='#343a40'><path d="M10 10.958 4.833 5.792 6.208 4.438 10 8.229 13.792 4.438 15.167 5.792ZM10 16.062 4.833 10.917 6.208 9.542 10 13.333 13.792 9.542 15.167 10.917Z"/></svg>
        </div>
      )
    case 'hideIcon':
      return (
        <div className={styles.icon} onClick={handleIconClick} tabIndex='0'>
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.208 10.375 5 9.167 10 4.167 15 9.167 13.792 10.375 10 6.583ZM6.208 15.333 5 14.125 10 9.125 15 14.125 13.792 15.333 10 11.542Z"/></svg>
        </div>
      )
    case 'closeIcon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" onClick={handleIconClick}><path d="M6.4 19 5 17.6l5.6-5.6L5 6.4 6.4 5l5.6 5.6L17.6 5 19 6.4 13.4 12l5.6 5.6-1.4 1.4-5.6-5.6Z"/></svg>
      )
    default:
      return
  }
}

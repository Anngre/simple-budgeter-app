import { useThemeContext } from '../../hooks/useThemeContext'
import styles from './Icon.module.css'

export default function Icon({name, handleIconClick}) {
  const { isDarkModeActive } = useThemeContext()
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

    case 'themeIcon':
      return (
      <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" onClick={handleIconClick} style={{ filter: isDarkModeActive ? 'invert(100%)' : 'invert(30%)'}}><path d="m12 23.4-3.375-3.325h-4.7v-4.7L.6 12l3.325-3.375v-4.7h4.7L12 .6l3.375 3.325h4.7v4.7L23.4 12l-3.325 3.375v4.7h-4.7Zm0-5.6q2.425 0 4.113-1.687Q17.8 14.425 17.8 12q0-2.425-1.687-4.113Q14.425 6.2 12 6.2Zm0 2.4 2.425-2.4H17.8v-3.375L20.225 12 17.8 9.575V6.2h-3.375L12 3.775 9.575 6.2H6.2v3.375L3.8 12l2.4 2.425V17.8h3.375Zm0-8.2Z"/></svg>)

    case 'menuIcon':
      return  (
        <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" onClick={handleIconClick}><path d="M12 19.275q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.063q.437-.437 1.062-.437t1.062.437q.438.438.438 1.063t-.438 1.062q-.437.438-1.062.438Zm0-5.775q-.625 0-1.062-.438Q10.5 12.625 10.5 12t.438-1.062Q11.375 10.5 12 10.5t1.062.438q.438.437.438 1.062t-.438 1.062q-.437.438-1.062.438Zm0-5.775q-.625 0-1.062-.438-.438-.437-.438-1.062t.438-1.063q.437-.437 1.062-.437t1.062.437q.438.438.438 1.063t-.438 1.062q-.437.438-1.062.438Z"/></svg>
      )

    case 'expandIcon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="18px" viewBox="0 0 24 24" width="18px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
      )
      
    case 'deleteIcon':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      )
    default:
      return
  }
}

import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import {CSSTransition} from 'react-transition-group'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import Icon from '../Icon/Icon'
import Sidebar from '../sidebar/Sidebar'
import styles from './Navbar.module.css'

export default function Navbar({ isNarrowScreen }) {
  const { user } = useAuthContext()
  const { logout, error, isPending } = useLogout()
  const { isDarkModeActive } = useThemeContext()
  const [isSidebarVisible, setIsSidebarVisible] = useState(false)

  const handleClick = async () => {
    await logout()
  }

  const { updateDocument } = useUpdateDocument()

  const toggleThemeMode = () => {
    updateDocument('users', user.uid, {
      themeMode: isDarkModeActive ? 'light' : 'dark',
    })
  }

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible)
  }


  if (isPending) {
    return <Spinner />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      <div className={styles.navbar}>
        <ul className={styles.navbarList}>
          <li className={styles.logo}>
            <span>Simple Budgeter</span>
            <div className={styles.logoElement}/>
          </li>
           {!user ? 
           (<>
              <li><NavLink className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} to='/login'>Login</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink} to='/signup'>Signup</NavLink></li>
            </>) : (<>
              <li><Button label='Logout' onClick={handleClick} color='green'/></li>
              <li className={styles.iconContainer} tabIndex='0'>
                <Icon name='modeIcon' handleIconClick={toggleThemeMode} />   
              </li>    
              {isNarrowScreen && <li className={styles.iconContainer} tabIndex='0'>
                <Icon name='menuIcon' handleIconClick={toggleSidebar} />   
              </li>}
            </>)} 
        </ul>
      </div>
      {isNarrowScreen && <>
        <CSSTransition in={isSidebarVisible} timeout={400} classNames='sidebar-transition' unmountOnExit={true} appear={true}>
            <Sidebar onListItemClick={toggleSidebar}/>
        </CSSTransition>
        <CSSTransition in={isSidebarVisible} timeout={400} classNames='overlay-transition' unmountOnExit={true} appear={true}>
        <div className={styles.overlay} onClick={() => setIsSidebarVisible(false)}/></CSSTransition>
      </>
        }
       
    </>
     
  )
}

import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { useThemeContext } from '../../hooks/useThemeContext'
import { useUpdateDocument } from '../../hooks/useUpdateDocument'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'
import Icon from '../Icon/Icon'

import styles from './Navbar.module.css'

export default function Navbar() {
  const { user } = useAuthContext()
  const { logout, error, isPending } = useLogout()
  const { isDarkModeActive } = useThemeContext()

  const handleClick = async () => {
    await logout()
  }

  const { updateDocument } = useUpdateDocument()

  const toggleThemeMode = () => {
    updateDocument('users', user.uid, {
      themeMode: isDarkModeActive ? 'light' : 'dark',
    })
  }

  if (isPending) {
    return <Spinner />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
        <div className={styles.navbar}>
          <ul>
            <li className={styles.logo}>
              <span>Simple Budgeter</span>
              <div className={styles.logoElement}/>
            </li>
            {!user ? 
            (<>
              <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/login'>Login</NavLink></li>
              <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/signup'>Signup</NavLink></li>
            </>) : (<>
              <li><Button label='Logout' onClick={handleClick} color='green'/></li>
              <li className={styles.iconContainer}>
                <Icon name='modeIcon' handleIconClick={toggleThemeMode}/>   
              </li>    
            </>)} 
          </ul>
      </div>
     
  )
}

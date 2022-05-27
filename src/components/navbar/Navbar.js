import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import Button from '../button/Button'
import Spinner from '../spinner/Spinner'
import Error from '../error/Error'

import styles from './Navbar.module.css'

export default function Navbar() {
  const { user } = useAuthContext()
  const { logout, error, isPending } = useLogout()

  const handleClick = async () => {
    await logout()
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
          <li className={styles.logo}>Simple Budgeter</li>
          {!user ? 
          (<>
            <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/login'>Login</NavLink></li>
            <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/signup'>Signup</NavLink></li>
          </>) : (<li><Button label='Logout' onClick={handleClick} color='green'/></li>)}     
        </ul>
      </div>
     
  )
}

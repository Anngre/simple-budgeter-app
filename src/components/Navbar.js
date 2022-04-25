import { NavLink } from 'react-router-dom'
import Button from './Button'

import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.logo}>Simple Budgeter</li>
        <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/login'>Login</NavLink></li>
        <li><NavLink className={({ isActive }) => isActive ? styles.active : ''} to='/signup'>Signup</NavLink></li>
        <li><Button label='Logout'/></li>
      </ul>
    </div>
  )
}

import { Link } from 'react-router-dom'
import Button from './Button'

import styles from './Navbar.module.css'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <ul>
        <li className={styles.logo}>Simple Budgeter</li>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/signup'>Signup</Link></li>
        <li><Button label='Logout'/></li>
      </ul>
    </div>
  )
}

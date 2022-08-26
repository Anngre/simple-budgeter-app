import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useGetSelectedDocument } from '../../hooks/useGetSelectedDocument'
import Icon from '../Icon/Icon'
import Button from '../button/Button'
import styles from './Sidebar.module.css'

export default function Sidebar({ onListItemClick, isNarrowScreen, toggleThemeMode, onLogout }) {
  const { user } = useAuthContext()
  const budgetsListClause = useMemo(() => {
    return ["createdBy",  "==", user.uid]
  }, [user.uid])
  const { documents } = useGetSelectedDocument('budgets', budgetsListClause)
  const budgetsList = documents.sort((a, b) => b.createdAt  - a.createdAt)

  return (
    <div className={styles.sidebar}>
      {isNarrowScreen && <div className={styles.nav}>
        <div className={styles.iconContainer} tabIndex='0'>
          <Icon name='themeIcon' handleIconClick={toggleThemeMode} />   
        </div>
        <Button label='Logout' onClick={onLogout} color='green' size='small' style={{width: '30%'}}/>
      </div>}
      {budgetsList.length > 0 && <ul className={styles.budgetsList}>
        <li className={styles.listTitle}>Your budgets:</li>
        {budgetsList.map((budget, i) => {
        return (<li key={i} onClick={onListItemClick}>
          <NavLink to={i === 0 ? '/' : `/${budget.docID}`} className={({ isActive }) => isActive ? styles.active : styles.inactive}><span>{i === 0 ? 'Current budget' : budget.budgetTitle}</span></NavLink>
        </li> )
        })}
      </ul>}
    </div>
  )
}

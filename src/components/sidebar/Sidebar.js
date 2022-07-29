import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useGetSelectedDocument } from '../../hooks/useGetSelectedDocument'
import styles from './Sidebar.module.css'

export default function Sidebar({ onListItemClick }) {
  const { user } = useAuthContext()
  const { documents } = useGetSelectedDocument('budgets', ["createdBy",  "==", user.uid])
  const budgetsList = documents.sort((a, b) => b.createdAt  - a.createdAt)

  return (
    <div className={styles.sidebar}>
      <ul className={styles.budgetsList}>
        <li className={styles.listTitle}>Your budgets:</li>
        {budgetsList.map((budget, i) => {
        return (<li key={i} onClick={onListItemClick}>
          <NavLink to={i === 0 ? '/' : `/${budget.docID}`} className={({ isActive }) => isActive ? styles.active : styles.inactive}><span>{i === 0 ? 'Current budget' : budget.budgetTitle}</span></NavLink>
        </li> )
        })}
      </ul>
    </div>
  )
}

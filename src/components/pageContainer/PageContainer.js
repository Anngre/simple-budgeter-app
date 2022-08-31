import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { useNarrowScreen } from '../../hooks/useNarrowScreen'
import styles from './PageContainer.module.css'

export default function PageContainer({ children, isSidebarVisible=true }) {
  const isNarrowScreen = useNarrowScreen()
  return (
    <div className={styles.container}>
      <Navbar />
      {!isNarrowScreen && isSidebarVisible && <Sidebar />}
      {children}
    </div>
  )
}

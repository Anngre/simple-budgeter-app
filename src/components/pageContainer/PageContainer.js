import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import styles from './PageContainer.module.css'

export default function PageContainer({ children, isSidebarVisible=true }) {
  
  return (
    <div className={styles.container}>
      <Navbar />
      {isSidebarVisible && <Sidebar />}
      {children}
    </div>
  )
}

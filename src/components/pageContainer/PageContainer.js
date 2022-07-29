import { useEffect, useState } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import styles from './PageContainer.module.css'

export default function PageContainer({ children, isSidebarVisible=true }) {
  const mediaWatcher = window.matchMedia('(max-width: 1000px)')
  const [isNarrowScreen, setIsNarrowScreen] = useState(mediaWatcher.matches)

  useEffect(() => {
    const updateIsNarrowScreen = (e) => {
      setIsNarrowScreen(e.matches)
    }

    mediaWatcher.addEventListener('change', updateIsNarrowScreen)

    return () => {
      mediaWatcher.removeEventListener('change', updateIsNarrowScreen)
    }
  },[mediaWatcher])
  
  
  return (
    <div className={styles.container}>
      <Navbar isNarrowScreen={isNarrowScreen}/>
      {!isNarrowScreen && isSidebarVisible && <Sidebar />}
      {children}
    </div>
  )
}

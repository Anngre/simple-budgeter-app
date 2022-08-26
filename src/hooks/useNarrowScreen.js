import { useEffect, useState } from 'react'

export  const useNarrowScreen = () => {
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

  return isNarrowScreen  
}
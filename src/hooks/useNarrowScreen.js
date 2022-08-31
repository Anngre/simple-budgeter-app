import { useEffect, useRef, useState } from 'react'

export  const useNarrowScreen = () => {
  const mediaWatcher = useRef(window.matchMedia('(max-width: 1000px)'))
  const [isNarrowScreen, setIsNarrowScreen] = useState(mediaWatcher.current.matches)

  useEffect(() => {
    const updateIsNarrowScreen = (e) => {
      setIsNarrowScreen(e.matches)
    }

    mediaWatcher.current.addEventListener('change', updateIsNarrowScreen)

    return () => {
      mediaWatcher.current.removeEventListener('change', updateIsNarrowScreen)
    }
  },[])

  return isNarrowScreen  
}
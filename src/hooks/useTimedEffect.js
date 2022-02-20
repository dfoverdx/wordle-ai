import { useEffect } from 'react'
import moment from 'moment'

const useTimedEffect = 
  (cb, time, deps) => {
    useEffect(() => {
      const handle = setTimeout(
        cb,
        moment(time).diff(moment(), 'ms')
      )
      
      return () => clearTimeout(handle)
    }, deps)
  }

export default useTimedEffect
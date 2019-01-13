import { useState, useEffect } from 'react'




export default ms => {
  const [ state, setState ] = useState(Date.now())

  useEffect(() => {
    const interval = setInterval(() => setState(Date.now()), ms)
    return () => {
      clearInterval(interval)
    }
  })

  return state
}

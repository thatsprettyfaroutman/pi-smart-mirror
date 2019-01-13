import { useState, useEffect } from 'react'
import { path } from 'ramda'
import { timeout } from 'utils'




const API_URL = process.env.REACT_APP_API_URL




let sharedPromise = null




const getSettings = async () => {
  sharedPromise = sharedPromise || fetch(`${API_URL}/settings`)
  const res = await sharedPromise
  sharedPromise = null

  if ( res.status !== 200 ) {
    await timeout(5000)
    return getSettings()
  }

  return res.clone().json()
}




const sanitizeResponse = res =>
  path([0, 'settings'], res)




export default () => {
  const [ state, setState ] = useState(null)

  const updateSettings = async () => {
    const settings = await getSettings()
    const sanitizedSettings = sanitizeResponse(settings)
    setState(sanitizedSettings)
  }

  useEffect(() => {
    updateSettings()
    const interval = setInterval(updateSettings, 60 * 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return state
}

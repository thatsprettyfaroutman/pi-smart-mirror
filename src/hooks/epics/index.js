import { useState, useEffect } from 'react'
import { isFuture } from 'date-fns'
import { timeout } from 'utils'




const API_URL = process.env.REACT_APP_API_URL




let sharedPromise = null
const getEpics = async () => {
  sharedPromise = sharedPromise || fetch(`${API_URL}/epics`)
  const res = await sharedPromise
  sharedPromise = null

  if ( res.status !== 200 ) {
    await timeout(5000)
    return getEpics()
  }

  return res.clone().json()
}




const sanitizeResponse = res => res
  .filter(({ date }) => isFuture(new Date(date)))





export default () => {
  const [ state, setState ] = useState(undefined)
  const [ loading, setLoading ] = useState(true)
  const [ fetching, setFetching ] = useState(false)

  const updateState = async () => {
    if ( fetching ) return
    if ( !state ) setLoading(true)
    setFetching(true)
    try {
      const epics = await getEpics()
      const sanitizedEpics = sanitizeResponse(epics)
      setState(sanitizedEpics)
      setLoading(false)
      setFetching(false)
    } catch (error) {
      setFetching(false)
      console.log(error)
    }
  }

  useEffect(() => {
    updateState()
  }, [
    new Date().getHours() // Fetch new items only once per hour
  ])

  return state
}

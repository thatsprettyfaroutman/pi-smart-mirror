import { useState, useEffect } from 'react'
import { isFuture } from 'date-fns'
import { timeout } from 'utils'
import useLoaderCount from 'hooks/loaderCount'




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
  const [ epics, setEpics ] = useState(undefined)
  const [ loading, setLoading ] = useState(true)
  const [ fetching, setFetching ] = useState(false)
  const [ addLoader, removeLoader ] = useLoaderCount().slice(1)

  const updateState = async () => {
    if ( fetching ) return
    if ( !epics ) setLoading(true)
    setFetching(true)
    addLoader()
    try {
      const epics = await getEpics()
      const sanitizedEpics = sanitizeResponse(epics)
      setEpics(sanitizedEpics)
      setLoading(false)
    } catch (error) {}
    setFetching(false)
    removeLoader()
  }

  useEffect(() => {
    updateState()
  }, [
    new Date().getHours() // Fetch new items only once per hour
  ])

  return { epics, loading }
}

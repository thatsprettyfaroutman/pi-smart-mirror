import { useState, useEffect } from 'react'
import { getStationData } from './helpers'
import useLoaderCount from 'hooks/loaderCount'



const sanitizeResponse = res => res




export default weatherStation => {
  const [ weather, setWeather ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ fetching, setFetching ] = useState(false)
  const [ addLoader, removeLoader ] = useLoaderCount().slice(1)

  const updateState = async () => {
    if ( fetching ) return
    if ( !weather ) setLoading(true)
    setFetching(true)
    addLoader()
    try {
      const weather = await getStationData(weatherStation)
      const sanitizedWeather = sanitizeResponse(weather)
      setWeather(sanitizedWeather)
      setLoading(false)
    } catch (error) {}
    setFetching(false)
    removeLoader()
  }

  useEffect(() => {
    updateState()
  }, [
    `${ new Date().getMinutes() } ${ weatherStation }`,
  ])

  return { ...weather, loading }
}

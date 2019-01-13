import { useState, useEffect } from 'react'
import { getStationData } from './helpers'




const sanitizeResponse = res => res




export default weatherStation => {
  const [ weather, setWeather ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ fetching, setFetching ] = useState(false)

  const updateState = async () => {
    if ( fetching ) return
    if ( !weather ) setLoading(true)
    setFetching(true)
    try {
      const weather = await getStationData(weatherStation)
      const sanitizedWeather = sanitizeResponse(weather)
      setWeather(sanitizedWeather)
      setLoading(false)
      setFetching(false)
    } catch (error) {
      setFetching(false)
    }
  }

  useEffect(() => {
    updateState()
  }, [
    `${ new Date().getMinutes() } ${ weatherStation }`,
  ])

  return { ...weather, loading }
}

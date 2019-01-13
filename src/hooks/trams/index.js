import { useState, useEffect } from 'react'
import { addSeconds } from 'date-fns'
import { getPlans } from './helpers'




const sanitizeResponse = (offsetSeconds, plans) => plans
  .map(([line, seconds]) => [line, seconds - offsetSeconds])
  .filter(([line, seconds]) => seconds > (offsetSeconds - 60) * -1)




export default ( props = {} ) => {
  const {
    from,
    to,
    offsetSeconds,
  } = props
  const [ plan, setPlan ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ fetching, setFetching ] = useState(false)

  const updateState = async () => {
    if ( fetching ) return
    if ( !plan ) setLoading(true)
    setFetching(true)
    try {
      const when = addSeconds(new Date(), offsetSeconds)
      const plans = await getPlans(from, to, when)
      const sanitizedPlans = sanitizeResponse(offsetSeconds, plans)
      setPlan(sanitizedPlans[0] || null)
      setLoading(false)
      setFetching(false)
    } catch (error) {
      setFetching(false)
      // console.log(error)
    }
  }

  useEffect(() => {
    updateState()
  }, [
    `${new Date().getSeconds()} ${JSON.stringify(props)}` // remount if props change
  ])

  return { plan, loading }
}
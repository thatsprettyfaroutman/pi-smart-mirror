import React from 'react'
import styled from 'styled-components'
import useSettings from 'hooks/settings'
import useTrams from 'hooks/trams'
import useTick from 'hooks/tick'




const Trams = styled.div`

`




const NOW_LIMIT = 60
const HURRY_LIMIT = -1 * 60




const TramsComponent = () => {
  useTick(10000)
  const settings = useSettings()

  const trams = useTrams({
    from: settings && settings.homeLocation,
    to: settings && settings.workLocation,
    offsetSeconds: settings && settings.secondsToGetOut,
  })

  const { loading, plan } = trams

  if ( loading ) return (
    <Trams>Loading</Trams>
  )

  if ( !plan ) return (
    <Trams>No routes</Trams>
  )

  const [ line, seconds ] = plan
  let message = `in ${ Math.floor(seconds / 60) }`
  if ( seconds <= NOW_LIMIT ) message = 'now'
  if ( seconds <= HURRY_LIMIT ) message = 'hurry'

  return (
    <Trams>
      { line } { message }
    </Trams>
  )
}

export default TramsComponent

import React from 'react'
import styled from 'styled-components'
import useSettings from 'hooks/settings'
import useTrams from 'hooks/trams'
import useTick from 'hooks/tick'
import Loading from 'components/Loading'
import LCDNumber from 'components/LCDNumber'




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
    <Trams>
      <Loading
        // tick={ 1000 / 5}
        // wrapper={ LCDNumber }
        // wrapperProps={{
        //   pixelSize: 1,
        //   pixelGroup: 4,
        //   pixelSpacing: 2,
        //   letterSpacing: 12,
        // }}
      />
    </Trams>
  )

  if ( !plan ) return (
    <Trams>No routes</Trams>
  )

  const [ line, seconds ] = plan
  let message = `${ Math.floor(seconds / 60) }`
  if ( seconds <= NOW_LIMIT ) message = 'go'
  if ( seconds <= HURRY_LIMIT ) message = 'hurry'

  return (
    <Trams>
      <LCDNumber
        pixelSize={ 1 }
        pixelGroup={ 4 }
        pixelSpacing={ 2 }
        letterSpacing={ 12 }
        children={ `${line} > ${message}` }
      />
    </Trams>
  )
}

export default TramsComponent

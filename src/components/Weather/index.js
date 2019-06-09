import React from 'react'
import styled from 'styled-components'
import useSettings from 'hooks/settings'
import useWeather from 'hooks/weather'
import useTick from 'hooks/tick'
import Loading from 'components/Loading'

import RainDrop from './RainDrop'
import SnowFlake from './SnowFlake'

const Weather = styled.span`
  > svg {
    display: inline-block;
    margin: 0;
    margin-right: 20px;
    height: 20px;
    width: auto;
  }
`

const WeatherComponent = () => {
  useTick(60000)
  const settings = useSettings()
  const weather = useWeather(settings && settings.weatherStation)

  const { temp, rain, loading } = weather

  if (loading)
    return (
      <Weather>
        <Loading />
      </Weather>
    )

  return (
    <Weather>
      {rain ? temp < 1 ? <SnowFlake /> : <RainDrop /> : null}
      {isNaN(temp) ? '◇' : temp}°
    </Weather>
  )
}

export default WeatherComponent

import React from 'react'
import styled from 'styled-components'
import useSettings from 'hooks/settings'
import useWeather from 'hooks/weather'
import useTick from 'hooks/tick'
import Loading from 'components/Loading'
import rainIcon from './raindrop.svg'
import snowIcon from './snowflake.svg'




const Weather = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  font-size: 60px;

  > img {
    display: block;
    margin: 0;
    margin-right: 20px;
    height: 30px;
    width: auto;
  }
`



const WeatherComponent = () => {
  useTick(60000)
  const settings = useSettings()
  const weather = useWeather(settings && settings.weatherStation)

  let { temp, rain, loading } = weather


  if ( loading ) return (
    <Weather>
      <Loading />
    </Weather>
  )

  return (
    <Weather>
      { rain && <img src={ temp < 1 ? snowIcon : rainIcon } alt="rain"/> }
      { isNaN(temp) ? '◇' : temp }°
    </Weather>
  )
}




export default WeatherComponent

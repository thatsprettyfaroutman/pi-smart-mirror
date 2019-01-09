import React, { Component } from 'react'
import styled from 'styled-components'
import { last } from 'ramda'
import rainIcon from './raindrop.svg'
import snowIcon from './snowflake.svg'




const Weather = styled.div`
  display: flex;
  flex-direction: row;
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




async function getStationData(station) {
  const WEATHER_URL = 'https://cors-anywhere.herokuapp.com/https://en.ilmatieteenlaitos.fi/observation-data?station='

  if (!station) {
    throw new Error('Station not defined')
  }

  const res = await fetch(`${WEATHER_URL}${station}`)
  if (res.status !== 200) {
    throw new Error('Couldn\'t fetch weather data')
  }

  const json = await res.json()
  if (!json) {
    throw new Error('No weather data (json)')
  }

  const {
    t2m: tempData,
    Precipitation1h: rainData,
  } = json

  if (!Array.isArray(tempData) || !Array.isArray(rainData)) {
    throw new Error('Faulty weather data')
  }

  const temp = Math.round(last(last(tempData)))
  const rain = last(last(rainData)) > 0

  return {
    temp,
    rain,
  }
}




export default class extends Component {
  state = {
    temp: undefined,
    rain: undefined,
  }

  mounted = false
  timeout = null

  componentDidMount() {
    this.mounted = true
    this.getWeather()
  }

  componentWillUnmount() {
    this.mounted = false
  }

  getWeather = async () => {
    const { station } = this.props
    try {
      const { temp, rain } = await getStationData(station || 100971)
      if (this.mounted) this.setState({
        temp,
        rain,
      })
    } catch(err) {
      console.log(err)
    }

    if ( !this.mounted ) return
    this.timeout = setTimeout(this.getWeather, 60000)
  }

  render() {
    let { temp, rain } = this.state
    return (
      <Weather>
        { rain && <img src={ temp < 1 ? snowIcon : rainIcon }  alt="rain"/> }
        { isNaN(temp) ? '◇' : temp }°
      </Weather>
    )
  }
}

import { last } from 'ramda'




export async function getStationData(station) {
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

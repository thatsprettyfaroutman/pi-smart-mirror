import {
  differenceInMinutes,
  startOfToday,
  differenceInSeconds,
  addSeconds,
 } from 'date-fns'
import {
  last,
  path,
} from 'ramda'



export const HSL_URL = 'https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql'




export function getNowInSeconds() {
  return  Math.round(Date.now() / 1000)
}




export async function getHslData(query) {
  const res = await fetch(HSL_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/graphql'
    },
    body: query,
  })
  if (res.status === 200) return res.json()
}




export function getLocation() {
  return new Promise( resolve => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      resolve(sanitizeLocation(coords))
    })
  })
}




export function sanitizeLocation( location ) {
  return {
    lat: location.lat || location.latitude,
    latitude: location.lat || location.latitude,
    lon: location.lon || location.longitude,
    longitude: location.lon || location.longitude,
  }
}





export async function solveNearestStop() {
  const location = await getLocation() || {
    latitude: 60.170852800000006,
    longitude: 24.945129599999998,
  }

  const nearest = await getHslData(`{
    nearest(lat: ${ location.latitude }, lon: ${ location.longitude }) {
      edges { node { id }}
    }
  }`)


  const edges = path(['data', 'nearest', 'edges'], nearest) || []
  const stopIds = edges
    .map(({ node }) => atob(last(atob(node.id).split(';'))))
    .filter( x => x.indexOf('Stop:') === 0 )
    .map( x => x.slice(5) )

  return stopIds
}




export async function getTrams( stopId, startTime = getNowInSeconds() ) {
  const res = await getHslData(`
    {
      stop(id:"${ stopId }"){
        name
        gtfsId
        stoptimesWithoutPatterns(
          startTime:"${ startTime }",
          timeRange: 18000,
          numberOfDepartures:4
        ) {
          scheduledArrival
          scheduledDeparture
          realtimeArrival
          serviceDay
          stopHeadsign
          trip {
            route {
              gtfsId
              longName
              shortName
            }
          }
        }
      }
    }`
  )

  if ( !res ) throw new Error('No route data')

  const stopTimes =
    res.data &&
    res.data.stop &&
    res.data.stop.stoptimesWithoutPatterns

  if ( !stopTimes ) throw new Error('Faulty route data')

  const now = Date.now()

  return stopTimes
    .map(stopTime => {
      const arrivalDate =
        new Date((stopTime.serviceDay + stopTime.realtimeArrival) * 1000)
      const arrivalInMinutes = differenceInMinutes(arrivalDate, now)
      const arrival = arrivalInMinutes// - WALK_MINUTES
      return ({
        arrival,
        lineName: stopTime.trip.route.shortName,
      })
    })
    .filter( stopTime => stopTime.arrival >= 0 )
}




export async function getPlans(fromLocation, toLocation, walkTime = 0) {
  const a = sanitizeLocation(fromLocation)
  const b = sanitizeLocation(toLocation)

  let now = new Date()

  // now with walktime
  now = addSeconds(now, walkTime)

  const today = startOfToday(now)
  const todayTime = differenceInSeconds(now, today)
  const year = now.getFullYear()
  const month = `0${now.getMonth() + 1}`.slice(-2)
  const day = `0${now.getDate()}`.slice(-2)

  const res = await getHslData(`{
    plan(
      date: "${year}-${month}-${day}",
      time: "${todayTime}",
      from: {lat: ${a.lat}, lon: ${a.lon}},
      to: {lat: ${b.lat}, lon: ${b.lon}},
      transportModes: [ { mode: TRAM }, { mode:WALK } ]
    ) {
      itineraries {
        startTime
        endTime
        duration
        walkTime
        walkDistance
        legs {
          startTime
          endTime
          departureDelay
          arrivalDelay
          mode
          duration
          distance
          transitLeg
          intermediatePlace
          trip {
            id
            route {
              id
              shortName
            }
            directionId
          }
        }
      }
    }
  }`)

  now = new Date()

  const steps = path(['data', 'plan', 'itineraries'], res) || []
  const stepStrings = steps
    .map(step => step.legs
      .map((leg, i) => {
        let seconds = differenceInSeconds(new Date(leg.startTime), now)
        seconds -= walkTime
        const stepItems = [
          // leg.mode !== 'WALK' ? leg.mode : null,
          leg.trip ? leg.trip.route.shortName : null,
          i === 0 ? `${seconds}` : null,
        ]
        return stepItems
          .filter(Boolean)
          .join(' ')
      })
      .filter(Boolean)
    )
    .sort((a, b) => Number(a[0]) - Number(b[0]))
    .map(plan => [plan[1], Number(plan[0])])
  return stepStrings
}

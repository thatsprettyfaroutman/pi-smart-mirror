import React, { Component } from 'react'
import styled from 'styled-components'
import {
  getLocation,
  getPlans,
} from './helpers'



const Trams = styled.div`

`




const WORK_LOCATION = {
  lat: 60.170578,
  lon: 24.945560
}

const WALK_TIME = 3 * 60
const NOW_LIMIT = 0
const HURRY_LIMIT = -1 * 60
const REMOVE_LIMIT = -2 * 60



class TramsComponent extends Component {
  state = {
    plan: 'Loading trams'
  }

  mounted = false
  timeout = null


  componentDidMount() {
    this.mounted = true
    this.getPlans()
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout( this.timeout )
    this.timeout = null
  }


  getPlans = async () => {
    const location = await getLocation()
    let plans = await getPlans( location, WORK_LOCATION, WALK_TIME )

    plans = plans.filter(([_, x]) => x > REMOVE_LIMIT)
    const [ line, secondsToArrival ] = plans[0]

    let message = `in ${ Math.floor(secondsToArrival / 60) }`
    if (secondsToArrival <= NOW_LIMIT) message = 'now'
    if (secondsToArrival <= HURRY_LIMIT) message = 'hurry'

    if ( !this.mounted ) return

    this.setState({
      plan: `${line} ${message}`
    })

    this.timeout = setTimeout(this.getPlans, 10000)
  }

  render() {
    const { plan } = this.state
    if ( !plan ) return null

    return (
      <Trams>
        { plan }
      </Trams>
    )
  }
}



export default TramsComponent

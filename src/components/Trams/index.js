import React, { Component } from 'react'
import styled from 'styled-components'
import { addSeconds } from 'date-fns'
import { timeout } from 'utils'
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
const NOW_LIMIT = 60
const HURRY_LIMIT = -1 * 60
const REMOVE_LIMIT = -2 * 60



class TramsComponent extends Component {


  state = {
    loading: true,
    plan: undefined,
  }

  mounted = false
  timeout = null




  componentDidMount() {
    this.mounted = true
    this.fetchPlans()
  }

  componentWillUnmount() {
    this.mounted = false
    clearTimeout( this.timeout )
    this.timeout = null
  }




  fetchPlans = async () => {
    let plans = []

    try {
      const location = await getLocation()
      plans = await getPlans( location, WORK_LOCATION, addSeconds(new Date(), WALK_TIME) )
    } catch ( error ) {
      console.log(error)
    }

    plans =
      plans.map(([line, seconds]) => [line, seconds - WALK_TIME])
      plans.filter(([_, seconds]) => seconds > REMOVE_LIMIT)

    this.setState({
      loading: false,
      plan: plans[0],
    })

    await timeout(10000)
    this.fetchPlans()
  }




  render() {
    const { loading, plan } = this.state

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
}



export default TramsComponent

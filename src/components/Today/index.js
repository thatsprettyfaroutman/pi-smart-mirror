import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import useTick from 'hooks/tick'


const Today = styled.div`
`


const TodayComponent = () => {
  useTick(10000)
  return (
    <Today>{ format(new Date(), 'dddd D. MMMM YYYY') }</Today>
  )
}


export default TodayComponent

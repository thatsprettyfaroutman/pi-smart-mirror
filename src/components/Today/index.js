import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import Updating from 'hocs/Updating'


const Today = styled.div`
`


const TodayComponent = () => (
  <Today>{ format(new Date(), 'dddd D. MMMM YYYY') }</Today>
)


export default Updating(1000, TodayComponent)

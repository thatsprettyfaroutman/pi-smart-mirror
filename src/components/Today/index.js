import React from 'react'
import styled from 'styled-components'
import { format } from 'date-fns'
import useTick from 'hooks/tick'

const Today = styled.span``

const TodayComponent = () => {
  useTick(1000)
  const now = new Date()
  return (
    <Today>
      <strong>{format(now, 'HH.mm')}</strong> {format(now, 'dddd D. MMMM YYYY')}
    </Today>
  )
}

export default TodayComponent

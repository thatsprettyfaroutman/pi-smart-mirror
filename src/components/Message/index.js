import React from 'react'
import styled from 'styled-components'
import { differenceInCalendarDays } from 'date-fns'
import Updating from 'hocs/Updating'


const Message = styled.div`

`


function getDaysToNextPayday(payday) {
  const now = new Date()
  if ( now.getDate() === payday ) return 0
  if ( now.getDate() < payday ) return payday - now.getDate()

  let year = now.getFullYear()
  let nextMonth = now.getMonth() + 2
  if (nextMonth > 12) {
    nextMonth = 1
    year++
  }

  const nextPayday = new Date(`${year}-${nextMonth}-${payday}`)
  return differenceInCalendarDays(nextPayday, now)
}



const MessageComponent = () => {

  const daysToNextPayday = getDaysToNextPayday(15)
  const message = daysToNextPayday === 0 ?
  'Payday' :
  `Next payday in ${ daysToNextPayday } days`

  return (
    <Message>
      { message }
    </Message>
  )
}

export default Updating(60000, MessageComponent)

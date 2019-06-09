import React from 'react'
import styled, { css } from 'styled-components'
import { differenceInCalendarDays } from 'date-fns'
import { getModulusForCurrentTime, getDaysToNextPayday } from 'utils'
import useEpics from 'hooks/epics'
import useTick from 'hooks/tick'
import Loading from 'components/Loading'

const Message = styled.div`
  > :last-child {
    font-weight: 300;
  }
`

const epicsToMessages = (epics = []) =>
  epics
    .map(({ name, date }) => {
      const days = differenceInCalendarDays(new Date(date), new Date())
      if (days < 0) return null
      if (days === 0) return [`${name} today!`]
      return [`${days} days`, `until ${name}`]
    })
    .filter(Boolean)

const getPaydayMessage = () => {
  const daysToNextPayday = getDaysToNextPayday(15)
  return daysToNextPayday === 0
    ? ['Payday is today!']
    : [`${daysToNextPayday} days`, 'until next payday']
}

const MessageComponent = () => {
  const UPDATE_TIME = 5 * 60000

  // Updates component every UPDATE_TIME
  useTick(UPDATE_TIME)
  const { epics, loading } = useEpics()

  const messages = [getPaydayMessage(), ...epicsToMessages(epics)]

  const messageIndex = getModulusForCurrentTime(UPDATE_TIME, messages.length)
  const message = messages[messageIndex]

  return (
    <Message>
      {message.map((part, i) => (
        <span key={part}>
          {part} {i === 0 && loading ? <Loading /> : null}
        </span>
      ))}
    </Message>
  )
}

export default MessageComponent

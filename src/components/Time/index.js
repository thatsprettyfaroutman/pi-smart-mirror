import React from 'react'
import styled from 'styled-components'
import useTick from 'hooks/tick'


const Time = styled.div`
  display: flex;
  font-size: 120px;
  font-weight: 100;
`



const TimeComponent = () => {
  useTick(100)

  const now = new Date()
  const hours = `0${now.getHours()}`.slice(-2)
  const minutes = `0${now.getMinutes()}`.slice(-2)
  // const seconds = `0${now.getSeconds()}`.slice(-2)

  return (
    <Time>
      { hours }{ minutes }
    </Time>
  )
}


export default TimeComponent

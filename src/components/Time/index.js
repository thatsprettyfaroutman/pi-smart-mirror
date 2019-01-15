import React from 'react'
import styled from 'styled-components'
import useTick from 'hooks/tick'
import LCDNumber from 'components/LCDNumber'


const Time = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 120px;
`

const TimeLCDNumber = styled(LCDNumber)`
  background-color: #fff;
  min-height: 100px;
  min-width: 180px;
  padding: 40px 0;

  &:first-child {
    padding-left: 40px;
  }

  &:last-child {
    padding-right: 40px;
    padding-left: 20px;
  }

  > svg > rect {
    fill: #000;
  }
`


const TimeComponent = () => {
  useTick(100)

  const now = new Date()
  const hours = `0${now.getHours()}`.slice(-2)
  const minutes = `0${now.getMinutes()}`.slice(-2)
  const seconds = `0${now.getSeconds()}`.slice(-2)

  return (
    <Time>
      <TimeLCDNumber
        pixelSize={ 4 }
        pixelGroup={ 4 }
        pixelSpacing={ 1 }
        letterSpacing={ 10 }
        children={ `${ hours }${ minutes }` }
      />
      <TimeLCDNumber
        pixelSize={ 4 }
        pixelGroup={ 2 }
        pixelSpacing={ 1 }
        letterSpacing={ 10 }
        children={ seconds }
      />
    </Time>
  )
}


export default TimeComponent

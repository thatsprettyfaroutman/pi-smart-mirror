import React from 'react'
import {
  getModulusForCurrentTime
} from 'utils'
import useTick from 'hooks/tick'

const CHARACTERS = '⌜⌝⌟⌞'.split('')
const TICK = 1000 / 15

export default ({ component }) => {
  useTick(TICK)
  const i = getModulusForCurrentTime(TICK, CHARACTERS.length)

  const Wrapper = component
  if ( Wrapper ) return (
    <Wrapper>
      { CHARACTERS[i] }
    </Wrapper>
  )

  return CHARACTERS[i]
}

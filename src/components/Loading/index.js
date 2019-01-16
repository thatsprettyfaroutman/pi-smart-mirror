import React from 'react'
import {
  getModulusForCurrentTime
} from 'utils'
import useTick from 'hooks/tick'

const CHARACTERS = '⌜⌝⌟⌞'.split('')

export default ({ wrapper, wrapperProps, tick = 1000 / 15 }) => {
  useTick(tick)
  const i = getModulusForCurrentTime(tick, CHARACTERS.length)

  const Wrapper = wrapper
  if ( Wrapper ) return (
    <Wrapper { ...wrapperProps }>
      { CHARACTERS[i] }
    </Wrapper>
  )

  return CHARACTERS[i]
}

import {
  getModulusForCurrentTime
} from 'utils'
import useTick from 'hooks/tick'

const CHARACTERS = '⌜⌝⌟⌞'.split('')
const TICK = 100

export default () => {
  useTick(TICK)
  const i = getModulusForCurrentTime(TICK, CHARACTERS.length)
  return CHARACTERS[i]
}

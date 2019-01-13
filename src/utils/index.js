import {
  differenceInCalendarDays,
} from 'date-fns'




export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms))




export const getModulusForCurrentTime = (ms, n) => Math.floor(Date.now() % (ms * n) / ms)




export const  getDaysToNextPayday = payday => {
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

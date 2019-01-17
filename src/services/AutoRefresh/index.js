import {
  differenceInMilliseconds,
  startOfTomorrow,
} from 'date-fns'
import {
  timeout,
} from 'utils'


class AutoRefresh {

  running = false
  timeout = null

  start() {
    if ( this.running ) return
    this.running = true
    const now = new Date()
    const midNight = startOfTomorrow()
    const timeUntilRefresh = differenceInMilliseconds(midNight, now)
    setTimeout(this.refresh, timeUntilRefresh)
  }

  stop() {
    this.running = false
    clearTimeout( this.timeout )
    this.timeout = null
  }

  refresh = async () => {
    if ( !this.running ) return

    let res
    let failed = false

    try {
      res = await fetch(window.location)
    } catch(error) {
      failed = true
    }

    if ( failed || res.status !== 200 ) {
      await timeout(5000)
      return this.refresh()
    }

    window.location.reload()
  }
}


export default new AutoRefresh()

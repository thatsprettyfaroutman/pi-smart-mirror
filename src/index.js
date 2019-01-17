import React from 'react'
import ReactDOM from 'react-dom'

import { Main, Top, Middle, Bottom } from 'components/Layout'
import Time from 'components/Time'
import Weather from 'components/Weather'
import Today from 'components/Today'
import Message from 'components/Message'
import Trams from 'components/Trams'
// import LoadingStatus from 'components/LoadingStatus'


ReactDOM.render((
  <Main>
    <Top>
      {/* Steps go here */}
      {/* <LoadingStatus /> */}
    </Top>
    <Middle>
      <Message />
    </Middle>
    <Bottom>
      <Time />
      <Trams />
      <Today />
      <Weather />
    </Bottom>
  </Main>
), document.getElementById('root'))

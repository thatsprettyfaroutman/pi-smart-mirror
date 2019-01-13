import React from 'react'
import ReactDOM from 'react-dom'

import { Main, Top, Middle, Bottom } from 'components/Layout'
import Time from 'components/Time'
import Weather from 'components/Weather'
import Today from 'components/Today'
import Message from 'components/Message'
import Trams from 'components/Trams'
import LoadingStatus from 'components/LoadingStatus'


ReactDOM.render((
  <Main>
    <Top>
      {/* <Row>Steps go here</Row> */}
      <LoadingStatus />
    </Top>
    <Middle>
      <Message />
    </Middle>
    <Bottom>
      <Time />
      <Weather />
      <Today />
      <Trams />
    </Bottom>
  </Main>
), document.getElementById('root'))

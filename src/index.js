import React from 'react'
import ReactDOM from 'react-dom'

import App from 'components/App'
import { Top, Middle, Bottom } from 'components/Section'
import Row from 'components/Row'
import Time from 'components/Time'
import Weather from 'components/Weather'
import Today from 'components/Today'
import Message from 'components/Message'
import Trams from 'components/Trams'


ReactDOM.render((
  <App>
    <Top>
      {/* <Row>Steps go here</Row> */}
    </Top>
    <Middle>
      <Row>
        <Message />
      </Row>
    </Middle>
    <Bottom>
      <Row>
        <Time />
        <Weather />
      </Row>
      <Row>
        <Today />
        <Trams />
      </Row>
    </Bottom>
  </App>
), document.getElementById('root'))

import React from 'react'
import ReactDom from 'react-dom'
import styled, { createGlobalStyle } from 'styled-components'

import AutoRefresh from 'services/AutoRefresh'

import { Main, Top, Middle, Bottom } from 'components/Layout'
import Time from 'components/Time'
import Weather from 'components/Weather'
import Today from 'components/Today'
import Message from 'components/Message'
import Trams from 'components/Trams'
// import LoadingStatus from 'components/LoadingStatus'

AutoRefresh.start()

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
    background-color: #000;
  }

  body {
    font-family: Poppins, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #fff;
    font-size: 30px;
    font-weight: 200;
    line-height: 1.2;
  }

  strong {
    font-weight: 300;
  }
`

const Mini = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;

  > * {
    justify-self: center;
    align-self: center;
  }
`
const MiniRow = styled.div``

ReactDom.render(
  <>
    <GlobalStyle />
    <Mini>
      <MiniRow>
        <Weather />
        {'\u00A0'}
        <Today />
      </MiniRow>
      <Trams />
      <Message />
    </Mini>
  </>,
  document.getElementById('root')
)

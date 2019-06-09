import styled from 'styled-components'

export const Main = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  flex-direction: column;
  box-sizing: border-box;
  height: 100vh;
  margin: 0;
  padding: 60px;
  background-color: #000;
  color: #fff;
  font-size: 30px;
  font-weight: 200;
  line-height: 1.2;
`

export const Top = styled.section`
  align-self: flex-start;
  ${'' /* min-height: 200px; */}
`

export const Middle = styled.section`
  align-self: center;
`

export const Bottom = styled.section`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  grid-row-gap: 40px;
  min-height: 200px;

  & > * {
    align-self: center;
  }

  & > :nth-child(even) {
    text-align: right;
  }
`

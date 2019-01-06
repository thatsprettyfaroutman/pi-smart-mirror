import styled from 'styled-components'


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;

  & + & {
    margin-top: 40px;
  }
`


export default Row

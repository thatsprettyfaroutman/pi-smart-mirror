import React from 'react'
import styled from 'styled-components'
import useLoaderCount from 'hooks/loaderCount'
import Loading from 'components/Loading'



const LoadingStatus = styled.div`
  text-align: right;
  transition-property: opacity;
  ${'' /* transition-delay: ${({ visible }) => visible ? '0' : '400ms' }; */}
  transition-duration: 200ms;
  transition-timing-function: ease-in-out;
  opacity: ${({ visible }) => visible ? 1 : 0 };
`



export default () => {
  const [ count ] = useLoaderCount()

  return (
    <LoadingStatus visible={ !!count }>
      <Loading  />
    </LoadingStatus>
  )
}

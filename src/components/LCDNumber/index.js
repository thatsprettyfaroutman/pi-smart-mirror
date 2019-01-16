import React from 'react'
import styled from 'styled-components'
import characters from './characters'

const LCDNumber = styled.div`
  display: flex;
  padding-left: ${({ spacing }) => spacing }px;
  padding-top: ${({ spacing }) => spacing }px;

  > svg {
    display: block;
    margin: 0;
    margin-right: ${({ letterSpacing }) => letterSpacing }px;
  }

  > svg:last-child {
    margin-right: 0;
  }
`

const LCDRect = styled.rect`
  fill: #fff;
  opacity: ${({ muted }) => muted ? 0.05 : 1};
  transition: fill 400ms ease-in-out;
`



const LCDNumberComponent = ({
  children,
  className,
  letterSpacing = 10,
  ...rest
}) => {
  const text = `${children}`
  return (
    <LCDNumber
      className={ className }
      letterSpacing={ letterSpacing }
      spacing={ rest.pixelSpacing }
    >
      { text.split('').map( (character, i) => (
        <LCDNumberSvg { ...rest } key={ i } value={ character.toLowerCase() } />
      ))}
    </LCDNumber>
  )
}

const LCDNumberSvg = ({
  value,
  pixelSize = 1,
  pixelGroup = 3,
  pixelSpacing = 8,
}) => {
  const fullSize = pixelSpacing + pixelSize
  const clusterSize = fullSize * pixelGroup

  const character = characters[value]
  if ( !character ) return null

  const rows = character.length
  const columns = character[0].length


  return (
    <svg width={ columns * clusterSize} height={ rows * clusterSize }>
      { character.map( (row, y) => row.map( (draw, x) => {

        // Never render these parts
        if ( !draw && x === 1 ) {
          if ( y === 1 || y === 3) {
            return null
          }
        }

        return (
          <RectCluster
            muted={ !draw }
            key={ `${x} ${y}` }
            x={ x * clusterSize }
            y={ y * clusterSize }
            size={ pixelSize }
            spacing={ pixelSpacing }
            rows={ pixelGroup }
            columns= { pixelGroup }
          />
        )
      }))}
    </svg>
  )
}

const RectCluster = ({
  x = 0,
  y = 0,
  spacing = 1,
  size = 1,
  rows = 2,
  columns = 2,
  muted,
}) => {
  const numRects = rows * columns
  const fullSize = spacing + size

  const rects = []
  for (let i = 0; i < numRects; i++) {
    const rx = parseInt(i / rows) * fullSize //+ x
    const ry = (i % rows) * fullSize// + y
    rects.push((
      <LCDRect
        muted={ muted }
        key={ i }
        x={ rx + x}
        y={ ry + y}
        width={ size }
        height= { size }
      />
    ))
  }

  return rects
}




export default LCDNumberComponent

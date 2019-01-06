import React, { Component } from 'react'


export default (updateInterval = 60000, PassedComponent) =>
  class Updating extends Component {
    interval = null

    componentDidMount() {
      this.interval = setInterval(() => {
        this.forceUpdate()
      }, updateInterval)
    }

    componentWillMount() {
      clearInterval(this.interval)
      this.interval = null
    }

    render() {
      const {
        every,
        ...rest
      } = this.props

      return (
        <PassedComponent { ...rest } />
      )
    }
  }

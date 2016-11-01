import React, { Component } from 'react'

class Loding extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { show } = this.props
    return (
      show? <div className="u-loading iconfont"></div>:null
    )
  }
}

export default Loding

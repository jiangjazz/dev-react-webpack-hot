import React, { Component, PropTypes } from 'react'
import Button from '../../Button'

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { size, clickSure, clickClose, sureText, cancelText } = this.props

    return (
      <div className={'u-modal__footer ' + (size == 's'? 'u-modal--sizeIsS': 'u-modal--sizeNotS')} >
        <Button type="default" onClick={ clickClose }> { sureText } </Button>
        <Button type="main" onClick={ clickSure }> { cancelText } </Button>
      </div>
    )
  }
}

export default Footer

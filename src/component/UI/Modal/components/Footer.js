import React, { Component, PropTypes } from 'react'
import { Button, Icon } from 'UI'

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let {
      size,
      clickSure,
      clickClose,
      sureText,
      cancelText,
      sureDisabled,
      showSureButton,
      onLoding } = this.props

    return (
      <div className={'u-modal__footer ' + (size == 's'? 'u-modal--sizeIsS': 'u-modal--sizeNotS')} data-id={onLoding}>
        <Button color="default" size="large" onClick={ clickClose } > { cancelText } </Button>
        {
          showSureButton?
          onLoding?
          <Button color="main" size="large" onClick={ clickSure } disabled>
            <Icon type="loading" />
          </Button>:
          <Button color="main" size="large" onClick={ clickSure } disabled={ sureDisabled }> { sureText } </Button>:
          null
        }

      </div>
    )
  }
}

export default Footer

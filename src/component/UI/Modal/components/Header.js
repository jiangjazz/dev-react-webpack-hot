import React, { Component, PropTypes } from 'react'

class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { size, title } = this.props;
    return (
      <div className={'u-modal__header ' + (size == 's'? 'u-modal--sizeIsS': 'u-modal--sizeNotS') }>
        {title}
      </div>
    )
  }
}

export default Header

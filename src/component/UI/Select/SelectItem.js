import React, { Component, PropTypes } from 'react'

class SelectItem extends Component {
  render () {
    let {
      href,
      text,
      onClick
    } = this.props
    // className
    let componentClass = [
      this.props.className
    ]

    //生成
    return (
      <li className={componentClass.join(' ')}>
        <a href={ href?href:'javascript:;' } onClick={ onClick }>
          { text }
        </a>
      </li>
    )
  }
}

SelectItem.propTypes = {
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

export default SelectItem

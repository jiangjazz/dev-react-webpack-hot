import React, { Component, PropTypes } from 'react'

/**
* creater: Janzen
* tip: 按钮组
* dec:
* 参数:
*
*/

class ButtonGroup extends Component {
  render() {
    // className
    let componentClass = [
      'u-btnGroup',
      this.props.className
    ]
    return (
      <div
        className={componentClass.join(' ')}
      >
        { this.props.children }
      </div>
    )
  }
}

ButtonGroup.propTypes = {

}

export default ButtonGroup

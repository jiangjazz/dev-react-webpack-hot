import React, { Component } from 'react'

/**
* tip:
* dec: 关于search中的事件比较复杂, 所以在是用的时候
      是引入下的 util.js 中的方法
      bulr => onBlur()   focus => onFocus
*/

class InputGroup extends Component {

  render() {
    return (
      <div className={'m-input__group m-input--' + this.props.type} >
        { this.props.children }
      </div>
    )
  }
}

export default InputGroup

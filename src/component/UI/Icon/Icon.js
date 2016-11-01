import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
/**
* creater: lay
* tip: icon的基本类
* dec: 具体名字可以查看 iconfont 中的名字
* 参数:
*   {String}   type    : icon名字
*   {Function} onClick : 接受父组件事件
*/

class Icon extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { type, onClick, className } = this.props

    const iconClassName = classnames({
      'iconfont': true,
      [`icon-${type}`]: type,
      [className]: className
    })

    return (
      <i className={ iconClassName } onClick={ onClick }></i>
    )
  }
}

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon

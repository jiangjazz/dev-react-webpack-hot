import React, { Component } from 'react'

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
    let { type, onClick } = this.props
    return (
      <i className={ 'iconfont icon-' + type } onClick={ onClick }></i>
    )
  }
}

export default Icon

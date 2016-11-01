import React, { Component } from 'react'

/**
*  tip: 面包屑列表
*  dec: 该组件必须要两个组件配合使用才能使用
*  参数:
*    {String} children : 链接的名称
*    {String} link     : 链接的地址
*/

class BreadcrumbItem extends Component {
  render() {
    let { children } = this.props
    return (
      { children }
    )
  }
}

export default BreadcrumbItem

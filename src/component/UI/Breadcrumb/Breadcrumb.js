import React, { Component } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

/**
*  tip: 面包屑
*  dec: 该组件必须要两个组件配合使用才能使用
*  参数:
*    {String} separator : 分割符号 | 默认为 >
*    {React-Component} children : 必须为 BreadcrumbItem 组件
*/

class Breadcrumb extends Component {
  render() {
    let { children, separator = '>'} = this.props

    let breadcrumbList = _.map(children, ({props}, key) => {
      if (!props.children) return false;
      return (
            <span className="u-breadcrumb__item" key={ 'breadcrumb_' + key }>
              {
                !!props.link?
                <Link to={props.link} className="u-breadcrumb__item--link">{ props.children }</Link>:
                <span className="u-breadcrumb__item--link">{ props.children }</span>
              }
              <span className="u-breadcrumb__item__separator">{ separator }</span>
            </span>
      )
    })

    return (
      <div className="u-breadcrumb__wrap">{ breadcrumbList }</div>
    )
  }
}

export default Breadcrumb

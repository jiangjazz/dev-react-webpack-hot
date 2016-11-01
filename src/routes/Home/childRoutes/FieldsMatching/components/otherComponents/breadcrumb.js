import React, { Component } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem
} from 'UI'

class FieldsMatchingBreadcrumb extends Component {
  render() {
    return(
      <div className="m-nav__addr">
        <Breadcrumb separator=">">
          <BreadcrumbItem link="/">联系人</BreadcrumbItem>
          <BreadcrumbItem link="/">联系人组</BreadcrumbItem>
          <BreadcrumbItem >创建联系人组</BreadcrumbItem>
          <BreadcrumbItem >字段匹配</BreadcrumbItem>
        </Breadcrumb>
      </div>
    )
  }
}

export default FieldsMatchingBreadcrumb

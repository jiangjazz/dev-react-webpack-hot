import React, { Component } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem
} from 'UI'

class AddContactBreadcrumb extends Component {
  render() {
    return(
      <div className="m-nav__addr">
        <Breadcrumb separator=">">
          <BreadcrumbItem link="/">联系人</BreadcrumbItem>
          <BreadcrumbItem link="/">联系人组</BreadcrumbItem>
          <BreadcrumbItem >创建联系人组</BreadcrumbItem>
          <BreadcrumbItem >手动添加联系人</BreadcrumbItem>
        </Breadcrumb>
      </div>
    )
  }
}

export default AddContactBreadcrumb

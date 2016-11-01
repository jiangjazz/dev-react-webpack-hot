import React, { Component } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem
} from 'UI'

class HomeBreadcrumb extends Component {
  render() {
    return(
      <div className="m-nav__addr">
        <Breadcrumb separator=">">
          <BreadcrumbItem link="/">联系人</BreadcrumbItem>
          <BreadcrumbItem>联系人组</BreadcrumbItem>
        </Breadcrumb>
        <h3 className="m-nav__title">联系人组列表</h3>
      </div>
    )
  }
}

export default HomeBreadcrumb

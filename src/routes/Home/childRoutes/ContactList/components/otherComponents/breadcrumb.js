import React, { Component } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem
} from 'UI'

class ContactBreadcrumb extends Component {
  render() {
    const {
      listName
    } = this.props
    return(
      <div className="m-nav__addr">
        <Breadcrumb separator=">">
          <BreadcrumbItem link="/">联系人</BreadcrumbItem>
          <BreadcrumbItem link="/">联系人组</BreadcrumbItem>
          <BreadcrumbItem >联系人</BreadcrumbItem>
        </Breadcrumb>
        <h3 className="m-nav__title">{ listName }</h3>
      </div>
    )
  }
}

export default ContactBreadcrumb

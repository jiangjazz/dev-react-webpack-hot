import React, { Component } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem
} from 'UI'

class ContactDetailsBreadcrumb extends Component {
  setTitle() {
    const {
      data
    } = this.props

    if ( data.user ) {
      return data.user.email || data.user.mobile
    } else {
      return null
    }
  }
  render() {
    const {
      data,
      list_id
    } = this.props

    return(
      <div className="m-nav__addr">
        <Breadcrumb separator=">">
          <BreadcrumbItem link="/">联系人</BreadcrumbItem>
          <BreadcrumbItem link={ 'contact/lists/' + list_id }>{ data.listName }</BreadcrumbItem>
          <BreadcrumbItem >联系人</BreadcrumbItem>
        </Breadcrumb>
        <h3 className="m-nav__title">
          { this.setTitle() }
        </h3>
      </div>
    )
  }
}

export default ContactDetailsBreadcrumb

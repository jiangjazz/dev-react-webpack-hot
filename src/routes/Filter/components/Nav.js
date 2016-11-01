import React, { Component } from 'react'
import {
  Button,
  Icon,
  Breadcrumb,
  BreadcrumbItem,
  InputGroup,
  Input
 } from 'UI'

class Nav extends Component {
  render() {
    const {
      keyword,
      addFilterModal,
      onSearchTextChange,
      onkeyEnter,
      onSearchSure
    } = this.props
    return (
      <div className="m-nav__wrap">
        <div className="m-nav__addr">
          <Breadcrumb separator=">">
            <BreadcrumbItem link="/">联系人</BreadcrumbItem>
            <BreadcrumbItem>过滤器</BreadcrumbItem>
          </Breadcrumb>
          <h3 className="m-nav__title">过滤器</h3>
        </div>

        <div className="m-nav__tools">
        <InputGroup type="searchDif">
          <Input
            placeholder="搜索..."
            shape="round"
            addClassName="u-input--search"
            value={ keyword }
            onChange={ onSearchTextChange }
            onKeyUp={ onkeyEnter }/>
          <Icon type="search" onClick={ onSearchSure }/>
        </InputGroup>
          <Button color="main" className="u-btn__plus" onClick={ addFilterModal }>
            <Icon type="plus" />
            <span className="u-btn__plusText">添加</span>
          </Button>
        </div>
      </div>
    )
  }
}

export default Nav

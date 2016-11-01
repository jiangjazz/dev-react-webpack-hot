import React, { Component } from 'react'

import {
  Checkbox,
  Icon
} from 'UI'

class HomeTableHead extends Component {
  render() {
    let {
      onChange,
      checked
    } = this.props

    return(
      <ul className="u-row">
        <li className="u-col-2">
          <Checkbox distance={5}
          onChange={ onChange }
          checked={ checked }
          >全选</Checkbox>
        </li>
        <li className="u-col-4">
          联系人组名称
          <Icon type="sort-alpha-asc" />
        </li>
        <li className="u-col-3">
          联系人数量
        </li>
        <li className="u-col-2">
          软弹
        </li>
        <li className="u-col-2">
          硬弹
        </li>
        <li className="u-col-2">
          退订
        </li>
        <li className="u-col-2">
          创建账号
        </li>
        <li className="u-col-2">
          创建时间
        </li>
        <li className="u-col-2">
          最近更新
        </li>
        <li className="u-col-2">
          更新时间
        </li>
        <li className="u-col-1">
          {' '}
        </li>
      </ul>
    )
  }
}

export default HomeTableHead

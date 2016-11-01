import React, { Component } from 'react'
import { Checkbox, Icon } from 'UI'

import SearchNoResults from 'Common/SearchNoResults'

class TableList extends Component {
  render() {
    const {
      children,
      onChange,
      checked,
      orderSortChange,
      searchResult
    } = this.props

    return (
      <div className="m-dataList__wrap m-listTable__wrap">
        <div className="m-listTable__head">
          <ul className="u-row">
            <li className="u-col-3">
              <Checkbox
                distance={ 5 }
                onChange={ onChange }
                checked={ checked }>全选</Checkbox>
            </li>
            <li className="u-col-2">
              字段名
              <Icon type="sort-alpha-asc" onClick={orderSortChange}/>
            </li>
            <li className="u-col-4">
              描述
            </li>
            <li className="u-col-2">
              类型
            </li>
            <li className="u-col-2">
              唯一性
            </li>
            <li className="u-col-3">
              创建帐号
            </li>
            <li className="u-col-2">
              创建时间
            </li>
            <li className="u-col-3">
              最近更新
            </li>
            <li className="u-col-2">
              更新时间
            </li>
            <li className="u-col-1">
              {' '}
            </li>
          </ul>
        </div>
          {
            children.length === 0 && searchResult ?
            <SearchNoResults
              type="字段"
              readAllClick={ this._hanlderSeach.bind(this) }
              addClick={ this.props.addFilterModal }/>
            :
            <div className="m-listTable__content">{ children }</div>
          }
      </div>
    )
  }

  _hanlderSeach() {
    this.props.getFieldsList({keyword:''})
  }
}

export default TableList

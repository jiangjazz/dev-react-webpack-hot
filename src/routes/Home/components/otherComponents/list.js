import React, { Component } from 'react'

import {
  Checkbox,
  Tooltips
} from 'UI'

class HomeList extends Component {
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  render() {
    let {
      item,
      lock,
      onUlClick,
      onChange,
      checked,
      children
    } = this.props

    return(
      <ul className={ ['u-row', checked? 'active': ''].join(' ')}
        onClick={ onUlClick }
        >
        <li className="u-col-2" onClick={ this.stop.bind(this) }>
        {
          lock?
          <Tooltips
            placement="top"
            content="当前为锁定状态，原因是有其他用户正在编辑或者使用此联系人组发送，请稍后再试。"
            >
            <Checkbox
            lock={ lock }
            onChange={ onChange }
            checked={ checked }/>
          </Tooltips>
          :
          <Checkbox
          onChange={ onChange }
          checked={ checked }/>
        }

        </li>
        <li className="u-col-4">
          { item.name || '——' }
        </li>
        <li className="u-col-3">
          { item.user_count || '——' }
        </li>
        <li className="u-col-2">
          { item.sb_count || '——' }
        </li>
        <li className="u-col-2">
          { item.hb_count || '——' }
        </li>
        <li className="u-col-2">
          { item.unsubscribe_count || '——' }
        </li>
        <li className="u-col-2">
          { item._create_operator_name || '——' }
        </li>
        <li className="u-col-2">
          { item._created || '——' }
        </li>
        <li className="u-col-2">
          { item._update_operator_name || '——' }
        </li>
        <li className="u-col-2">
          { item._updated || '——' }
        </li>
        <li className="u-col-1" onClick={ this.stop.bind(this) }>
          { children }
        </li>
      </ul>
    )
  }
}

export default HomeList

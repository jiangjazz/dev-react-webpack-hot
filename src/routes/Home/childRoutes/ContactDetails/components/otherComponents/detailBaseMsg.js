import React, { Component } from 'react'

import {
  Icon
} from 'UI'

class DetailBaseMsg extends Component {
  render() {
    const {
      data
    } = this.props
    return(
      <div className="details-row">
        <div className="details-head">
          联系人基本信息
        </div>
        <div className="details-body f-cb">
          <div className="userIcon f-fl">
            <div className="iconCt">
              <Icon type="user" />
            </div>
          </div>
          <ul className="u-row f-fl otherMsg">
            <li className="u-col-4">
              <div className="name">
                创建账号
              </div>
              <div className="value">
                { data._create_operator_name }
              </div>
            </li>
            <li className="u-col-4">
              <div className="name">
                创建时间
              </div>
              <div className="value">
                { data._created }
              </div>
            </li>
            <li className="u-col-4">
              <div className="name">
                最近更新
              </div>
              <div className="value">
                { data._update_operator_name }
              </div>
            </li>
            <li className="u-col-4">
              <div className="name">
                更新时间
              </div>
              <div className="value">
                { data._updated }
              </div>
            </li>
            <li className="u-col-4">
              <div className="name">
                硬弹
              </div>
              <div className="value">
                { data.hb_time || '—' }
              </div>
            </li>
            <li className="u-col-4">
              <div className="name">
                营销广告退订
              </div>
              <div className="value">
                { data.unsubscribe_time || '—' }
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default DetailBaseMsg

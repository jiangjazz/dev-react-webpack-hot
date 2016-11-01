import React, { Component } from 'react'

import {
  Button,
  Icon,
  Input
} from 'UI'

import DetailFields_List from './detailFields-list'

class DetailFields extends Component {
  constructor(props) {
    super(props)
    const {
      data
    } = this.props
    this.state = {
      canEdit: false,
      oldData: data,
      email: data.email,
      mobile: data.mobile,
      custom_fields: data.custom_fields || {}
    }
  }
  // 同步更新state数据
  set_custom_fields(key, e) {
    const new_custom_fields = this.state.custom_fields
    new_custom_fields[key] = e.target.value
    this.setState({
      custom_fields: new_custom_fields
    })
  }
  // 取消修改，重置数据
  cancel() {
    const data = this.state.oldData
    this.setState({
      canEdit: false,
      email: data.email,
      mobile: data.mobile,
      custom_fields: data.custom_fields || {}
    })
  }
  //
  save() {
    const {
      email,
      mobile,
      custom_fields
    } = this.state
    const {
      list_id,
      user_id
    } = this.props
    let config = {
      list_id,
      user_id,
      email,
      mobile
    }
    Object.assign(config, custom_fields)
    this.props.onSave(config)
    this.setState({
      canEdit: false
    })
  }
  render() {
    const {
      canEdit,
      email,
      mobile,
      custom_fields
    } = this.state

    return(
      <div className="details-row fields">
        <div className="details-head">
          联系人字段
          {
            !canEdit?
            <div className="actGroup">
              <Button
                color="main"
                type="radius-half"
                size="small"
                outline
                onClick={ () => {
                  this.setState({canEdit: true}, () => {
                    this.refs.emailInput.refs.u_ipt.focus()
                  })
                } }
                >
                <Icon type="edit"/>
                <span>编辑</span>
              </Button>
            </div>
            :
            <div className="actGroup">
              <Button
                type="radius-half"
                size="small"
                outline
                onClick={ this.cancel.bind(this) }
                >
                <span>取消</span>
              </Button>
              <Button
                color="main"
                type="radius-half"
                size="small"
                outline
                onClick={ this.save.bind(this) }
                >
                <span>保存</span>
              </Button>
            </div>
          }

        </div>
        <div className="details-body f-cb">
          <ul className="u-row">
            <li className="u-col-4">
              <div className="name">
                邮箱
              </div>
              <div className="value">
                {
                  canEdit?
                  <Input
                    defaultValue={ email }
                    onChange={ (e) => {
                      this.setState({
                        email: e.target.value
                      })
                    } }
                    ref="emailInput"/>
                  :email
                }

              </div>
            </li>
            <li className="u-col-4">
              <div className="name">
                手机号码
              </div>
              <div className="value">
              {
                canEdit?
                <Input
                  defaultValue={ mobile }
                  onChange={ (e) => {
                    this.setState({
                      mobile: e.target.value
                    })
                  } }
                  />
                :mobile
              }
              </div>
            </li>
            {
              Object.keys(custom_fields).map( (item, index) => {
                return (
                  <DetailFields_List
                    key={ '_custom_fields' + index}
                    text={ item }
                    canEdit={ canEdit }
                    value={ custom_fields[item] }
                    onChange={ this.set_custom_fields.bind(this, item) }
                    />
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }
}

export default DetailFields

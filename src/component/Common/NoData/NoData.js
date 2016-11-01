import React, { Component, PropTypes } from 'react'
import {
  Button,
  Icon
} from 'UI'

/**
* creater: Lay
* tip: 无数据状态
* 参数:
*   {String}   type      : 页面类型  option (contact | contactGroup | filter | filed)
*   {Function} onCLick   : 添加按钮的函数
*
*/

const TypeRule = ['contact', 'contactGroup', 'filter', 'filed']

class NoData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      config: {
        contact:{
          content: '您可以通过多种方式上传一批联系人，并对联系人进行管理',
          icon: 'user-icon',
          title: '联系人'
        },
        contactGroup:{
          content: '您可以将一批联系人归为一个联系人组，方便管理和发送调用',
          icon: 'users-icon',
          title: '联系人组'
        },
        filter:{
          content: '您可以创建一个筛选器，每个筛选器都可以设置最多3个组合条件，每个联系人组都可以套用最多5个筛选器',
          icon: 'filter-icon',
          title: '过滤器'
        },
        filed:{
          content: '您可以添加不限数量的自定义字段，用来完善联系人信息',
          icon: 'field-icon',
          title: '字段'
        }
      }
    }
  }
  render() {
    let { type, onClick } = this.props
    let { content, icon, title } = this.state.config[type]

    return (
      <div className="m-noData__box">
        <div className={'m-noData__icon ' + type}>
          <img className="m-noData--img" src={require('./assets/' + icon + '.png')} />
        </div>
        <p className="m-noData__content">{ content }</p>
        <Button color="main" size="large" type="radius-half" className="m-noData__button" onClick={ onClick }>
          <Icon type="plus" />
          <span>添加{ title }</span>
        </Button>
      </div>
    )
  }
}

NoData.propTypes = {
  type: PropTypes.oneOf(TypeRule),
  onClick: PropTypes.func
}

export default NoData

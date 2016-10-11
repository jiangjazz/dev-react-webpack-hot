import React, { Component } from 'react'
import Icon from '../Icon'

/**
* creater: lay
* tip: 多选框
* dec:
* 参数:
*   {String}     value     : value值
*   {String}     name      : name值
*   {Number}     distance  : 文字离图标的距离  默认: 30
*   {String}     key       : 循环的时候请添加 key 值
*   {Boolean}    lock      : 锁住状态, 锁住状态下为 disabled 只是icon不一样
*   {Boolean}    disabled  : 是否静止
*   {Boolean}    checked   : 是否默认选中
*   {Function}   onChange  : 点击后出现的回调函数, 参数是 props 和 input:checked
*/

class Checkbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { value, disabled, lock, checked, name, key, onChange , children, distance = 30} = this.props

    return (
      <label className="u-checkbox__wrap" key={ key }>
        <span className="u-checkbox__content">
          <input
            className="u-checkbox"
            type="checkbox"
            value={ value }
            name={ name }
            disabled={ lock || disabled }
            onChange={ this._hanlderChange.bind(this) }
            defaultChecked={ checked }
            ref="checkbox"/>
            {
              lock?
              <Icon type="lock" />:
              <i className="iconfont u-checkbox__icon"></i>
            }
        </span>
        <span className="u-checkbox__dec" style={{marginLeft: distance + 'px'}}>{ children }</span>
      </label>
    )
  }

  _hanlderChange() {
    let checkboxStatus = this.refs.checkbox.checked
    this.onChange && this.onChange(this.props, checkboxStatus)
  }
}

export default Checkbox

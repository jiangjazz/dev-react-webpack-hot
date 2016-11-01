import React, { Component } from 'react'
import Icon from '../Icon'

/**
* creater: lay
* tip: 多选框
* dec:
* 参数:
*   @param {String}     value     : value值
*   @param {String}     name      : name值
*   @param {Number}     distance  : 文字离图标的距离  默认: 30
*   @param {String}     key       : 循环的时候请添加 key 值
*   @param {Boolean}    lock      : 锁住状态, 锁住状态下为 disabled 只是icon不一样
*   @param {Boolean}    disabled  : 是否静止
*   @param {Boolean}    checked   : 是否默认选中
*   @param {Function}   onChange  : 状态改变后的, 参数是 props 和 input:checked
*   @param {Function}   onClick   : 主要用于防止 冒泡事件
*/

class Checkbox extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      value,
      disabled,
      lock,
      defaultChecked,
      checked,
      name,
      key,
      onChange,
      onClick = () => {},
      children,
      distance = 30} = this.props

    return (
      <label className="u-checkbox__wrap" key={ key } onClick={ this._hanlderClick.bind(this) }>
        <span className="u-checkbox__content">
          <input
            className="u-checkbox"
            type="checkbox"
            value={ value }
            name={ name }
            disabled={ lock || disabled }
            onChange={ this._hanlderChange.bind(this) }
            defaultChecked={ defaultChecked }
            checked={ checked }
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
    this.props.onChange && this.props.onChange(this.props, checkboxStatus, this.refs.checkbox)
  }

  _hanlderClick(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    this.props.onClick && this.props.onClick()
  }
}

export default Checkbox

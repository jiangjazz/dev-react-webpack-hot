import React, { Component, PropTypes } from 'react'

/**
* creater: lay
* tip: 单选框
* dec:
* 参数:
*   {String}     value     : value值
*   {String}     name      : name值, 必填
*   {String}     key       : 循环的时候请添加 key 值
*   {Boolean}    disabled  : 是否静止
*   {Boolean}    checked   : 是否默认选中
*   {Function}   onChange  : 点击后出现的回调函数, 参数是 props
*/

class Radio extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { value, disabled, checked, name, key, onChange , children, distance = 30} = this.props
    return (
      <label className="u-radio__wrap" key={ key }>
        <span className="u-radio__content">
          <input
            className="u-radio"
            type="radio"
            value={ value }
            name={ name }
            disabled={ disabled }
            onChange={ this._hanlderChange.bind(this) }
            defaultChecked={ checked }
            ref="radio"/>
            <i className="iconfont u-radio__icon"></i>
        </span>
        <span className="u-radio__dec" style={{marginLeft: distance + 'px'}}>{ children }</span>
      </label>
    )
  }

  _hanlderChange() {
    let radioStatus = this.refs.radio.checked
    this.onChange && this.onChange(this.props)
  }
}

Radio.propTypes = {
  name: PropTypes.string.isRequired
}

export default Radio

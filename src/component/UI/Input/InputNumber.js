import React, { Component } from 'react'
import Input from './Input'
import InputGroup from './InputGroup'

/**
* tip: 数字输入框
* arguments:
* onChange  { Function } 事件回调  参数为 改变的数字 和 event对象
* lessThanZero { Blooean } 输入不能小于0  事件在失去焦点的时候发生
*/

class InputNumber extends Component {
  constructor(props) {
    super(props)
    this.state = {
      _value: 0
    }
  }

  componentDidMount() {
    this.setState({
      _value: this.props.defaultValue
    })
  }

  render() {
    let { defaultValue, ref } = this.props
    let values = defaultValue
    return (
      <InputGroup type="number">
        <Input
          value={ this.state._value }
          addClassName="u-input__numbers"
          onBlur={ this.handlerBlur.bind(this) }
          onChange={ this.hanlderChange.bind(this)}
          ref="number_ipt"
        />
        <div className="u-input__number__action" data-value={this.state._value} onMouseLeave={ this.handlerBlur.bind(this) }>
          <a className="u-input__number--top" onClick={ this.hanlderClick.bind(this, 1) }></a>
          <a className={['u-input__number--bottom', this.state.disabledBottom? 'u-input__number--disabled' : ''].join(' ')} onClick={ this.hanlderClick.bind(this, -1) }></a>
        </div>
      </InputGroup>
    )
  }

  hanlderChange(e) {
      let strArr = []
      let val = e.target.value
      strArr =  _.compact(_.map(val, (n) => { return /^-?[0-9]*(\.[0-9]*)*(\,[0-9]*)?$/gi.test(n)? n:null  }))
      this.props.onChange && this.props.onChange(strArr.join(''))
      this.setState({_value: strArr.join('')})
  }

  hanlderClick(number, e) {
    let value = parseInt(this.state._value? this.state._value : 0) + number
    let action = { _value: value, disabledBottom: false }

    this.setState(action)
    this.props.onChange && _.defer(this.props.onChange, parseInt(value))
  }

  handlerBlur() {
    this.props.onBlur && this.props.onBlur(this.state._value)
  }
}

export default InputNumber

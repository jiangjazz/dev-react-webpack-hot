import React, { Component } from 'react'
import {hasClass, addClass, removeClass} from './util'
import classnames from 'classnames'
import _ from 'lodash'
/**
* creater: lay
* tip: 基础的 input
* dec: 提供基础的 input, 想表单验证出错提示 搜索的组件 请自行组合, 默认宽度为 100%
*      未完成，只提供最基础的
* 参数 :
*   原生的 input 的参数
*   {Boolean} error : 是否显示错误状态
*   {String}  shape : 形状  ( default | round[圆] )
*   {String} addClassName: 如果要改变 另外添加className
*/

class Input extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let el = this.refs.u_ipt
    if ( hasClass(el, 'u-input--search') ) {
      el.onblur = function() {
        let val = el.value
        !val? removeClass(el, 'active') : null
      }

      el.onfocus = function() {
        addClass(el, 'active')
      }
    }
  }

  render() {
    let props = _.assign({}, this.props)
    let filterProps = ['addClassName', 'error', 'shape']
    let otherProps = {}

    const inputClassName = classnames({
      ['u-input']: true,
      ['u-input--error']: !!props.error,
      ['u-input--line']: props.shape == 'line',
      ['u-input--round']: props.shape == 'round',
      [props.addClassName]: !!props.addClassName
    });

    if ('value' in props) {
      filterProps.push('defaultValue')
    }

    _.each(props, (key, keyName) => {
      filterProps.indexOf(keyName) < 0? otherProps[keyName] = key : null
    })
    return (
      <input
        className={ inputClassName }
        type="text"
        {...otherProps}
        ref="u_ipt"/>
    )
  }
}

export default Input

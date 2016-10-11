import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

import Icon from '../Icon'

/**
* creater: Janzen
* tip: 按钮
* dec:
* 参数:
* 	[ color    ]: 按钮颜色     默认 default      选项：BTN_color
* 	[ type     ]: 按钮形状     默认 无           选项：BTN_type
* 	[ disabled ]: 是否无效化   默认 无
* 	[ outline  ]: 幽灵化按钮   默认 无
* 	[ onClick  ]: 点击触发事件 默认 无
* 	[ href     ]: 链接属性     默认 无
*
*/

const BTN_color = [
  'default',
  'main',
  'secondary'
]

const BTN_type = [
  '',
  'radius-half',
  'radius-total',
  'no-border'
]
const BTN_size = [
  '',
  'small',
  'large',
  'larger'
]

class Button extends Component {
  render() {
    let {
      href,
      onClick,
      disabled,

      color='default',
      type='',
      size='',
      outline=''
     } = this.props

     // className
     let componentClass = [
       'u-btn',
       color,
       type,
       size,
       ( disabled? 'disabled': '' ),
       ( outline? 'outline': '' ),
       this.props.className
     ]

    if ( href ) {
      return (
        <Link
          className={componentClass.join(' ')}
          disabled={ disabled }
          to={ href }
          onClick={ onClick }>
          {this.props.children}
        </Link>
      )
    } else {
      return (
        <button
          className={componentClass.join(' ')}
          disabled={ disabled }
          onClick={ onClick }>
          {this.props.children}
        </button>
      )
    }

  }
}

Button.propTypes = {
  color: PropTypes.oneOf(BTN_color),
  type: PropTypes.oneOf(BTN_type),
  size: PropTypes.oneOf(BTN_size),
  disabled: PropTypes.bool,
  outline: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func
}

export default Button

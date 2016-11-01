
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {PopperManager, PopperArrow} from './lib'

/**
* creater: lay
* tip: 依赖popper.js 压缩后为3k
* dec: toolTip 现在有问题,待修复
* 参数:
*   {Boolean}  alignCenter :提示文字是否要居中 默认居中
*   {String}   content     :提示的文字
*   {String}   placement   :提示框位置 (left | top | right | bottom) + options(start | end)
*   {Element}  children    :子组件 (最好以添加button)
*/

class Tooltips extends Component {
  render() {
    let {children, content, placement, alignCenter = true} = this.props
    return (
      <PopperManager placement={placement} ref="popper">
          {/* Reference */}
          <div
            className="u-tip__content"
            onMouseEnter={ this._handlerMouseEnter.bind(this) }
            onMouseLeave={ this._handlerMouseLeave.bind(this) }>
            { children }
          </div>
          {/* Popper */}
          <div className={(alignCenter? 'u-tip--Textcenter': 'u-tip--Textleft')}>
            { content }
            <PopperArrow className="popper__arrow"/>
          </div>
      </PopperManager>
    )
  }

  _handlerMouseEnter() {
    this.refs.popper._popperNode.className = 'u-tip__popper active'
  }

  _handlerMouseLeave() {
    this.refs.popper._popperNode.className = 'u-tip__popper'
  }
}


export default Tooltips

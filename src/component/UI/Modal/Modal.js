import React, { Component, PropTypes } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Icon from '../Icon'

/**
* creater: lay
* tip: 模态框基本
* dec: 模态框中的关闭和开启由父组件控制, 未完成.....
* 参数:
*   {Boolean}  sholudBGClose  : 是否要确定背景点击取消
*   {Boolean}  showModal      : 是否要打开模态框
*   {Boolean}  showFooter     : 是否要确认和取消按钮 默认为 显示
*   {String}   size           : 模态框的大小 ( s | m | l ) 默认为 m
*   {String}   title          : 模态框的标题
*   {Number}   maxHeight      : 限制最大的宽度  用于内容较长的时候出现滚动条
*   {Function} onSure         : 确认后的回调函数
*   {Function} onClose        : 关闭后的回调函数
*/

class Modal extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //  判断是否到顶部距离小于200 是的话top固定为 200px
    //  后面问产品需求

  }

  render() {
    let { size, title, showModal, maxHeight, showFooter = true, children, onSure, onClose, sureText = '确定', cancelText='取消' } = this.props
    let MAXHeight = maxHeight? {height: maxHeight + 'px'} : {}
    return (
      showModal? (<div className="u-modal__wrap">
        <div
          className="u-modal__mark"
          onClick={ this._handlerMarkClick.bind(this) }></div>
        <div className={'u-modal__content u-modal' + (size? '--' + size : '--m' )}>
          <Icon
            type="remove"
            onClick={ this._handlerClose.bind(this) } />
          <Header
            title={ title }
            size={ size }/>
          <div
            className={ 'u-modal__body ' +  (maxHeight? 'u-modal__body--flow' : '')}
            style={MAXHeight}>
            { children }
          </div>
          {
            showFooter?
            <Footer
              sureText={sureText}
              cancelText={cancelText}
              clickSure={ this._handlerSure.bind(this) }
              clickClose={ this._handlerClose.bind(this) }
              size={ size }/>:
              null
          }
        </div>
      </div>): null
    )
  }

  _handlerMarkClick() {
    if (!this.props.showModal) return
    this._handlerClose()
  }

  _handlerSure() {
    this.props.onSure && this.props.onSure()
  }

  _handlerClose() {
    this.props.onSure && this.props.onClose()
  }
}

export default Modal

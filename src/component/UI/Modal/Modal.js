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
*   {Boolean}  showMark       : 是否有背景
*   {Boolean}  showFooter     : 是否要确认和取消按钮 默认为 显示
*   {Boolean}  showSureButton : 是否要显示 确认按钮 默认为 显示
*   {Boolean}  onSureLoding   : 是否确认后 按钮变成loding状态 默认 false
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
    let {
      size,
      title,
      showModal = false,
      onSureLoding = false,
      maxHeight,
      showFooter = true,
      showMark = true,
      sholudBGClose = false,
      children,
      onSure,
      className = '',
      onClose,
      sureDisabled,
      showSureButton = true,
      sureText = '确定',
      cancelText='取消'
    } = this.props

    let MAXHeight = maxHeight? {height: maxHeight + 'px'} : {}
    return (
      showModal?(
        <div className={'u-modal__wrap ' + (showModal? ' u-modal__wrap--show ': '') + className}>
          <div
            className={'u-modal__mark' + (!showModal? ' u-modal__mark--hide': '')}
            onClick={ this._handlerMarkClick }></div>

          <div className={'u-modal__content u-modal' + (size? '--' + size : '--m' ) + (showModal? ' u-modal--enter' : '')}>
            <Icon
              type="remove"
              onClick={ onClose } />
            <Header
              title={ title }
              size={ size }/>
            <div
              className={ 'u-modal__body ' + (maxHeight? 'u-modal__body--flow' : '') + (!children? ' u-modal__body--empty' : '')}
              style={MAXHeight}>
              { children }
            </div>
            {
              showFooter?
              <Footer
                onLoding={ onSureLoding }
                showSureButton={ showSureButton }
                sureDisabled={ sureDisabled }
                sureText={ sureText }
                cancelText={ cancelText }
                clickSure={ onSure }
                clickClose={ onClose }
                size={ size }
              />:null

            }
          </div>
        </div>
      ) : null
    )
  }

  _handlerMarkClick = () => {
    if (!this.props.sholudBGClose) return false;
    this.props.onSure && this.props.onClose()
  }

}

export default Modal

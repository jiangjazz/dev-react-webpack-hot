import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

// 引入图片
let logo = require('../../statics/logo.png')
let pic1 = require('../../statics/logo-email.png')
let pic2 = require('../../statics/logo-message.png')
let pic3 = require('../../statics/logo-mrtb.png')
let pic4 = require('../../statics/logo-journey.png')

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // 是否显示
      showUser: false
    }
  }
  // 显示
  showNav() {
    $('.u-menu-nav').stop().slideDown()
  }
  // 隐藏
  hideNav() {
    $('.u-menu-nav').stop().slideUp()
  }
  // 切换个人信息显示
  toggoleDetail(e) {
    let showUser = !this.state.showUser
    if(showUser) {
      $('.dropdown-menu').stop().slideDown()
    } else {
      $('.dropdown-menu').stop().slideUp()
    }
    this.setState({
      showUser: showUser
    })
    // 阻止冒泡
    this.stop(e)
  }
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  checkActive (regexp) {
    const pattern = new RegExp('^' + regexp + '(\/|(\/.*))?$', 'ig')
    return pattern.test(this.props.pathname)
  }
  // ready
  componentDidMount() {
    let _this = this
    $(document).on('click', function(){
      $('.dropdown-menu').slideUp()
      _this.setState({
        showUser: false
      })
    })
  }
  render() {
    let { pathname } = this.props

    return (
      <div className="m-header">
        <div className="m-top">
          <a href="http://dmayun.com/" className="u-logo">
              <img src={ logo } alt="" width="190" height="60" />
          </a>

          <dl className="u-nav">
              <dt className="u-menu" onMouseEnter={ this.showNav } onMouseLeave={ this.hideNav }>
                  <b className="icon-sprite icon-logo"></b>
                  <span className="contact">联系人</span>
              </dt>
              <dd className={ this.checkActive('\/')? 'active' : ''} >
                <Link to="/">联系人组</Link>
              </dd>
              <dd className={ this.checkActive('\/ui')? 'active' : ''} >
                <Link to="/ui">UI组件</Link>
              </dd>
          </dl>

          <div className="u-userCenter f-fr">
              <a href="http://dmayun.com/#!/shop/prepaid/" className="goShopping f-ib f-vam">
                  <i className="topIcon icon-shop"></i>
              </a>
              <a href="http://dmayun.com/#!/setting/accountSet/" className="setting f-ib f-vam">
                  <i className="topIcon icon-setting"></i>
              </a>
              <div className="u-dropdown f-ib f-vam">
                  <div className="dropdown-show f-cb">
                      <div className="f-fl levelImg">
                          <div className="levelPic f-ib f-vam level-sprite"></div>

                      </div>
                      <div className="f-fl user" title="Jazz" onClick={ this.toggoleDetail.bind(this) }>
                      </div>
                  </div>
                  <dl className="dropdown-menu" onClick={ this.stop }>
                      <dt className="welcom" title="Jazz">
                          Welcome,Jazz
                      </dt>
                      <dd className="item email">
                          <i className="logo-sprite logo-email"></i>
                           邮件剩余量：
                          <span className="num">10</span>
                      </dd>
                      <dd className="item sms">
                          <i className="logo-sprite logo-sms"></i>
                           短信剩余量：
                          <span className="num">20</span>
                      </dd>
                      <dd className="item mms">
                          <i className="logo-sprite logo-mms"></i>
                           彩信剩余量：
                          <span className="num">5</span>
                      </dd>
                      <dd className="item btnGroup">
                          <a href="https://dmayun.kf5.com/" className="u-btn u-btn-default">使用帮助</a>

                          <a href="/sms/logout" className="u-btn u-btn-signout">登出</a>
                      </dd>
                  </dl>
              </div>
          </div>

      </div>
      // <div className="u-menu-bg"></div>
      <div className="u-menu-nav" ref="menu" onMouseEnter={ this.showNav } onMouseLeave={ this.hideNav }>
          <ul>
              <li>
                  <a href="http://email.beta.dmayun.com?access-token=0384e74906e5482ba9a59dc59df2095e">
                      <img src={ pic1 } width="100" height="120" alt="" />
                  </a>
              </li>
              <li>
                  <a href="http://sms.beta.dmayun.com/sms?access_token=0384e74906e5482ba9a59dc59df2095e">
                      <img src={ pic2 } width="100" height="120" alt="" />
                  </a>
              </li>
              <li className="disabled">
                  <a href="javascript:;">
                      <img src={ pic3 } width="100" height="120" alt="" />
                  </a>
              </li>
              <li>
                  <a href="javascript:;">
                      <img src={ pic4 } width="100" height="120" alt="" />
                  </a>
              </li>
          </ul>
      </div>
      </div>
    )
  }
}

export default Header

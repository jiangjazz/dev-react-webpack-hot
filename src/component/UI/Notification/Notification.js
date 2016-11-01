/**
* creater: lay
* tip: 通知类为定义为一个方法
* dec: 通知类中的icon不固定,参数不固定,出现的页面也不一定
*      固写成一个方法
* 参数:
*   {String} iconType     : icon类型, 名字参考 Icon 组件使用方法
*   {Number} defaultTime  : 出现的时间, 默认显示3秒 | 单位　秒
*   {Number} defaultTop   : 出现的顶部距离 默认为 100px
*   {String} content      : 提示文字
*   {Function} onClose    : 关闭事件
* method:
*   Notification.init(config)
*/

//  root node
let body = document.getElementsByTagName('body')[0]

/**
* 定义默认变量
*/
const setTime = 3
const setTop = '45%'

//  定义类
class Notification {

  _createDom(node) {
		return document.createElement(node)
	}

  _template({iconType, content, defaultTop}) {
    let $div = this._createDom('div')
    let $icon = iconType? '<i class="iconfont icon-'+ iconType +'"></i>' : '';

    let $template = `
      <div class="u-notifiy__content">
        <div class="u-notifiy__inset">
          <i class="iconfont icon-remove"></i>
          ${$icon}
          <span>${content}</span>
        </div>
      </div>
    `
    //$div.style.top = defaultTop? defaultTop + 'px' : setTop
    $div.className = 'u-notifiy__wrap'
    $div.innerHTML = $template;

    return $div
  }

  static _timer = null

  _setClose($tem, config) {
    let _this = this;
    let el = $tem.getElementsByClassName('icon-remove')[0]
    el.onclick = () => {
      clearTimeout(_this._timer)
      body.removeChild($tem)
      config.onClose && config.onClose()
    }
  }

  _setAnimation($tem, {defaultTime, onClose}) {
    let hideTime =  defaultTime? defaultTime * 1000 : setTime * 1000
    setTimeout(() => {
      $tem.className += ' u-notifiy--transition'
    }, 1)
    setTimeout(() => {
      $tem.className = 'u-notifiy__wrap'
    }, hideTime)
    this._timer = setTimeout(() => {
      body.removeChild($tem)
      onClose && onClose()
    }, hideTime + 300)
  }

  _init(config) {
    let $tem = this._template(config)
    body.appendChild($tem)
    this._setAnimation($tem, config)
    this._setClose($tem, config)
  }

  init(config) {
    this._init(config)
  }
}

export default new Notification()

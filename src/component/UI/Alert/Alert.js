/**
* creater: lay
* tip: 通知类为定义为一个方法
* dec: 通知类中的icon不固定,参数不固定,出现的页面也不一定
*      固写成一个方法
* 参数:
*   {String} content    : 提示文字
*   {String} type       : 提示类型 option ( danger | warning | success | info )
* method:
*   Alert.init(config)
*/
let body = document.getElementsByTagName('body')[0]

const setTime = 5000

const alertHeadInfo = {
  'info'   : '信息提示：',
  'success': '成功提示：',
  'warning': '等待提示：',
  'danger' : '危险提示：'
}

class Alert {

  _createDom(node) {
		return document.createElement(node)
	}

  _template(type, content) {
    let _this = this
    let $div = this._createDom('div')

    let $template = `
      <div class="u-alert__content">
        <div class="u-alert__inset">
          <i class="iconfont icon-remove"></i>
          <p class="u-alert__head">
            <span class="u-alert__head__type">${alertHeadInfo[type]}</span>
            <span class="u-alert__head__dec">${content}</span>
          </p>
        </div>
      </div>
    `
    $div.className = 'u-alert__wrap u-alert--' + type
    $div.innerHTML = $template;

    let $closeI = $div.getElementsByClassName('icon-remove')[0]
    $closeI.onclick = () => {_this._setClose(_this, $div)}

    return $div
  }

  _timer = null

  _setClose(_this, $tem) {
    clearTimeout(_this._timer)
    body.removeChild($tem)
  }

  _setAnimation(dom) {
		setTimeout(function() {
			dom.style.top = '100px'
		}, 0)
		setTimeout(function() {
			dom.style.top = '-200px'
		}, setTime)
		this._timer = setTimeout(function() {
			body.removeChild(dom)
		}, setTime + 400)
	}

  _init({type, content}) {
    let $tem = this._template(type, content);
		body.appendChild($tem)
		this._setAnimation($tem)
  }

  init(config) {
    this._init(config)
  }
}

export default new Alert()

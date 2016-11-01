import React, { Component, PropTypes } from 'react'


/**
* creater: Janzen
* tip: 下拉框
* dec:  children 只接受map循环输出生成的ele组
* 参数:
* 	[ color    ]: 颜色         默认 default      选项： SELECT_color
* 	[ position ]: list出现位置 默认 无           选项： SELECT_position
* 	[ type     ]: 类型        默认 无            选项： SELECT_type
* 	[ disabled ]: 是否无效化   默认 无
* 	[ text     ]: 下拉框文字   默认 '下拉框'
* 	[ replace  ]: 选中选项后是否替换展示文字  默认
*
*/




// 颜色
const SELECT_color = [
  '',
  'main',
  'secondary'
]
// list出现位置
const SELECT_position = [
  'default',      // 左下
  'bottomRight',  // 右下
  'topLeft',      // 左上
  'topRight'      // 右上
]
// 类型
const SELECT_type = [
  '',
  'type2', // 左右有竖线分隔开
]


class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: this.props.text || '下拉框'
    }
  }
  toggleList(e) {
    let Iselect = this.refs.Iselect
    if( this.props.disabled ) {
      return
    }
    $(Iselect).toggleClass('active')

    this.stop(e)
  }
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  // 依据需要重新生成child
  setDefaultOpen(item) {
    const _this = this
    let { replace } = _this.props
    let {
      text,
      onClick = () => {}
    } = item.props

    // 重设onClick
    function itemClick () {
      if ( replace )  {
        _this.setState({
          text: text
        })
      }
      onClick()
    }
    return React.cloneElement(item, { onClick: itemClick })
  }
  render () {
    // 获取数据
    let {
      color ='',
      position ='default',
      type = '',
      disabled,
      replace
    } = this.props

    // className
    let componentClass = [
      'u-select',
      color,
      type,
      position,
      ( disabled? 'disabled': '' ),
      this.props.className
    ]
    //生成
    return (
      <div ref="Iselect" className={componentClass.join(' ')}>
        <div className="u-hd" onClick={ this.toggleList.bind(this) }>
          <span>{ this.state.text }</span>
          <div className="iconCt">
            <i className="iconfont"></i>
          </div>
        </div>
        <div className="u-bd">
          <ul>
            {this.props.children.map( this.setDefaultOpen.bind(this) )}
          </ul>
        </div>
      </div>
    )
  }
}

Select.propTypes = {
  color: PropTypes.oneOf(SELECT_color),
  position: PropTypes.oneOf(SELECT_position),
  type: PropTypes.oneOf(SELECT_type),
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  disabled: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.array
  ])
}

export default Select

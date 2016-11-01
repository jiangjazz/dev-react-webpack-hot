import React, { Component, PropTypes } from 'react'

import { InputGroup, Input, Icon } from '../../UI'

/**
* creater: Janzen
* tip: 多功能下拉框
* dec:
* 参数:
* 	[ text         ]: 下拉框文字                  默认 '下拉框'
* 	[ liDates      ]: 下拉list数据源              **必传**
* 	[ disabled     ]: 是否无效化                  默认 无
* 	[ placeholder  ]: 搜索框默认文字              默认 '下拉框'
*
*/


class SelectWithInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text || ''
    }
  }
  focusList(e) {
    let Iselect = this.refs.Iselect
    if( this.props.disabled ) {
      return
    }
    $(Iselect).addClass('active')
    this.stop(e)
  }
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  // a链接复合点击
  click(item) {
    this.setState({
      text: item.text
    })
    this.props.onClick()
  }
  getItem () {
    // 获取参数
    let {
      liDates = [],
      replace
    } = this.props

    if( liDates.length !== 0 ) {
      return liDates.map( (item, index) => {
        return (
          <li key = { 'item' + index }>
            <a href={ item.href? item.href: 'javascript:;' } onClick={ this.click.bind(this, item) }>
              { item.text }
            </a>
          </li>
        )
      })
    }
  }
  actFn (e) {
    this.props.actClick(e)
    this.stop(e)
  }
  render () {
    // 获取数据
    const {
      disabled,
      placeholder = '提示文字',
      actCt = '',
      actClick,
      onChange = () => {}
    } = this.props

    // className
    const componentClass = [
      'u-selectMulti type2',
      ( disabled? 'disabled': '' ),
      this.props.className
    ]
    //生成
    return (
      <div ref="Iselect" className={componentClass.join(' ')}>
        <div className="u-hd hasInput" onClick={ this.stop.bind(this) }>
          <Input
            placeholder={ placeholder }
            onFocus={ this.focusList.bind(this) }
            onChange= { onChange }
            />
        </div>
        <div className="u-bd">
          <ul onClick={ this.stop.bind(this) }>
            {this.props.children}

          </ul>
          <div className="actCt" onClick={ this.actFn.bind(this) }>
            {this.props.actCt}
          </div>
        </div>
      </div>
    )
  }
}

SelectWithInput.propTypes = {
}

export default SelectWithInput

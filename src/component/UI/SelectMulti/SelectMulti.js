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
* 	[ replace      ]: 选中选项后是否替换展示文字   默认 无
* 	[ onChange     ]:                           默认 无
*
*/

const SELECTMULTI_type = [
  '',
  'type2' // 带搜索框的下拉菜单
]

class SelectMulti extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: this.props.text || '下拉框',
      filter: this.props.filter || '',
      value: this.props.value || ''
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
  // 设置过滤字段
  setFilter(e) {
    this.setState({
      filter: e.target.value
    })
  }
  // a链接复合点击
  click(item) {
    let {
      replace,
      onChange = () => {}
    } = this.props
    onChange(item)
    item.onClick ? item.onClick(): null
    if ( replace ) {
      this.setState({
        text: item.text
      })
    }
    this.setState({
      value: item.value? item.value: item.text
    })
  }
  getItem () {
    // 获取参数
    let {
      liDates = [],
      replace
    } = this.props
    let { filter } = this.state
    // 内部定义参数
    let filterList = []
    const pattern = new RegExp(filter)

    filterList = liDates.filter( ( item, index ) => pattern.test(item.text))

    if( filterList.length === 0 ) {
      return (
        <li title={ '没有找到' + filter + '相关选项' }>
          <a href="javascript:;" className="noDate">
            没有找到"{ filter }"相关选项
          </a>
        </li>
      )
    } else {
      return filterList.map( (item, index) => {
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
  render () {
    // 获取数据
    let {
      type,
      disabled,
      placeholder = '提示文字'
    } = this.props

    // className
    let componentClass = [
      'u-selectMulti',
      type,
      ( disabled? 'disabled': '' ),
      this.props.className
    ]
    //生成
    return (
      <div ref="Iselect" className={componentClass.join(' ')}>
        <div className="u-hd" onClick={ this.toggleList.bind(this) } title={ this.state.text }>
          { this.state.text }
          <div className="iconCt">
            <i className="iconfont"></i>
          </div>
        </div>
        <div className="u-bd">
          {
            type === 'type2'?
            <div className="searchCt" onClick={ this.stop.bind(this) }>
              <InputGroup type="search">
                <Input value={ this.state.filter } placeholder={ placeholder } onChange= { this.setFilter.bind(this) }/>
                <Icon type="search"/>
              </InputGroup>
            </div>
            : null
          }
          <ul>
            { this.getItem() }
          </ul>
          <div className="actCt" onClick={ this.stop.bind(this) }>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

SelectMulti.propTypes = {
  // color: PropTypes.oneOf(SELECT_color),
  // position: PropTypes.oneOf(SELECT_position),
  // type: PropTypes.oneOf(SELECT_type),
  // text: PropTypes.string,
  // disabled: PropTypes.bool,
  // children: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.element
  // ])
}

export default SelectMulti

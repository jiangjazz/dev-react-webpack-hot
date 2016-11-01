import React, { Component } from 'react'

import {
  Checkbox,
  Icon,
  SelectMulti,
  Button,
  Input
} from 'UI'

class FieldsMatchingTableHead extends Component {
  constructor(props) {
    super(props)
    const {
      item,
      itemWidth
    } = this.props
    this.state = {
      // 创建字段的input展示
      showInput: false,
      ctWidth: (item.length * itemWidth) || 0
    }
  }
  // 验证是否为邮箱
  checkEmail(value) {
    const pattern = new RegExp(/^[^@\.]*@[^@\.]{2,}\.[^@\.]{2,}$/gui)
    return pattern.test(value)
  }
  // 验证是否为手机号
  checkMobile(value) {
    const pattern = new RegExp(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/gui)
    return pattern.test(value)
  }
  // 选中一个选项
  eachChange(index, selData){
    console.log('%c下拉框改变了', 'background: red', selData)
    this.props.onEachClick(index, selData.value)
  }
  // 重构数组，使其可以被组件接受
  resetFieldsArr() {
    const {
      fieldsArr
    } = this.props
    return fieldsArr.map( (item) => {
      return {
        text: item.desc,
        value: item.name
      }
    } )
  }

  render() {
    const {
      itemWidth,
      offsetDistance,
      item = [],
      onEachClick = () => {},
      children
    } = this.props
    const {
      showInput,
      ctWidth
    } = this.state

    return(
      <ul className="u-row">
        <li className="u-col-2 item">
          &nbsp;
        </li>
        <li className="u-col-20 item isCt"
          ref="offsetCt"
          >
          <ul className="item-group"
            style={
              {
                width: ctWidth +'px',
                marginLeft: '-'+offsetDistance +'px'
              }
            }
            >
            {
              item.map( (ite, i )=> {
                return (
                  <li className="item" key={ '_matchingListHead' + i }
                    style={{width: itemWidth + 'px'}}
                    >
                    <SelectMulti
                      type="type2"
                      text={
                        this.checkEmail(ite)?
                        '邮箱'
                        :this.checkMobile(ite)?
                        '手机号'
                        : '自定义字段'
                      }
                      liDates = { this.resetFieldsArr() }
                      replace
                      onChange={ this.eachChange.bind(this, i) }
                      >
                    </SelectMulti>
                  </li>
                )
              })
            }
          </ul>
        </li>
        <li className="u-col-2 item">
          { children }
        </li>
      </ul>
    )
  }
}

export default FieldsMatchingTableHead

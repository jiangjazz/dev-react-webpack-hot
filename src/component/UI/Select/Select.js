import React, { Component, PropTypes } from 'react'

class Select extends Component {
  render () {
    // 获取数据
    let liDates = this.props.items
    let items = liDates.map( (item, index) => {
      return (
        <li key={index}>
          <a href={ item.href }>
            { item.text }
          </a>
        </li>
      )
    })
    // disabled状态class
    let disabled = (this.props.disabled === false)? 'disabled ' : ''

    //生成
    return (
      <div className={"u-select "+ disabled + this.props.type} title={this.props.type}>
        <div className="u-hd">
          <b></b>
          <span>{this.props.children}</span>
        </div>
        <div className="u-bd">
          <ul>
            {items}
          </ul>
        </div>
      </div>
    )
  }
}

Select.propTypes = {
  items: PropTypes.array.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]),
  type: PropTypes.string,
  disabled: PropTypes.bool
}

export default Select

import React, { Component } from 'react'

import {
  Icon
} from 'UI'

class FieldsMatchingList extends Component {
  constructor(props) {
    super(props)
    const {
      item,
      itemWidth
    } = this.props
    this.state = {
      ctWidth: (item.length * itemWidth) || 0
    }
  }
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  render() {
    const {
      item,
      index,
      activeHead = [],
      itemWidth,
      offsetDistance,
      children
    } = this.props

    const {
      ctWidth
    } = this.state

    return(
      <ul className="u-row">
        <li className="u-col-2 item" onClick={ this.stop.bind(this) }>
          <Icon type="user" />
        </li>
        <li className="u-col-20 item isCt"
          >
          <ul className="item-group"
            style={
              {
                width: ctWidth +'px',
                transform: 'translateX(-'+ offsetDistance +'px)',
                WebkitTransform: 'translateX(-'+ offsetDistance +'px)',
                msTransnform: 'translateX(-'+ offsetDistance +'px)'
              }
            }
            >
            {
              item.map( (ite, i )=> {
                return (
                  <li
                    className={ ['item', activeHead[i] == '#ignore'? 'f-tdo': ''].join(' ') }
                    style={{width: itemWidth + 'px'}}
                    key={ '_matchingList'+ index + i }>
                    <div className="item_val">{ ite }</div>
                  </li>
                )
              } )
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

export default FieldsMatchingList

import React, { Component } from 'react'

import {
  Checkbox,
  Icon
} from 'UI'

class ContactTableHead extends Component {
  constructor(props) {
    super(props)
    const {
      fieldsArr,
      itemWidth
    } = this.props
    this.state = {
      ctWidth: (fieldsArr.length * itemWidth) || 0
    }
  }
  render() {
    let {
      itemWidth,
      offsetDistance,
      fieldsArr,
      onChange,
      checked
    } = this.props
    const {
      ctWidth
    } = this.state

    return(
      <ul className="u-row">
        <li className="u-col-2 item">
          <Checkbox distance={5}
          onChange={ onChange }
          checked={ checked }
          >全选</Checkbox>
        </li>
        <li className="u-col-13 item isCt"
          ref="offsetCt"
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
            <li className="item"
              style={{width: itemWidth + 'px'}}
              >
              <div className="item_val">
                邮箱（唯一值）
              </div>
            </li>
            <li className="item"
              style={{width: itemWidth + 'px'}}
              >
              <div className="item_val">
                手机（唯一值）
              </div>
            </li>
            {
              fieldsArr.map( (ite, i) => {
                if ( ite.name != 'email' && ite.name != 'mobile' ) {
                  return (
                    <li className="item"
                      key={ '_contactList_head_'+ i}
                      style={{width: itemWidth + 'px'}}
                      >
                      <div className="item_val">
                        { ite.name }
                      </div>
                    </li>
                  )
                } else {
                  return null
                }
              })
            }
          </ul>
        </li>
        <li className="u-col-2 item">
          创建账号
        </li>
        <li className="u-col-2 item">
          创建时间
        </li>
        <li className="u-col-2 item">
          最近更新
        </li>
        <li className="u-col-2 item">
          更新时间
        </li>
        <li className="u-col-1 item">
          {' '}
        </li>
      </ul>
    )
  }
}

export default ContactTableHead

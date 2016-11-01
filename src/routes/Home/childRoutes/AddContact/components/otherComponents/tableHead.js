import React, { Component } from 'react'

import {
  Checkbox,
  Icon,
  Button,
  Tooltips,
  Input
} from 'UI'

class AddContactTableHead extends Component {
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
    const {
      fieldsArr,
      offsetDistance,
      itemWidth
    } = this.props
    const {
      ctWidth
    } = this.state
    
    return(
      <ul className="u-row">
        <li className="u-col-1 item f-tac">
          序号
        </li>
        <li className="u-col-22 item isCt"
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
            <li className="item" style={{width: itemWidth + 'px', padding: '0 10px'}}>
              邮箱（唯一值）
            </li>
            <li className="item" style={{width: itemWidth + 'px', padding: '0 10px'}}>
              手机（唯一值）
            </li>
            {
              fieldsArr.map( (item, i) => {
                if ( item.name != 'email' && item.name != 'mobile' ) {
                  return (
                    <li className="item"
                      style={{width: itemWidth + 'px'}}
                      key={ '_addContact_list_head'+ i }
                      >
                      <div className="item_val">
                        { item.name }
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
        <li className="u-col-1 item">
          <Tooltips
            content="敬请期待"
            placement="left"
            >
            <Icon type="more-action" />
          </Tooltips>
        </li>
      </ul>
    )
  }
}

export default AddContactTableHead

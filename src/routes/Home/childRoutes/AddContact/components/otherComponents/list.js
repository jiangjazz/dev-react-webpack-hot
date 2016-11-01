import React, { Component } from 'react'

import {
  Icon,
  Input
} from 'UI'

import AddContactList_Item from './list-item'

class AddContactList extends Component {
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
      index,
      fieldsArr,
      offsetDistance,
      itemWidth,
      modifyData,
      children
    } = this.props

    const {
      ctWidth
    } = this.state

    return(
      <ul className="u-row">
        <li className="u-col-1 item f-tac">
          { index + 1 }
        </li>
        <li className="u-col-22 item isCt">
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
            <AddContactList_Item
              placeholder="邮箱"
              itemWidth={ itemWidth }
              name={ 'email' }
              modifyData={ modifyData }
              />
              <AddContactList_Item
                placeholder="手机号"
                itemWidth={ itemWidth }
                name={ 'mobile' }
                modifyData={ modifyData }
                />
            {
              fieldsArr.map( (item, i) => {
                if ( item.name != 'email' && item.name != 'mobile' ) {
                  return (
                    <AddContactList_Item
                      key={ '_addContact_list_'+ i + index}
                      itemWidth={ itemWidth }
                      name={ item.name + item.desc }
                      modifyData={ modifyData }
                      />
                  )
                } else {
                  return null
                }
              })
            }
          </ul>
        </li>
        <li className="u-col-1 item">
          {
            index == 0
            ? null
            : children
          }
        </li>
      </ul>
    )
  }
}

export default AddContactList

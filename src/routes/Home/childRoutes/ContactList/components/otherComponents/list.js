import React, { Component } from 'react'

import {
  Checkbox,
  Tooltips
} from 'UI'

class ContactList extends Component {
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
  // 阻止冒泡
  stop(e) {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  render() {
    const {
      ctWidth
    } = this.state
    const {
      item,
      onUlClick,
      onChange,
      checked,
      itemWidth,
      offsetDistance,
      fieldsArr,
      children
    } = this.props

    return(
      <ul className={ ['u-row', checked? 'active': ''].join(' ')}
        onClick={ onUlClick }
        >
        <li className="u-col-2 item" onClick={ this.stop.bind(this) }>
          <Checkbox
            onChange={ onChange }
            checked={ checked }/>
        </li>
        <li className="u-col-13 item isCt">
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
                { item.email }
              </div>
            </li>
            <li className="item"
              style={{width: itemWidth + 'px'}}
              >
              <div className="item_val">
                { item.mobile }
              </div>
            </li>
            {
              fieldsArr.map( (ite, i) => {
                if ( ite.name != 'email' && ite.name != 'mobile' ) {
                  return (
                    <li className="item"
                      key={ '_contactList_list_'+ i}
                      style={{width: itemWidth + 'px'}}
                      >
                      <div className="item_val">
                        { item[ite.name] }
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
          { item._create_operator_name || '——' }
        </li>
        <li className="u-col-2 item">
          { item._created || '——' }
        </li>
        <li className="u-col-2 item">
          { item._update_operator_name || '——' }
        </li>
        <li className="u-col-2 item">
          { item._updated || '——' }
        </li>
        <li className="u-col-1 item" onClick={ this.stop.bind(this) }>
          { children }
        </li>
      </ul>
    )
  }
}

export default ContactList

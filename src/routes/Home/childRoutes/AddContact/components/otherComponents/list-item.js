import React, { Component } from 'react'

import {
  Icon,
  Input
} from 'UI'

class AddContactList_Item extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      showInput: false
    }
  }
  // 显示
  show(){
    this.setState({
      showInput: true
    }, () => {
      this.refs.item_ipt.refs.u_ipt.focus()
    })
  }
  // input change 设置value值
  setAttr(e) {
    const {
      name,
      modifyData
    } = this.props

    modifyData(name, e.target.value)

    this.setState({
      value: e.target.value
    })
  }
  render() {
    let {
      itemWidth,
      placeholder,
      modifyData,
      // name
    } = this.props

    const {
      showInput,
      value
    } = this.state

    return(
      <li className="item"
        style={{width: itemWidth + 'px'}}
        onClick={ this.show.bind(this) }
        >
        {
          showInput
          ?
          <Input
            ref="item_ipt"
            placeholder={ placeholder }
            onBlur={ ()=> this.setState({ showInput: false}) }
            onKeyUp={ this.setAttr.bind(this) }
            />
          :<div className="item_val">
            { value }
          </div>
        }
      </li>
    )
  }
}

export default AddContactList_Item

import React, { Component } from 'react'

import {
  Button,
  Icon,
  Input
} from 'UI'

class DetailFields_List extends Component {
  render() {
    const {
      text,
      value = '',
      canEdit
    } = this.props
    return (
      <li className="u-col-4">
        <div className="name">
          { text }
        </div>
        <div className="value">
          {
            canEdit?
            <Input
              defaultValue={ value }
              onChange={ this.props.onChange }
              />
            :value
          }
        </div>
      </li>
    )
  }
}
export default DetailFields_List

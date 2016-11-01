import React, { Component } from 'react'
import { Select, SelectItem } from 'UI'

let type = [
  {type: 'days', lang: '日'},
  {type: 'weeks', lang: '周'},
  {type: 'months', lang: '月'},
  {type: 'year', lang: '年'},
]

class DateTypeSel extends Component {

  render() {
    let { selectDateType, defaultValue }  = this.props
    return (
      <Select replace text={ defaultValue? defaultValue : '[选择]' }>
        { type.map(( item, index ) =>
           <SelectItem
            key={ '_dateTypeSel'+ index }
            text={ item.type }
            onClick={ selectDateType.bind(this, item.type) }
            />)
         }
      </Select>
    )
  }
}

export default DateTypeSel

import React, { Component } from 'react'
import { Select, SelectItem } from 'UI'

let type = [
  {type: 'before', lang: '之前'},
  {type: 'after', lang: '之后'}
]

class ABSel extends Component {

  render() {
    let { selectAB, defaultValue }  = this.props
    return (
      <Select replace text={ defaultValue? defaultValue : '[选择]' }>
        { type.map(( item, index ) =>
           <SelectItem
            key={ '_dateABSel'+ index }
            text={ item.type }
            onClick={ selectAB.bind(this, item.type) }
            />)
         }
      </Select>
    )
  }
}

export default ABSel

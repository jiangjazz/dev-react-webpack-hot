import React, { Component } from 'react'
import { Select, SelectItem } from 'UI'

let nowYear = new Date().getFullYear()

class YeasrSel extends Component {

  render() {
    let { selectYear, defaultValue }  = this.props
    let yearArr = []
    for(let i = nowYear - 30; i < nowYear + 30; i++) {
      yearArr.push(i)
    }

    return (
      <Select replace text={ defaultValue? defaultValue : nowYear }>
        { yearArr.map(( item, index ) =>
           <SelectItem
            key={ '_yearSelect'+ index }
            text={ item }
            onClick={ selectYear.bind(this, item) }
            />)
         }
      </Select>
    )
  }
}

export default YeasrSel

import React, { Component } from 'react'
import { Select, SelectItem } from 'UI'

let nowMonth = new Date().getMonth() + 1

class MonthSel extends Component {

  render() {
    let { selectMonth, defaultValue }  = this.props
    let MonthArr = []
    for(let i = 1; i < 13; i++) {
      MonthArr.push(i)
    }

    return (
      <Select replace text={ defaultValue? defaultValue : nowMonth }>
        { MonthArr.map(( item, index ) =>
           <SelectItem
            key={ '_MonthSelect'+ index }
            text={ item }
            onClick={ selectMonth.bind(this, item) }
            />)
         }
      </Select>
    )
  }
}

export default MonthSel

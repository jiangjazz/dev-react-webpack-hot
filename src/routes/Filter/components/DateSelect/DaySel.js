import React, { Component } from 'react'
import { Select, SelectItem } from 'UI'

let d = new Date()
let nowDay = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()

class DaySel extends Component {

  render() {
    let { selectDay, defaultValue }  = this.props
    let DayArr = []
    for(let i = 1; i < nowDay+1; i++) {
      DayArr.push(i)
    }

    return (
      <Select replace text={ defaultValue? defaultValue : d.getDate() }>
        { DayArr.map(( item, index ) =>
           <SelectItem
            key={ '_daySelect'+ index }
            text={ item }
            onClick={ selectDay.bind(this, item) }
            />)
         }
      </Select>
    )
  }
}

export default DaySel

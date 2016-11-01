import React, { Component } from 'react'
import {
  Button,
  Icon,
  Tooltips,
  ButtonGroup
 } from 'UI'

class Navplug extends Component {
  render() {
    const {
      children,
      filterDelete,
      chooseFilterTotal = 0,
      filterTotal = 0
    } = this.props

    return (
      <div className="m-Navplug__wrap">
        <span className="m-Navplug__pageDec">总共{ filterTotal }组 {
          chooseFilterTotal !== 0?
          <span>,已选中<em className="m-Navplug__pageDec--tip">{ chooseFilterTotal }</em>项</span>
          : null
        } </span>
        {chooseFilterTotal !== 0?(
          <ButtonGroup className="u-btnGroup--PD">
            <Tooltips
            content="删除"
            placement="top"
            alignCenter={true}>
              <Button onClick={ filterDelete }>
                <Icon type="trash-o" />
              </Button>
            </Tooltips>
          </ButtonGroup>
        ) : null}
      </div>
    )
  }
}

export default Navplug

import React, { Component} from 'react'
import {Button} from 'UI'
export default class Home extends Component {
  render () {
    return (
      <div>
        首页
        {this.props.children}
        <Button>按钮</Button>
        <Button>
          <span>按钮2</span>
        </Button>
      </div>
    )
  }
}

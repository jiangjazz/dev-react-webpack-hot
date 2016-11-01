import React, { Component, PropTypes } from 'react'

/**
* creater: Janzen
* tip: 进度条
* dec:
* 参数:
*/

const PROCESSBAR_percent = [
  0,
  90,
  100
]

class ProcessBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      percent = 0,
      text = '进度条'
    } = this.props
    return (
      <div className={ [ 'u-progressBar-group', 'percent' + percent ].join(' ')}>
        <div className="u-progressBar f-tac" >
          { text }
        </div>
        { this.props.children }
      </div>
    )
  }
}

ProcessBar.propTypes = {
  percent: PropTypes.oneOf(PROCESSBAR_percent)
}

export default ProcessBar

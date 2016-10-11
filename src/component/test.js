import React, { Component, PropTypes } from 'react'

export default class Test extends Component {
  render () {
    return (
      <div>
        <button onClick={this.props.click.bind(this, this.props.text)}>
          {this.props.text}
        </button>
      </div>
    )
  }
}

Test.propTypes = {
  text: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
}

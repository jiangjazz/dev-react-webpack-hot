import React, { Component } from 'react'

class ScrollDown extends Component {

  componentDidMount() {
    $(document).on('mousewheel DOMMouseScroll', this._onScroll)
  }

  componentWillUnmount() {
    $(document).off('mousewheel DOMMouseScroll')
  }

  render() {
    const { children }  = this.props
    return (
      <div className="scrollList" >{ children }</div>
    )
  }

  static timer = null

  _onScroll = (e) => {
    clearTimeout(this.timer)
    let deviation = $('.m-listTable__wrap').height() + $('.m-dataList__wrap').scrollTop() -42
    let contentHeight = $('.m-listTable__content').height()

    this.timer = setTimeout(() => {
      if (contentHeight - deviation < 80) {
        this.props.onChange && this.props.onChange()
      }
    }, 200)
  }
}

export default ScrollDown

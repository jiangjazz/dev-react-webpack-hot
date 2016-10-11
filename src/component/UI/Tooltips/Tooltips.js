
import React, { Component, PropTypes } from 'react'
import Popper from './lib/Popper'

/**
* creater: lay
* tip: 依赖popper.js 压缩后为3k
* 参数:
*   {Boolean}  alignCenter :提示文字是否要居中
*   {String}   content     :提示的文字
*   {String}   placement   :提示框位置 (left | top | right | bottom) + options(start | end)
*   {Element}  children    :子组件 (最好以添加button)
*/

class Tooltips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopper: false
    };
    this.update = this.update.bind(this);
  }

  update() {
    if (this.state.popper) {
      this.state.popper.update();
      this.setState({raf: window.requestAnimationFrame(this.update)});
    }
  }

  componentDidMount() {
    let popper = new Popper(this.refs.tip, this.refs.popper, {
      placement: this.props.placement? this.props.placement : 'bottom',
      boundariesPadding: 10,
      gpuAcceleration: false
    })
    this.setState({popper}, this.update);
  }

  componentWillUnmount() {
    this.state.popper.destroy();
    if (this.state.raf) {
      window.cancelAnimationFrame(this.state.raf);
    }
  }

  render() {
    let {children, content, placement, alignCenter} = this.props
    return (
      <div
        className={'u-tip__wrap ' + (this.state.showPopper? 'active': '' )}
        onMouseEnter={ this._handlerMouseEnter.bind(this) }
        onMouseLeave={ this._handlerMouseLeave.bind(this) }>
        <div className="u-tip__content" ref="tip">
          { children }
        </div>
        <div
          className={'u-tip__popper ' + (alignCenter? 'u-tip--Textcenter': 'u-tip--Textleft')}
          ref="popper">
          <div>{ content }</div>
        </div>
      </div>
    )
  }

  _handlerMouseEnter() {
    this.setState({showPopper: true})
  }

  _handlerMouseLeave() {
    this.setState({showPopper: false})
  }
}

Tooltips.propTypes = {
  content: PropTypes.string,
  placement: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ])
}

export default Tooltips

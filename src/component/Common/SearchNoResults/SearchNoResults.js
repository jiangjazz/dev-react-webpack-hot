import React, { Component, PropTypes } from 'react'
const pageIcon = require('./assets/searchNoResults.png')

const TypeRule = [
  '联系人', '联系人组', '字段', '过滤器'
]

class SearchNoResults extends Component {

  render() {
    let { type, readAllClick, addClick} = this.props
    return (
      <div className="m-noResult">
        <img src={ pageIcon } />
        <p className="m-noResult__info">
          无匹配结果，
          <em className="tip" onClick={ readAllClick }>查看全部</em>
          <span style={{padding: '0 5px'}}>或</span>
          <em className="tip" onClick={ addClick }>添加{ type }</em>
        </p>
      </div>
    )
  }
}

SearchNoResults.propTypes = {
  type: PropTypes.oneOf(TypeRule),
  readAllClick: PropTypes.func,
  addClick: PropTypes.func
}


export default SearchNoResults

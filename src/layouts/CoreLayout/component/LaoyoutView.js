import React, { component, PropTypes } from 'react'
import Header from '../../../component/Header'

export const LayoutView = (props) => {
  // 获取组件
  let { children } = props
  // 获取数据
  // let { activeTab } = props.CoreLayout
  let { pathname } = props.location
  // 获取方法
  // let { setActiveTab } = props
  return (
    <div className="m-app">
      <Header pathname={ pathname } />
      <div className="m-content">
        {children}
      </div>
    </div>
  )
}

LayoutView.propTypes = {
  // activeTab: PropTypes.string.isRequired,
  // setActiveTab: PropTypes.func.isRequired,
}

export default LayoutView

import { connect } from 'react-redux'
import { setActiveTab } from '../module/layout'

import LayoutView from '../component/LaoyoutView'

const mapStateToProps = (state) => ({
  CoreLayout: state.CoreLayout
  // counter: state.list
})

const mapDispatchToProps = {
  setActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutView)

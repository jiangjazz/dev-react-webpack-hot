import { connect } from 'react-redux'
import { increment, fetchList } from '../module/list'

import ListView from '../components/ListView'

const mapDispatchToProps = {
  increment: () => increment(1),
  fetchList
}

const mapStateToProps = (state) => ({
  counter: state.list
})

export default connect(mapStateToProps, mapDispatchToProps)(ListView)

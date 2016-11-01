import { connect } from 'react-redux'
import {
  getFields,
  addToGroup,
  addToSingle
} from '../module/FieldsMatching'

import {
  Remove_LocalCSV,
  Get_LocalCSV
} from 'Public'

import FieldsMatchingView from '../components/FieldsMatching'

const mapStateToProps = (state) => ({
  FieldsMatching: state.FieldsMatching,
  public: state.public
})

const mapDispatchtoProps = {
  getFields,
  addToGroup,
  addToSingle,

  Remove_LocalCSV,
  Get_LocalCSV
}

export default connect(mapStateToProps, mapDispatchtoProps)(FieldsMatchingView)

import { connect } from 'react-redux'
import { listData, getFilter, deleteFilter, getFieldsType, getAllField, addFilter, updateFilter} from '../module/filter'

import Filter from '../components/Filter'

const mapDispatchtoProps = {
  listData,
  getFilter,
  deleteFilter,
  getFieldsType,
  getAllField,
  addFilter,
  updateFilter
}

const mapStateToProps = (state) => ({
  filterList: state.filter,
  fieldType: state.filter.fieldType,
  fieldAll: state.filter.fieldAll
})

export default connect(mapStateToProps, mapDispatchtoProps)(Filter)

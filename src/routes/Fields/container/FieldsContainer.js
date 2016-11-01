import { connect } from 'react-redux'
import { listData, getFields, addField, delField, updateField} from '../module/fields'

import Fields from '../components/Fields'

const mapDispatchtoProps = {
  listData,
  getFields,
  addField,
  delField,
  updateField
}

const mapStateToProps = (state) => ({
  fieldsList: state.fields,
})


export default connect(mapStateToProps, mapDispatchtoProps)(Fields)

import { connect } from 'react-redux'
import {
  delList,
  getList,
  getFields,
  exportContactPrev,
  getCopyToList,
  copyToContact,
  addContact
} from '../module/home'

import {
  Set_LocalCSV,
  Set_Local_ADDCONTACTS
} from 'Public'

import HomeView from '../components/index'

const mapStateToProps = (state) => ({
  HomeList: state.HomeList
})

const mapDispatchtoProps = {
  getList,
  delList,
  getFields,
  exportContactPrev,
  getCopyToList,
  copyToContact,
  addContact,

  Set_LocalCSV,
  Set_Local_ADDCONTACTS
}
// console.log(getList())

export default connect(mapStateToProps, mapDispatchtoProps)(HomeView)

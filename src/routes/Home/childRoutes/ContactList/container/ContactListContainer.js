import { connect } from 'react-redux'
import {
  getList,
  delList,
  getMoveToList,
  copyToContact,
  exportContact,
  getFields
} from '../module/contactList'

import {
  Set_LocalCSV,
  Set_Local_ADDCONTACTS
} from 'Public'

import ContactView from '../components/ContactList'

const mapStateToProps = (state) => ({
  ContactList: state.ContactList,
  public: state.public
})

const mapDispatchtoProps = {
  getList,
  delList,
  getMoveToList,
  copyToContact,
  exportContact,
  getFields,

  Set_LocalCSV,
  Set_Local_ADDCONTACTS
}

export default connect(mapStateToProps, mapDispatchtoProps)(ContactView)

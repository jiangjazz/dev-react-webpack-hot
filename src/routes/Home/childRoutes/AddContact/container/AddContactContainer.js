import { connect } from 'react-redux'
import {
  getFields,
  addToGroup,
  addToSingle
} from '../module/AddContact'

import {
  Remove_Local_ADDCONTACTS,
  Get_Local_ADDCONTACTS
} from 'Public'

import AddContactView from '../components/AddContact'

const mapStateToProps = (state) => ({
  AddContact: state.AddContact,
  public: state.public
})

const mapDispatchtoProps = {
  getFields,
  addToGroup,
  addToSingle,


  Remove_Local_ADDCONTACTS,
  Get_Local_ADDCONTACTS
}

export default connect(mapStateToProps, mapDispatchtoProps)(AddContactView)

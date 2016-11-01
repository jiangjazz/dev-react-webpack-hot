import { connect } from 'react-redux'
import {
  getContactDetails,
  putContactDetails,
  delList,
  getMoveToList,
  copyToContact,
  getFields,
  exportContact
} from '../module/ContactDetails'


import ContactDetailsView from '../components/ContactDetails'

const mapStateToProps = (state) => ({
  ContactDetails: state.ContactDetails,
  public: state.public
})

const mapDispatchtoProps = {
  getContactDetails,
  putContactDetails,
  delList,
  getMoveToList,
  copyToContact,
  getFields,
  exportContact
}

export default connect(mapStateToProps, mapDispatchtoProps)(ContactDetailsView)

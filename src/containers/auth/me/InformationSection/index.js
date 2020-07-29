import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import AuthMeInformationShow from './show'
import AuthMeInformationEdit from './edit'

const AuthMeInformation = ({ auth }) => {
  return auth.mode === 'UPDATE' ? <AuthMeInformationEdit/> : <AuthMeInformationShow/>
}

export default compose(
  connect(
    ({ auth }) => ({
      auth
    }), {
      // nothing
    }
  )
)(AuthMeInformation)

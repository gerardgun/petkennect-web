import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import PersonalInformationShow from './show'
import PersonalInformationEdit from './edit'

import personalInformationDetailDuck from '@reducers/staff-management/information/personal-detail/detail'

const PersonalInformation = ({ personalInformationDetail, ...props }) => {
  useEffect(() => {
    if(personalInformationDetail.status === 'PUT') props.setItem(personalInformationDetail.item)
  }, [ personalInformationDetail.status ])

  return personalInformationDetail.mode === 'UPDATE' ? <PersonalInformationEdit/>
    : <PersonalInformationShow personalInformationDetail={personalInformationDetail}/>
}

export default compose(
  connect(
    state => ({
      personalInformationDetail: personalInformationDetailDuck.selectors.detail(state)
    }), {
      setItem: personalInformationDetailDuck.creators.setItem
    }
  )
)(PersonalInformation)

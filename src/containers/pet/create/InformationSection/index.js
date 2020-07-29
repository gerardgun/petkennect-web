import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import PetInformationShow from './show'
import PetInformationEdit from './edit'

import petDetailDuck from '@reducers/pet/detail'

const PetInformation = ({ petDetail }) => {
  return petDetail.mode === 'UPDATE' ? <PetInformationEdit/> : <PetInformationShow petDetail={petDetail}/>
}

export default compose(
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      // nothing
    }
  )
)(PetInformation)

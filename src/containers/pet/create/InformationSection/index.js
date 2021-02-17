import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import loadable from '@loadable/component'

import petDetailDuck from '@reducers/pet/detail'

const PetInformationShow = loadable(() => import('./show'))
const PetInformationEdit = loadable(() => import('./edit'))

const PetInformation = ({ petDetail, ...props }) => {
  useEffect(() => {
    if(petDetail.status === 'PUT') props.setItem(petDetail.item)
  }, [ petDetail.status ])

  return petDetail.mode === 'UPDATE' ? <PetInformationEdit/> : <PetInformationShow petDetail={petDetail}/>
}

export default compose(
  connect(
    state => ({
      petDetail: petDetailDuck.selectors.detail(state)
    }), {
      setItem: petDetailDuck.creators.setItem
    }
  )
)(PetInformation)

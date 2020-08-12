import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import ClientInformationShow from './show'
import ClientInformationEdit from './edit'

import clientDetailDuck from '@reducers/client/detail'

const ClientInformation = ({ clientDetail, ...props }) => {
  useEffect(() => {
    if(clientDetail.status === 'PUT') props.setItem(clientDetail.item)
  }, [ clientDetail.status ])

  return clientDetail.mode === 'UPDATE' ? <ClientInformationEdit/> : <ClientInformationShow clientDetail={clientDetail}/>
}

export default compose(
  connect(
    state => ({
      clientDetail: clientDetailDuck.selectors.detail(state)
    }), {
      setItem: clientDetailDuck.creators.setItem
    }
  )
)(ClientInformation)

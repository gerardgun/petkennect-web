import React from 'react'

import Table from '@components/Table'
import requestClientDocumentListConfig from '@lib/constants/list-configs/online-request/client-submission/client-document'

import clientDocumentDuck from '@reducers/online-request/client-submission/client-document'

const ClientDocumentList = () => {
  const _handleRowButtonClick = (option, item) => {
    if(option === 'view')
      window.open(item.filepath)
  }

  return (
    <Table
      config={requestClientDocumentListConfig}
      duck={clientDocumentDuck}
      onRowButtonClick={_handleRowButtonClick}/>
  )
}

export default ClientDocumentList

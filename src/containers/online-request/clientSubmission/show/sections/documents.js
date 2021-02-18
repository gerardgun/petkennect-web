import React from 'react'

import Table from '@components/Table'

import clientDocumentDuck from '@reducers/online-request/client-submission/client-document'

const ClientDocumentList = () => {
  const _handleRowOptionClick = (option, item) => {
    if(option === 'view')
      window.open(item.filepath)
  }

  return (
    <Table
      duck={clientDocumentDuck}
      onRowOptionClick={_handleRowOptionClick}/>
  )
}

export default ClientDocumentList

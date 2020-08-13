import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Container, Grid, Header } from 'semantic-ui-react'

import Table from '@components/Table'
import ClientDocumentFormSendModal from '@containers/client/show/DocumentSection/form/send/modal'
import SignAgreementForm from './SignAgreementForm'
import ShowAgreement from './ShowAgreement'
import { downloadFileURL, printFileURL } from '@lib/utils/functions'

import clientAgreementDuck from '@reducers/client/agreement'
import clientAgreementDetailDuck from '@reducers/client/agreement/detail'
import clientDocumentDetailDuck from '@reducers/client/document/detail'

import './styles.scss'

function AgreementsSection({ clientAgreementDetail, ...props }) {
  useEffect(() => {
    if(clientAgreementDetail.status  === 'POSTED') props.getClientAgreements()
  }, [ clientAgreementDetail.status ])

  const _handleRowOptionClick = (option, item) => {
    if(option === 'view_pdf')
      props.setItem(item, 'READ')
    else if(option === 'print')
      printFileURL(item.document_filepath)
    else if(option === 'download')
      downloadFileURL(item.document_filepath, `${item.name}.pdf`)
    else if(option === 'send_document')
      props.setClientDocument({ id: item.document, filename: item.document_filename }, 'SEND')
    else if(option === 'sign')
      props.setItem(item, 'CREATE')
  }

  return (
    <Container fluid>
      <Grid className='petkennect-profile-body-header'>
        <Grid.Column verticalAlign='middle'>
          <Header as='h2'>Agreements</Header>
        </Grid.Column>
      </Grid>
      <div className='mt40 mh8'>
        <Table
          duck={clientAgreementDuck}
          onRowOptionClick={_handleRowOptionClick}/>

        <ClientDocumentFormSendModal/>
        <ShowAgreement/>
        <SignAgreementForm/>
      </div>
    </Container>
  )
}

export default compose(
  connect(
    state => ({
      clientAgreementDetail: clientAgreementDetailDuck.selectors.detail(state)
    }), {
      setItem            : clientAgreementDetailDuck.creators.setItem,
      setClientDocument  : clientDocumentDetailDuck.creators.setItem,
      getClientAgreements: clientAgreementDuck.creators.get
    })
)(AgreementsSection)


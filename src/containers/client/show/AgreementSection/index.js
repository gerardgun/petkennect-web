import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Container, Grid, Header, Icon } from 'semantic-ui-react'
import loadable from '@loadable/component'

import { downloadFileURL, printFileURL } from '@lib/utils/functions'

import clientAgreementDuck from '@reducers/client/agreement'
import clientAgreementSignedDuck from '@reducers/client/agreement/signed'
import clientAgreementUnsignedDuck from '@reducers/client/agreement/unsigned'
import clientAgreementDetailDuck from '@reducers/client/agreement/detail'
import clientDocumentDetailDuck from '@reducers/client/document/detail'
import clientAgreementListConfig from '@lib/constants/list-configs/client/agreement'

import './styles.scss'

const Table = loadable(() => import('@components/Table'))
const ClientDocumentFormSendModal = loadable(() => import('@containers/client/show/DocumentSection/form/send/modal'))
const SignAgreementForm = loadable(() => import('./SignAgreementForm'))
const ShowAgreement = loadable(() => import('./ShowAgreement'))

function AgreementsSection({ clientAgreementDetail, ...props }) {
  useEffect(() => {
    if(clientAgreementDetail.status  === 'POSTED') props.getClientAgreements()
  }, [ clientAgreementDetail.status ])

  const _handleRowButtonClick = (option, item) => {
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

        <p>
          <Icon name='flag outline'/>
          <span>Pending</span>
        </p>

        <Table
          config={clientAgreementListConfig}
          duck={clientAgreementUnsignedDuck}
          onRowButtonClick={_handleRowButtonClick}/>

        <p>
          <Icon name='flag outline'/>
          <span>Signed</span>
        </p>

        <Table
          config={clientAgreementListConfig}
          duck={clientAgreementSignedDuck}
          onRowButtonClick={_handleRowButtonClick}/>

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


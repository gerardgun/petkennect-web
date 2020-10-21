import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from '@hooks/Shared'

import agreementDuck from '@reducers/agreement'
import agreementDetailDuck from '@reducers/agreement/detail'

const AgreementList = ({ agreement, agreementDetail ,...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getAgreements, agreementDetail.status)

  useEffect(() => {
    props.getAgreements()
  }, [])

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(agreement.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Agreements</Header>
          </Grid.Column >
          <Grid.Column
            computer={8} mobile={12} tablet={8}
            textAlign='right'>
            <Button
              as={Link} color='teal' content='New Agreement'
              to='/setup/agreement/create'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={agreementDuck}
          onOptionClick={_handleOptionClick}/>
      </Segment>

      <ModalDelete
        duckDetail={agreementDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ agreement ,...state }) => ({
      agreement,
      agreementDetail: agreementDetailDuck.selectors.detail(state)

    }), {
      getAgreements: agreementDuck.creators.get,
      setItem      : agreementDetailDuck.creators.setItem
    })
)(AgreementList)

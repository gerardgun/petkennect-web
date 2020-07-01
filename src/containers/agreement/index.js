import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import agreementDuck from '@reducers/agreement'
import agreementDetailDuck from '@reducers/agreement/detail'
import { useChangeStatusEffect } from '@hooks/Shared'

const AgreementList = ({ agreementDetail ,...props }) => {
  const { status } = agreementDetail
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getAgreements()
  }, [])

  useChangeStatusEffect(props.getAgreements,status)

  const _handleRowClick = (e, item) => {
    props.history.push(`/setup/agreement/${item.id}`)
  }

  const _handleRowOptionClick = (option, item) => {
    if(option === 'edit') {
      props.history.push(`/setup/agreement/${item.id}`)
    }
    else if(option === 'delete') {
      props.setItem(item)
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column width={4}>
            <Header as='h2'>Agreements</Header>
          </Grid.Column >
          <Grid.Column textAlign='right' width={12}>
            <Button
              as={Link} className='cls-saveButton' color='teal'
              content='New Agreement'
              to='/setup/agreement/create'/>
          </Grid.Column>
        </Grid>
        <Table
          duck={agreementDuck}
          onRowClick={_handleRowClick}
          onRowOptionClick={_handleRowOptionClick}/>
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
    ({ agreements ,...state }) => ({
      agreements,
      agreementDetail: agreementDetailDuck.selectors.detail(state)

    }), {
      getAgreements: agreementDuck.creators.get,
      setItem      : agreementDetailDuck.creators.setItem
    })
)(AgreementList)

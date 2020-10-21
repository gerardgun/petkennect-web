import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import PetRetireReasonForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'

import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petRetireReasonDetailDuck from '@reducers/pet/retire-reason/detail'

const PetRetireReasonList = ({ petRetireReason, petRetireReasonDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getPetRetireReason, petRetireReasonDetail.status)

  useEffect(() => {
    props.getPetRetireReason()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(petRetireReason.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2'>Retire Reasons</Header>
          </Grid.Column>
          <Grid.Column
            computer={8} mobile={13} tablet={8}
            textAlign='right'>
            <Button
              color='teal' content='New Retire Reason'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={petRetireReasonDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
      </Segment>
      <PetRetireReasonForm/>
      <ModalDelete
        duckDetail={petRetireReasonDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    state => ({
      petRetireReason      : petRetireReasonDuck.selectors.list(state),
      petRetireReasonDetail: petRetireReasonDetailDuck.selectors.detail(state)
    }), {
      getPetRetireReason: petRetireReasonDuck.creators.get,
      setItem           : petRetireReasonDetailDuck.creators.setItem
    })
)(PetRetireReasonList)


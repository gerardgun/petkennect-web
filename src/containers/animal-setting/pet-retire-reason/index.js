import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

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
    <>
      <Grid columns={2}>
        <Grid.Column
          computer={10} mobile={12} tablet={8}>
          <Table
            duck={petRetireReasonDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>New Reason</Button>
        </Grid.Column>
      </Grid>

      <PetRetireReasonForm/>
      <ModalDelete
        duckDetail={petRetireReasonDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
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


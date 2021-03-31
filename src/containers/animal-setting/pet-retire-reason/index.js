import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import PetRetireReasonForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petRetireReasonListConfig from '@lib/constants/list-configs/pet/animal-setting/retire-reason'

import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petRetireReasonDetailDuck from '@reducers/pet/retire-reason/detail'

const PetRetireReasonList = ({ petRetireReason, petRetireReasonDetail, ...props }) => {
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
    if(option === 'delete')
      props.setItem(petRetireReason.selector.selected_items[0], 'DELETE')
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column
          computer={10} mobile={12} tablet={8}>
          <Table
            config={petRetireReasonListConfig}
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
      <ModalDelete duckDetail={petRetireReasonDetailDuck}/>

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


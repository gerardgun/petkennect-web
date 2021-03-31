import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import TrainingReasonCreate from './create'

import trainingReasonDuck from '@reducers/training-reason'
import trainingReasonDetailDuck from '@reducers/training-reason/detail'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from 'src/hooks/Shared'

const TrainingReason = ({ trainingReason, trainingReasonDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getTrainingReason, trainingReasonDetail.status)

  useEffect(() => {
    props.getTrainingReason()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(trainingReason.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>

      <Grid  columns={2}>
        <Grid.Column computer={10} mobile={14} tablet={8}>
          <Table
            duck={trainingReasonDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={5} mobile={13} tablet={8}>
          <Button
            basic
            color='teal'
            content='Add Reason'
            icon='Add'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <TrainingReasonCreate/>
      <ModalDelete
        duckDetail={trainingReasonDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  connect(
    (state) => ({
      trainingReason      : trainingReasonDuck.selectors.list(state),
      trainingReasonDetail: trainingReasonDetailDuck.selectors.detail(state)

    }),
    {
      getTrainingReason: trainingReasonDuck.creators.get,
      setItem          : trainingReasonDetailDuck.creators.setItem
    }
  )
)(TrainingReason)

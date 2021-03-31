import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'

import Table from '@components/Table'
import TrainingMethodCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import trainingMethodDuck from '@reducers/training-method'
import trainingMethodDetailDuck from '@reducers/training-method/detail'
import useModal from '@components/Modal/useModal'

const TrainingMethod = ({ trainingMethod, trainingMethodDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getTrainingMethod, trainingMethodDetail.status)

  useEffect(() => {
    props.getTrainingMethod()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(trainingMethod.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid  columns={2}>
        <Grid.Column computer={10} mobile={14} tablet={8}>
          <Table
            duck={trainingMethodDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column

          computer={5} mobile={13} tablet={8}>
          <Button
            basic
            color='teal'
            content='Add Method'
            icon='Add'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>
      <TrainingMethodCreate/>
      <ModalDelete
        duckDetail={trainingMethodDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  connect(
    (state) => ({
      trainingMethod      : trainingMethodDuck.selectors.list(state),
      trainingMethodDetail: trainingMethodDetailDuck.selectors.detail(state)

    }),
    {
      getTrainingMethod: trainingMethodDuck.creators.get,
      setItem          : trainingMethodDetailDuck.creators.setItem
    }
  )
)(TrainingMethod)

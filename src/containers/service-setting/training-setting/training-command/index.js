import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import TrainingCommandCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import trainingCommandListConfig from '@lib/constants/list-configs/training-command'

import trainingCommandDuck from '@reducers/training-command'
import trainingCommandDetailDuck from '@reducers/training-command/detail'
import useModal from '@components/Modal/useModal'

const TrainingCommand = ({ trainingCommand, trainingCommandDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getTrainingCommand, trainingCommandDetail.status)

  useEffect(() => {
    props.getTrainingCommand()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(trainingCommand.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid  columns={2}>
        <Grid.Column computer={10} mobile={16} tablet={8}>
          <Table
            config={trainingCommandListConfig}
            duck={trainingCommandDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={5} mobile={14} tablet={8}>
          <Button
            basic
            color='teal'
            content='Add Command'
            icon='Add'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>

      <TrainingCommandCreate/>
      <ModalDelete
        duckDetail={trainingCommandDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </>
  )
}

export default compose(
  connect(
    (state) => ({
      trainingCommand      : trainingCommandDuck.selectors.list(state),
      trainingCommandDetail: trainingCommandDetailDuck.selectors.detail(state)

    }),
    {
      getTrainingCommand: trainingCommandDuck.creators.get,
      setItem           : trainingCommandDetailDuck.creators.setItem
    }
  )
)(TrainingCommand)

import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import TrainingCommandCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'

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
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2' className='cls-MainHeader'>Training Command</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              className='cls-saveButton' color='teal'
              content='New Training Command'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={trainingCommandDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
        <TrainingCommandCreate/>
        <ModalDelete
          duckDetail={trainingCommandDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Segment>

    </Layout>
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
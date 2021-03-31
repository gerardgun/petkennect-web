import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import TrainingReasonCreate from './create'
import trainingReasonListConfig from '@lib/constants/list-configs/training-reason'

import trainingReasonDuck from '@reducers/training-reason'
import trainingReasonDetailDuck from '@reducers/training-reason/detail'
import { useChangeStatusEffect } from 'src/hooks/Shared'

const TrainingReason = ({ trainingReason, trainingReasonDetail, ...props }) => {
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
    if(option === 'delete')
      props.setItem(trainingReason.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Training Reason</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={13} tablet={8}>
            <Button
              color='teal'
              content='New Training Reason'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={trainingReasonListConfig}
          duck={trainingReasonDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
        <TrainingReasonCreate/>
        <ModalDelete duckDetail={trainingReasonDetailDuck}/>
      </Segment>

    </Layout>
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

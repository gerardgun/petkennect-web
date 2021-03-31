import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import TrainingMethodCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import trainingMethodListConfig from '@lib/constants/list-configs/training-method'

import trainingMethodDuck from '@reducers/training-method'
import trainingMethodDetailDuck from '@reducers/training-method/detail'

const TrainingMethod = ({ trainingMethod, trainingMethodDetail, ...props }) => {
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
    if(option === 'delete')
      props.setItem(trainingMethod.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={14} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Training Method  </Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={13} tablet={8}>
            <Button
              color='teal'
              content='New Training Method'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          config={trainingMethodListConfig}
          duck={trainingMethodDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
        <TrainingMethodCreate/>
        <ModalDelete duckDetail={trainingMethodDetailDuck}/>
      </Segment>

    </Layout>
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

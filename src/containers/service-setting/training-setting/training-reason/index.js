import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import TrainingReasonCreate from './create'
import trainingReasonListConfig from '@lib/constants/list-configs/training-reason'

import trainingReasonDuck from '@reducers/training-reason'
import trainingReasonDetailDuck from '@reducers/training-reason/detail'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const TrainingReason = ({ trainingReasonDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getTrainingReason, trainingReasonDetail.status)

  useEffect(() => {
    props.getTrainingReason()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleButtonClick = (button,item) =>{
    switch (button) {
      case 'edit': props.setItem(item,'UPDATE')
        break
      case 'delete' : props.setItem(item,'DELETE')
    }
  }

  return (
    <>

      <Grid  columns={2}>
        <Grid.Column computer={10} mobile={14} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={trainingReasonListConfig}
              duck={trainingReasonDuck}
              onRowButtonClick={_handleButtonClick}/>
          </div>
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

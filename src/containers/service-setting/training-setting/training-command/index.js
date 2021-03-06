import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import TrainingCommandCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import trainingCommandListConfig from '@lib/constants/list-configs/training-command'

import trainingCommandDuck from '@reducers/training-command'
import trainingCommandDetailDuck from '@reducers/training-command/detail'
import useModal from '@components/Modal/useModal'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const TrainingCommand = ({  trainingCommandDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getTrainingCommand, trainingCommandDetail.status)

  useEffect(() => {
    props.getTrainingCommand()
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
      <Grid>
        <Grid.Column computer={10} mobile={16} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={trainingCommandListConfig}
              duck={trainingCommandDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
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

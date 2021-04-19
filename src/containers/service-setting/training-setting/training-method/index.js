import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import TrainingMethodCreate from './create'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import trainingMethodListConfig from '@lib/constants/list-configs/training-method'

import trainingMethodDuck from '@reducers/training-method'
import trainingMethodDetailDuck from '@reducers/training-method/detail'
import useModal from '@components/Modal/useModal'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const TrainingMethod = ({ trainingMethodDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getTrainingMethod, trainingMethodDetail.status)

  useEffect(() => {
    props.getTrainingMethod()
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
        <Grid.Column computer={10} mobile={14} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={trainingMethodListConfig}
              duck={trainingMethodDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
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

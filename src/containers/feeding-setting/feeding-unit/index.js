import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FeedingunitForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import feedingUnitListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-unit'

import feedingUnitDuck from '@reducers/pet/feeding-setting/feeding-unit'
import feedingUnitDetailDuck from '@reducers/pet/feeding-setting/feeding-unit/detail'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const FeedingUnit = ({ feedingUnitDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingUnits, feedingUnitDetail.status)

  useEffect(() => {
    props.getfeedingUnits()
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
        <Grid.Column computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={feedingUnitListConfig}
              duck={feedingUnitDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/></div>
        </Grid.Column>

      </Grid>

      <FeedingunitForm/>
      <ModalDelete
        duckDetail={feedingUnitDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingUnit      : feedingUnitDuck.selectors.list(state),
      feedingUnitDetail: feedingUnitDetailDuck.selectors.detail(state)
    }), {
      getfeedingUnits: feedingUnitDuck.creators.get,
      setItem        : feedingUnitDetailDuck.creators.setItem
    })
)(FeedingUnit)

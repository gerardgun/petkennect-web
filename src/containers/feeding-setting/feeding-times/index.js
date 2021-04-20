import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FeedingTimeForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import feedingTimeListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-time'

import feedingTimeDuck from '@reducers/pet/feeding-setting/feeding-time'
import feedingTimeDetailDuck from '@reducers/pet/feeding-setting/feeding-time/detail'
import '../styles.scss'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const FeedingTimes = ({ feedingTimeDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingTimes, feedingTimeDetail.status)

  useEffect(() => {
    props.getfeedingTimes()
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
              config={feedingTimeListConfig}
              duck={feedingTimeDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/></div>
        </Grid.Column>
      </Grid>

      <FeedingTimeForm/>
      <ModalDelete
        duckDetail={feedingTimeDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingTime      : feedingTimeDuck.selectors.list(state),
      feedingTimeDetail: feedingTimeDetailDuck.selectors.detail(state)
    }), {
      getfeedingTimes: feedingTimeDuck.creators.get,
      setItem        : feedingTimeDetailDuck.creators.setItem
    })
)(FeedingTimes)

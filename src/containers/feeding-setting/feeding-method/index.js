import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import FeedingMethodForm from  './form'
import { useChangeStatusEffect } from '@hooks/Shared'
import feedingMethodListConfig from '@lib/constants/list-configs/pet/feeding-setting/feeding-method'

import feedingMethodDuck from '@reducers/pet/feeding-setting/feeding-method'
import feedingMethodDetailDuck from '@reducers/pet/feeding-setting/feeding-method/detail'
import '../styles.scss'

const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const FeedingMethod = ({ feedingMethodDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getfeedingMethods, feedingMethodDetail.status)

  useEffect(() => {
    props.getfeedingMethods()
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
              config={feedingMethodListConfig}
              duck={feedingMethodDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/></div>
        </Grid.Column>
      </Grid>

      <FeedingMethodForm/>
      <ModalDelete
        duckDetail={feedingMethodDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      feedingMethod      : feedingMethodDuck.selectors.list(state),
      feedingMethodDetail: feedingMethodDetailDuck.selectors.detail(state)
    }), {
      getfeedingMethods: feedingMethodDuck.creators.get,
      setItem          : feedingMethodDetailDuck.creators.setItem
    })
)(FeedingMethod)

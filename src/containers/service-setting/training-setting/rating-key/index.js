import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid } from 'semantic-ui-react'
import loadable from '@loadable/component'
import Table from '@components/Table'
import { useChangeStatusEffect } from 'src/hooks/Shared'
import ratingKeyListConfig from '@lib/constants/list-configs/rating-key'

import ratingKeyDuck from '@reducers/rating-key'
import ratingKeyDetailDuck from '@reducers/rating-key/detail'
import useModal from '@components/Modal/useModal'
import RatingkeyForm from './create'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const RatingKey = ({ ratingKeyDetail, ...props }) => {
  const [ open, { _handleClose } ] = useModal()
  useChangeStatusEffect(props.getRatingKey, ratingKeyDetail.status)

  useEffect(() => {
    props.getRatingKey()
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

    <Grid>
      <Grid.Column
        className='pl0' computer={11} mobile={16}
        tablet={8}>
        <Table
          config={ratingKeyListConfig}
          duck={ratingKeyDuck}
          onRowButtonClick={_handleButtonClick}/>
        <RatingkeyForm/>
        <ModalDelete
          duckDetail={ratingKeyDetailDuck}
          onClose={_handleClose}
          open={open}/>
      </Grid.Column>
      <Grid.Column
        computer={5} mobile={14} tablet={8}>
        <Button
          basic
          color='teal'
          content='New Rating'
          icon='Add'
          onClick={_handleAddBtnClick}/>
      </Grid.Column>
    </Grid>
  )
}

export default compose(
  connect(
    (state) => ({
      ratingKey      : ratingKeyDuck.selectors.list(state),
      ratingKeyDetail: ratingKeyDetailDuck.selectors.detail(state)

    }),
    {
      getRatingKey: ratingKeyDuck.creators.get,
      setItem     : ratingKeyDetailDuck.creators.setItem
    }
  )
)(RatingKey)

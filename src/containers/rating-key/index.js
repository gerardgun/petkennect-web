import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'
import ModalDelete from '@components/Modal/Delete'
import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import ratingKeyDuck from '@reducers/rating-key'
import ratingKeyDetailDuck from '@reducers/rating-key/detail'
import RatingkeyForm from './create'

const RatingKey = ({ ratingKey, ratingKeyDetail, ...props }) => {
  useChangeStatusEffect(props.getRatingKey, ratingKeyDetail.status)

  useEffect(() => {
    props.getRatingKey()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      props.setItem(ratingKey.selector.selected_items[0], 'DELETE')
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={8} mobile={16} tablet={8}>
            <Header as='h2' className='cls-MainHeader'>Performance Rating Key</Header>
          </Grid.Column>
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={14} tablet={8}>
            <Button
              color='teal'
              content='New Performance Rating Key'
              onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={ratingKeyDuck}
          onOptionClick={_handleOptionClick}
          onRowClick={_handleRowClick}/>
        <RatingkeyForm/>
        <ModalDelete duckDetail={ratingKeyDetailDuck}/>
      </Segment>

    </Layout>
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

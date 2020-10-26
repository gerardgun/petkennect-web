import React from 'react'
import PropTypes from 'prop-types'
import { Button, Header, Segment, Grid } from 'semantic-ui-react'
import _get from 'lodash/get'
import _defaultTo from 'lodash/defaultTo'

import InputReadOnly from '@components/Common/InputReadOnly'

import './styles.scss'

function Item({ item, onUpdate, onDelete }) {
  const _handleUpdateBtnClick = () => {
    onUpdate(item)
  }
  const _handleDeleteBtnClick = () => {
    onDelete(item)
  }

  return (
    <Segment className='location-item'>
      <Grid className='flex justify-between align-center' columns={2}>
        <Grid.Column  computer={14} mobile={11} tablet={14}>
          <Header as='h3'>
            {item.name}
            <Header.Subheader style={{ display: 'inline-block', marginLeft: '0.5rem' }}>{item.code}</Header.Subheader>
          </Header>
          <InputReadOnly
            label='Time Zone'
            value={item.timezone || '-'}/>
          <br/>
          <InputReadOnly
            label='Address'
            value={_get(item, 'addresses[0]', '-')}/>
          <br/>
          <InputReadOnly
            label='Description'
            value={_defaultTo(item.description, '-')}/>
        </Grid.Column>
        <Grid.Column  computer={2} mobile={5} tablet={2}>
          <Button
            basic icon='edit outline'
            onClick={_handleUpdateBtnClick}/>
          <Button
            basic color='red' icon='trash alternate outline'
            onClick={_handleDeleteBtnClick}/>
        </Grid.Column>
      </Grid>
    </Segment>
  )
}

Item.propTypes = {
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

Item.defaultProps = { }

export default Item

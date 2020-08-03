import React from 'react'
import PropTypes from 'prop-types'
import { Button, Icon,Grid,Segment } from 'semantic-ui-react'
import InputReadOnly from '@components/Common/InputReadOnly'

function LocationsItem({ item , onUpdate, onDelete }) {
  const  _handleUpdateBtnClick = () => {
    onUpdate(item)
  }
  const  _handleDeleteBtnClick = () => {
    onDelete(item)
  }

  return (

    <Segment className='p8'>

      <div className='p24'>
        <div className='flex justify-between align-center'>
          <div className='thumbnail-wrapper'>
            <Grid columns={1}>
              <b>{item.name}</b>
            </Grid>
            <Grid columns={1}>
              <InputReadOnly
                label='Time Zone'
                value={item.timezone || '-'}/>
            </Grid>
            <Grid columns={1}>
              <InputReadOnly
                label='Address'
                value={item.addresses || '-'}/>
            </Grid>
          </div>
          <div>
            <Button
              basic
              color='red' icon onClick={_handleDeleteBtnClick}
              size='small'>
              <Icon name='trash alternate outline'/>
            </Button>
            <Button
              basic
              className='ml16' icon onClick={_handleUpdateBtnClick}
              size='small'>
              <Icon name='edit outline'/>
            </Button>
          </div>
        </div>

      </div>
    </Segment>

  )
}

LocationsItem.propTypes = {
  onUpdate    : PropTypes.func.isRequired,
  onDelete    : PropTypes.func.isRequired,
  enableUpdate: PropTypes.bool
}

LocationsItem.defaultProps = { }

export default LocationsItem

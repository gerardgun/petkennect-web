import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import VeterinarianListForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import veterinarianListConfig from '@lib/constants/list-configs/pet/veterinarian-list'

import veterinarianDuck from '@reducers/pet/veterinarian-list'
import veterinarianDetailDuck from '@reducers/pet/veterinarian-list/detail'

const VeterinarianList = ({ veterinarian, veterinarianDetail, ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()
  useChangeStatusEffect(props.getVeterinarians, veterinarianDetail.status)

  useEffect(() => {
    props.getVeterinarians()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = (e, item) => {
    props.setItem(item, 'UPDATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(veterinarian.selector.selected_items[0], 'DELETE')
      _handleOpen()
    }
  }

  return (
    <>
      <Grid columns={2}>
        <Grid.Column
          computer={11} mobile={12} tablet={8}>
          <Table
            config={veterinarianListConfig}
            duck={veterinarianDuck}
            onOptionClick={_handleOptionClick}
            onRowClick={_handleRowClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Veterinarian</Button>
        </Grid.Column>
      </Grid>

      <VeterinarianListForm/>
      <ModalDelete
        duckDetail={veterinarianDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      veterinarian      : veterinarianDuck.selectors.list(state),
      veterinarianDetail: veterinarianDetailDuck.selectors.detail(state)
    }), {
      getVeterinarians: veterinarianDuck.creators.get,
      setItem         : veterinarianDetailDuck.creators.setItem
    })
)(VeterinarianList)

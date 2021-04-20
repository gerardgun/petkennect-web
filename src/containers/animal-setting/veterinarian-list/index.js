import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import useModal from '@components/Modal/useModal'
import VeterinarianListForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import veterinarianListConfig from '@lib/constants/list-configs/pet/veterinarian-list'

import veterinarianDuck from '@reducers/pet/veterinarian-list'
import veterinarianDetailDuck from '@reducers/pet/veterinarian-list/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))

const VeterinarianList = ({ veterinarianDetail, ...props }) => {
  const [ open, {  _handleClose } ] = useModal()
  useChangeStatusEffect(props.getVeterinarians, veterinarianDetail.status)

  useEffect(() => {
    props.getVeterinarians()
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
        <Grid.Column
          computer={11} mobile={12} tablet={8}>
          <div className='menu-item-table'>
            <Table
              config={veterinarianListConfig}
              duck={veterinarianDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
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

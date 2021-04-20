import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid } from 'semantic-ui-react'

import loadable from '@loadable/component'
import Table from '@components/Table'
import PetRetireReasonForm from  './Form'
import { useChangeStatusEffect } from '@hooks/Shared'
import petRetireReasonListConfig from '@lib/constants/list-configs/pet/animal-setting/retire-reason'

import petRetireReasonDuck from '@reducers/pet/retire-reason'
import petRetireReasonDetailDuck from '@reducers/pet/retire-reason/detail'

const ModalDelete = loadable(()=> import('@components/Modal/Delete'))
const PetRetireReasonList = ({  petRetireReasonDetail, ...props }) => {
  useChangeStatusEffect(props.getPetRetireReason, petRetireReasonDetail.status)

  useEffect(() => {
    props.getPetRetireReason()
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
              config={petRetireReasonListConfig}
              duck={petRetireReasonDuck}
              onActionClick={_handleAddBtnClick}
              onRowButtonClick={_handleButtonClick}/>
          </div>
        </Grid.Column>
      </Grid>

      <PetRetireReasonForm/>
      <ModalDelete duckDetail={petRetireReasonDetailDuck}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petRetireReason      : petRetireReasonDuck.selectors.list(state),
      petRetireReasonDetail: petRetireReasonDetailDuck.selectors.detail(state)
    }), {
      getPetRetireReason: petRetireReasonDuck.creators.get,
      setItem           : petRetireReasonDetailDuck.creators.setItem
    })
)(PetRetireReasonList)


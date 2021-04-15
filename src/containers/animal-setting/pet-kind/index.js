import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Icon } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'
import loadable from '@loadable/component'

import Table from '@components/Table'
import PetKindForm from  './create'
import { useChangeStatusEffect } from '@hooks/Shared'
import petKindListConfig from '@lib/constants/list-configs/pet/animal-setting/kind'

import petKindDuck from '@reducers/pet/kind'
import petKindDetailDuck from '@reducers/pet/kind/detail'
const ModalDelete = loadable(()=> import('@components/Modal/Delete'))

const PetKindList = ({ petKindDetail, ...props }) => {
  useChangeStatusEffect(props.getPetKinds, petKindDetail.status)

  const history = useHistory()
  useEffect(() => {
    props.getPetKinds()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleButtonClick = (button,item) =>{
    switch (button) {
      case 'edit': props.setItem(item,'UPDATE')
        break
      case 'delete' : props.setItem(item,'DELETE')
        break
      case 'vaccine_list' :   history.push({
        pathname: '/setup/animal-setting/vaccination',
        state   : {
          breedItem: item.id

        }
      })
    }
  }

  return (
    <>
      <Grid>
        <Grid.Column
          className='ml16'
          computer={16} mobile={16} tablet={16}>
          <span className='quick-link-font' color='teal'><b>Animal Species Accepted</b></span>
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Column
          className='pr0'
          computer={8} mobile={12} tablet={10}>
          <Table
            config={petKindListConfig}
            duck={petKindDuck}
            onRowButtonClick={_handleButtonClick}/>
        </Grid.Column>
        <Grid.Column
          computer={4} mobile={4} tablet={4}>
          <Button basic color='teal' onClick={_handleAddBtnClick}><Icon name='plus'></Icon>Add Species</Button>
        </Grid.Column>
      </Grid>

      <PetKindForm/>
      <ModalDelete duckDetail={petKindDetailDuck}/>

    </>
  )
}

export default compose(
  connect(
    state => ({
      petKind      : petKindDuck.selectors.list(state),
      petKindDetail: petKindDetailDuck.selectors.detail(state)
    }), {
      getPetKinds: petKindDuck.creators.get,
      setItem    : petKindDetailDuck.creators.setItem
    })
)(PetKindList)

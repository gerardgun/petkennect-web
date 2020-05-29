import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import SimpleTable from '@components/Common/SimpleTable'
import useModal from '@components/Modal/useModal'

import serviceDetailDuck from '@reducers/service/detail'
import serviceAddonDuck from '@reducers/service/addon'
import serviceAddonDetailDuck from '@reducers/service/addon/detail'
import serviceAddonGroupDetailDuck from '@reducers/service/addon/group/detail'

import { defaultGroups } from './index'

const AddonGroupTable = ({ ...props }) => {
  const [ openDeleteAddonModal, {
    _handleOpen : _handleOpenDeleteAddonModal,
    _handleClose :  _handleCloseDeleteAddonModal
  } ] = useModal()
  const [ openDeleteAddonGroupModal, {
    _handleOpen : _handleOpenDeleteAddonGroupModal,
    _handleClose: _handleCloseDeleteAddonGroupModal
  } ] = useModal()

  const _handleAddBtnClick = () => {
    props.setServiceAddonGroupItem(props.group)
    props.setServiceAddonItem(null, 'CREATE')
  }
  const _handleEditBtnClick = () => {
    props.setServiceAddonGroupItem(props.group, 'UPDATE')
  }
  const _handleRowClick = (e, item) => {
    props.setServiceAddonGroupItem(props.group)
    props.setServiceAddonItem(item, 'UPDATE')
  }

  const _handleRowOptionClick = (option, item) => {
    props.setServiceAddonGroupItem(props.group)
    if(option === 'edit') {
      props.setServiceAddonItem(item, 'UPDATE')
    } else if(option === 'delete') {
      props.setServiceAddonItem(item)
      _handleOpenDeleteAddonModal()
    }
  }

  const _handleDeleteAddonGroupClick = () => {
    props.setServiceAddonGroupItem(props.group)
    _handleOpenDeleteAddonGroupModal()
  }

  // const loading = [ 'DELETED','PUT','POSTED' ].includes(serviceAddonDetail.status) &&
  // serviceDetail.status === 'GETTING'  && serviceAddonDetail.item.group_code === props.group.name

  return (
    <Segment className='segment-content'>
      <Grid className='segment-content-header' columns={2}>
        <Grid.Column width={4}>
          <Header as='h2'>{props.group.name}</Header>
        </Grid.Column >
        <Grid.Column textAlign='right' width={12}>

          {
            !defaultGroups.includes(props.group.name) && (<Button color='google plus' content='Delete' onClick={_handleDeleteAddonGroupClick}/>)
          }
          {
            !defaultGroups.includes(props.group.name) &&  <Button
              color='teal' content='Edit'
              icon='edit'
              labelPosition='left'
              onClick={_handleEditBtnClick}/>
          }

          <Button
            color='teal'
            content='Add'
            icon='add' labelPosition='left'
            onClick={_handleAddBtnClick}/>
        </Grid.Column>
      </Grid>
      <SimpleTable
        config={props.serviceAddon.config}
        items={props.group.addons}
        onRowClick={_handleRowClick}
        onRowOptionClick={_handleRowOptionClick}/>
      <ModalDelete
        duckDetail={serviceAddonDetailDuck}
        onClose={_handleCloseDeleteAddonModal}
        open={openDeleteAddonModal}/>

      <ModalDelete
        duckDetail={serviceAddonGroupDetailDuck}
        onClose={_handleCloseDeleteAddonGroupModal}
        open={openDeleteAddonGroupModal}/>
    </Segment>

  )
}

AddonGroupTable.propTypes = {
  group: PropTypes.shape({
    id    : PropTypes.string,
    name  : PropTypes.string,
    addons: PropTypes.arrayOf(PropTypes.shape({}))
  }).isRequired
}
export default compose(
  connect(
    ({ ...state }) => ({
      serviceAddon      : serviceAddonDuck.selectors.list(state),
      serviceAddonDetail: serviceAddonDetailDuck.selectors.detail(state),
      serviceDetail     : serviceDetailDuck.selectors.detail(state)
    }), {
      setServiceAddonItem     : serviceAddonDetailDuck.creators.setItem,
      setServiceAddonGroupItem: serviceAddonGroupDetailDuck.creators.setItem
    })
)(AddonGroupTable)

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Checkbox, Dropdown, Icon, Grid, Header, Form, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import Message from '@components/Message'
import useModal from '@components/Modal/useModal'
import { useChangeStatusEffect } from 'src/hooks/Shared'

import GroupCreate from './group/create'
import FieldCreate from './field/create'

import customizedDuck from '@reducers/customized-field'
import customizedFieldDuck from '@reducers/customized-field/field'
import customizedFieldDetailDuck from '@reducers/customized-field/field/detail'
import customizedFieldGroupDuck from '@reducers/customized-field/group'
import customizedFieldGroupDetailDuck from '@reducers/customized-field/group/detail'

import './styles.scss'

const CustomizedField = ({ customizedField, customizedFieldDetail, customizedFieldGroup, customizedGroupDetail, EavEntities, ...props }) => {
  const [ openDeleteFieldModal, {
    _handleOpen : _handleOpenDeleteFieldModal,
    _handleClose :  _handleCloseDeleteFieldModal
  } ] = useModal()
  const [ openDeleteGroupModal, {
    _handleOpen : _handleOpenDeleteGroupModal,
    _handleClose: _handleCloseDeleteGroupModal
  } ] = useModal()

  const [ ActiveInfoItem, setActiveInfoItem ] = useState({ name: '', entitiId: '' })

  useChangeStatusEffect(() => props.getCustomizedFields(ActiveInfoItem.entitiId), customizedFieldDetail.status)
  useChangeStatusEffect(() => props.getCustomizedGroups(ActiveInfoItem.entitiId), customizedGroupDetail.status)

  useEffect(() => {
    props.getEavEntities()
  }, [])

  useEffect(() => {
    if(EavEntities.status == 'GOT')
      if(EavEntities.item.length > 0) {
        const entitiId = EavEntities.item[0].id
        const entitiName = EavEntities.item[0].model_name
        props.getCustomizedFields(entitiId)
        props.getCustomizedGroups(entitiId)
        setActiveInfoItem({ name: entitiName,entitiId: entitiId })
      }
  }, [ EavEntities.status ])

  const _handleInfoItemClick = (e, { name, entitiID }) =>(
    setActiveInfoItem({ name: name,entitiId: entitiID }),
    props.getCustomizedFields(entitiID),
    props.getCustomizedGroups(entitiID)
  )

  const _handleCreateGroupBtnClick = () => {
    props.setGroupItem(ActiveInfoItem.entitiId, 'CREATE')
  }

  const _handleUpdateGroupBtnClick = (e, { itemID }) => {
    const selectedDetail = customizedFieldGroup.item.filter(_ => _.id === itemID)
    props.setGroupItem(selectedDetail[0], 'UPDATE')
  }

  const _handleDeleteGroupBtnClick = (e, { itemID }) =>{
    const selectedDetail = customizedFieldGroup.item.filter(_ => _.id === itemID)
    props.setGroupItem(selectedDetail[0], 'DELETE')
    _handleOpenDeleteGroupModal()
  }

  const _handleCreateFieldBtnClick = (e, { itemID }) =>{
    const selectedDetail = { eav_entity_id: ActiveInfoItem.entitiId,entity_group: itemID }
    props.setItem(selectedDetail, 'CREATE')
  }

  const _handleUpdateFieldBtnClick = (e, { itemID }) =>{
    const selectedDetail = customizedField.item.filter(_ => _.id === itemID)
    props.setItem(selectedDetail[0], 'UPDATE')
  }

  const _handleDeleteFieldBtnClick = (e, { itemID }) =>{
    const selectedDetail = customizedField.item.filter(_ => _.id === itemID)
    props.setItem(selectedDetail[0], 'DELETE')
    _handleOpenDeleteFieldModal()
  }

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2' className='cls-MainHeader'>Customized Fields</Header>
          </Grid.Column>
          <Grid.Column textAlign='right'>

          </Grid.Column>
        </Grid>
        <div className='mv32'>
          {
            // eslint-disable-next-line no-unused-vars
            EavEntities.item.length > 0 && EavEntities.item.map((item,index)=>(
              <>
                <Button
                  basic={ActiveInfoItem.name !== item.model_name} color='blue'
                  content={item.model_name} entitiID={item.id} name={item.model_name}
                  onClick={_handleInfoItemClick}/>
              </>
            ))
          }
        </div>

        <Message
          content={
            <Grid padded style={{ marginLeft: -16 }}>
              <Grid.Column className='mb0 pb0' width='16'>
                <div className='message__title'>PetKennect allows you to customize all information you collect about your clients.</div>
              </Grid.Column>
            </Grid>

          } type='warning'/>

        <Form>
          <Grid className='mt16'>
            <Grid.Column columns={16}  textAlign='right'>
              <Button
                color='teal' content='Add Group' icon='plus circle'
                onClick={_handleCreateGroupBtnClick}/>
            </Grid.Column>
          </Grid>
          {
            customizedFieldGroup.item.length > 0 && customizedFieldGroup.item.map((groupItem,index)=>(
              <>
                <Grid className='mv8' columns={2} key={index}>
                  <Grid.Column>
                    <Header as='h2'>{groupItem.name}</Header>
                  </Grid.Column >
                  <Grid.Column textAlign='right'>
                    <Button
                      color='teal'
                      content='Add Field' icon='plus circle' itemID={groupItem.id}
                      onClick={_handleCreateFieldBtnClick}/>
                    <Button
                      basic icon='edit outline' itemID={groupItem.id}
                      onClick={_handleUpdateGroupBtnClick}/>
                    <Button
                      basic color='red' icon='trash alternate outline'
                      itemID={groupItem.id} onClick={_handleDeleteGroupBtnClick}/>
                  </Grid.Column>
                </Grid>
                {
                  customizedField.item.length > 0
                      && customizedField.item.filter(_ => _.entity_group == groupItem.id).map((fieldItem)=>(
                        <>
                          <div className='c-note-item wrapper'>
                            <div className='flex justify-between align-center'>
                              <div className='thumbnail-wrapper w15'>
                                <div>
                                  <div>{fieldItem.display_name}&nbsp;&nbsp;<Icon name='lock'/></div>
                                </div>
                              </div>
                              <div>
                                <Dropdown
                                  options={[
                                    { key: 1, value: 'C', text: 'Checkbox' },
                                    { key: 2, value: 'D', text: 'Dropdown' },
                                    { key: 3, value: 'R', text: 'Radio' },
                                    { key: 4, value: 'I', text: 'Input Text' },
                                    { key: 5, value: 'T', text: 'Text Area' }
                                  ]}
                                  placeholder='All'
                                  readOnly
                                  selection
                                  value={fieldItem.display_type}/>
                              </div>
                              <div className='permission-checkbox'>
                                <Checkbox checked={fieldItem.is_required} label='Required'/><br/>
                                <Checkbox checked={fieldItem.is_editable_by_client} label='Editable by Client'/><br/>
                                <Checkbox checked={fieldItem.is_editable_by_employee} label='Editable by Employee'/><br/>
                                <Checkbox checked={fieldItem.is_visible_by_client} label='Visible by Client'/>
                              </div>
                              <div>
                                <Button
                                  basic
                                  className='ml16'
                                  icon itemID={fieldItem.id}
                                  onClick={_handleUpdateFieldBtnClick} size='small'>
                                  <Icon name='edit outline'/>
                                </Button>
                                <Button
                                  basic
                                  color='red' icon itemID={fieldItem.id}
                                  onClick={_handleDeleteFieldBtnClick} size='small'>
                                  <Icon name='trash alternate outline'/>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      ))
                }
              </>
            ))
          }
        </Form>
      </Segment>
      <GroupCreate/>
      <FieldCreate/>
      <ModalDelete
        duckDetail={customizedFieldDetailDuck}
        onClose={_handleCloseDeleteFieldModal}
        open={openDeleteFieldModal}/>
      <ModalDelete
        duckDetail={customizedFieldGroupDetailDuck}
        onClose={_handleCloseDeleteGroupModal}
        open={openDeleteGroupModal}/>
    </Layout>
  )
}

export default compose(

  connect(
    (state) => ({
      customizedField      : customizedFieldDuck.selectors.detail(state),
      customizedFieldDetail: customizedFieldDetailDuck.selectors.detail(state),
      customizedFieldGroup : customizedFieldGroupDuck.selectors.detail(state),
      customizedGroupDetail: customizedFieldGroupDetailDuck.selectors.detail(state),
      EavEntities          : customizedDuck.selectors.detail(state)
    }),
    {
      getEavEntities     : customizedDuck.creators.get,
      getCustomizedFields: customizedFieldDuck.creators.get,
      getCustomizedGroups: customizedFieldGroupDuck.creators.get,
      setItem            : customizedFieldDetailDuck.creators.setItem,
      setGroupItem       : customizedFieldGroupDetailDuck.creators.setItem
    }
  )
)(CustomizedField)

import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { useLocation } from 'react-router-dom'
import { Grid,Segment, Card, Header, Icon, Button } from 'semantic-ui-react'
import Layout from '@components/Common/Layout'

import { getAbbreviature } from '@lib/utils/functions'

import ModalDelete from '@components/Modal/Delete'
import { useChangeStatusEffect } from '@hooks/Shared'
import ManagerShortcut from '../../manager-shortcut/manager-shortcut'
import HeaderLink from '../../manager-shortcut/header-link'
import EmployeeMenu from '../employee-menu'
import EmployeeNoteFrom from './note-form'
import EmployeeReplyNoteForm from './reply-note-form'

import noteDuck from '@reducers/manager-dashboard/employee/employee-note'
import noteDetailDuck from '@reducers/manager-dashboard/employee/employee-note/detail'

const EmployeeNote = ({ noteDetail, ...props }) => {
  useChangeStatusEffect(props.getNotess, noteDetail.status)
  const location = useLocation()
  const [ showSideBar ] =  useState(location.state ? !location.state.isSideBarHidden : false)
  const [ sidebarHidden, setSidebarHidden ] = useState()

  useEffect(() => {
    props.getNotes()
  }, [])

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  const _handleCreateComment = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleEditBtnClick = (e, data) => {
    console.log(data)
    const item = ''
    // const item = clientComment.items.find(({ id }) => id === +data['data-item-id'])
    props.setItem(item, 'UPDATE')
  }

  const _handleDeleteBtnClick = (e, data) => {
    console.log(data)
    const item = ''
    props.setItem(item, 'DELETE')
  }

  const _handleReplyNoteBtnClick = (e, data) =>{
    console.log(data)
    const item = ''
    props.setItem(item, 'READ')
  }

  return (
    <Layout showSidebar={showSideBar} sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Grid>
          <Grid.Column className='pb12 pt0 ' computer={16}>
            <HeaderLink sideBarHidden={sidebarHidden}/>
          </Grid.Column>
          <Grid.Column style={{ width: '17%' }}>
            <ManagerShortcut/>
          </Grid.Column>
          <Grid.Column className='pl0' style={{ width: '83%' }}>
            <Card fluid>
              <div className='pv20 ph16'>
                <Grid style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                  <Grid.Column
                    className='pb4'
                    computer={16} mobile={16} tablet={6}>
                    <EmployeeMenu/>
                  </Grid.Column >
                </Grid>
                <Grid columns={2}>
                  <Grid.Column computer={8} mobile={14} tablet={8}>
                    <Header as='h3' className='mt4'>Employee Notes</Header>
                  </Grid.Column >
                  <Grid.Column
                    className='ui-grid-align'
                    computer={8} mobile={14} tablet={8}>
                    <Button color='teal' onClick={_handleCreateComment}><Icon name='plus'/>Add Comment</Button>
                  </Grid.Column>
                </Grid>
                <div className='petkennect-profile-body-content'>
                  <div className='c-note-item'>
                    {/* Header */}
                    <div className='flex justify-between align-center mb20 mv12'>
                      <div className='avatar-wrapper'>
                        <div className='avatar'>
                          {getAbbreviature('user_multi petkennect')}
                        </div>
                        <div>
                        <p>user_multi petkennect</p>
                        <span className='text-gray'>6/17/2021, 9:49:54 AM</span>
                      </div>
                    </div>
                    <div>
                      <Button
                        basic color='teal' icon='reply'
                        // data-item-id={item.id}
                        onClick={_handleReplyNoteBtnClick}/>
                      <Button
                        basic color='red'
                        // data-item-id={item.id}
                        icon='trash alternate outline' onClick={_handleDeleteBtnClick}/>
                      <Button
                        basic
                        // data-item-id={item.id}
                        icon='edit outline'
                        onClick={_handleEditBtnClick}/>
                    </div>
                  </div>

                  {/* Content */}
                  <p className='description'>
                    Test Comment
                  </p>
                  </div>
                </div>
              </div>
            </Card>
          </Grid.Column>
        </Grid>
      </Segment>

      <EmployeeNoteFrom/>
      <EmployeeReplyNoteForm/>
      <ModalDelete duckDetail={noteDetailDuck}/>
    </Layout>
  )
}

export default compose(
  connect(
    (state) => {
      const noteDetail = noteDetailDuck.selectors.detail(state)

      return {
        noteDetail,
        note: noteDuck.selectors.list(state)
      }
    },
    {
      getNotes : noteDuck.creators.get,
      setItem  : noteDetailDuck.creators.setItem
    }
  )
)(EmployeeNote)


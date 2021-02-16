import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Header, Segment, Dropdown, Button, Grid, Container } from 'semantic-ui-react'
import { compose } from 'redux'

import Table from '@components/Table'
import PetNotes from '../Notes'
import petDetailDuck from '@reducers/pet/detail'
import petReservationDetailDuck from '@reducers/pet/reservation/detail'
import dayCampReservationDuck from '@reducers/pet/reservation/daycamp-reservation'
import dayCampReservationDetailDuck from '@reducers/pet/reservation/daycamp-reservation/detail'
import petNoteDetailDuck from '@reducers/pet/note/detail'
import PackageCreateForm from './package-create'

function DaycampServiceSection({ petDetail,  ...props }) {
  useEffect(() => {
    props.getDayCampReservation()
  }, [])
  const history = useHistory()

  const clientId = `${petDetail.item.client}`

  const _handleAddPackageBtnClick = () =>{
    props.setItem(null, 'CREATE')
  }

  const _handleRowClick = () => {
    // wip
  }
  const _handleRowOptionClick = () => {
    // wip
  }
  const _handleOptionDropdownChange = (optionName, item) => {
    switch (optionName) {
      case 'edit_reserve' : props.setItemReservation(item,'UPDATE')
        history.replace(`/client/${clientId}/book`)
        break

      case 'edit_note' : props.setNoteItem(item,'READ')
        break
    }
  }

  return (
    <Container className='c-booking-daycamp' fluid>
      <Grid className='segment-content-header' columns={2}>
        <Grid.Column computer={16}>
          <Header as='h2' className='child_header'>Day Camp Purchase History</Header>
        </Grid.Column>
        <Grid.Column
          className='ipad_full_width' computer={13} mobile={16}
          tablet={16}>
          <Segment>
            <Header as='h4' className='text-underline'>
      Current Package
            </Header>
            <Grid columns={16}>
              <Grid.Row>
                <Grid.Column computer={4} mobile={16} tablet={8}>
                  <b>Package Type</b><br/>
                  <p>5 Day</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={3} mobile={16}
                  tablet={8}>
                  <b>Used</b><br/>
                  <p>3</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={3} mobile={16}
                  tablet={8}>
                  <b>Remaining</b><br/>
                  <p>2</p>
                </Grid.Column>
                <Grid.Column computer={4} mobile={12} tablet={6}>
                  <b>Status</b><br/>
                  <p>PIF/Refunded</p>
                </Grid.Column>
                <Grid.Column computer={2} mobile={4} tablet={2}>
                  <Dropdown
                    className='dropdown_icon_hamburger_menu'
                    direction='left'
                    icon={null}
                    onChange={_handleOptionDropdownChange}
                    options={[
                      { key: 1, icon: 'edit', value: 'edit', text: 'Edit' },
                      { key: 2, icon: 'share icon', value: 'transfer_package', text: 'Transfer Package' },
                      { key: 3, icon: 'paper plane outline', value: 'refund', text: 'Refund' },
                      { key: 4, icon: 'trash', value: 'delete', text: 'Delete' }
                    ]}
                    selectOnBlur={false}
                    trigger={(
                      <Button basic icon='ellipsis vertical'/>
                    )}
                    value={null}/>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column width={16}>
                  <b>Comment: </b> Test comment
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Header as='h4' className='text-underline'>
      Total Usage
            </Header>
            <Grid columns={16}>
              <Grid.Row>
                <Grid.Column computer={4} mobile={16} tablet={16}>
                  <b>Days Allowed</b><br/>
                  <p>100</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={3} mobile={16}
                  tablet={8}>
                  <b>Used</b><br/>
                  <p>97</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={3} mobile={16}
                  tablet={8}>
                  <b>Remaining</b><br/>
                  <p>2</p>
                </Grid.Column>
                <Grid.Column
                  className='text-center-daycamp' computer={4} mobile={16}
                  tablet={8}>
                  <b>Reservations</b><br/>
                  <p>2</p>
                </Grid.Column>
                <Grid.Column computer={2} mobile={16} tablet={16}>
                </Grid.Column>
              </Grid.Row>
            </Grid>

          </Segment>
        </Grid.Column>
        <Grid.Column
          className='ipad_full_width' computer={3} mobile={16}
          tablet={16}>
          <Button
            className='mv8  w100' color='teal' content='Add Package'
            onClick={_handleAddPackageBtnClick}/>
          <Button className='mv8 w100' color='teal' content='Past Purchases'/>
          <Button className='mv8 w100' color='teal' content='Reservation Recon'/>
        </Grid.Column>

      </Grid>

      <Grid className='segment-content-header' columns={1}>
        <Grid.Column computer={16} mobile={16} tablet={16}>
          <Header as='h2' className='child_header'>Reservations</Header>
        </Grid.Column >
      </Grid>
      <Table
        duck={dayCampReservationDuck}
        onOptionDropdownChange={_handleOptionDropdownChange}
        onRowClick={_handleRowClick}
        onRowOptionClick={_handleRowOptionClick}/>
      <PackageCreateForm/>
      <PetNotes/>
    </Container>
  )
}

export default compose(
  connect(
    (state) => ({
      petDetail         : petDetailDuck.selectors.detail(state),
      daycampReservation: dayCampReservationDuck.selectors.list(state)
    }),{
      setNoteItem          : petNoteDetailDuck.creators.setItem,
      getDayCampReservation: dayCampReservationDuck.creators.get,
      setItem              : dayCampReservationDetailDuck.creators.setItem,
      setItemReservation   : petReservationDetailDuck.creators.setItem
    })
)(DaycampServiceSection)


import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

import { Field, reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import useModal from '@components/Modal/useModal'
import { Button, Grid, List, Form, Header, Label, Icon, Select, Popup, Segment } from 'semantic-ui-react'

import loadable from '@loadable/component'

import calendarDetailDuck from '@reducers/calendar/detail'

import './styles.scss'
const Layout = loadable(() => import('@components/Common/Layout'))
const CalendarEventCreate = loadable(() => import('./create'))

const Calendar = props => {
  const {
    handleSubmit, reset // redux-form
  } = props

  const _handleHolidayBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  // eslint-disable-next-line no-unused-vars
  const _handleSubmit = values => {

  }

  const _renderEventContent = (eventInfo)=>{
    return (
      <>
        <b>{eventInfo.event.title}</b>
        {
          eventInfo.event.extendedProps.count > 0 && (
            <span>{eventInfo.event.extendedProps.count}</span>
          )
        }
      </>
    )
  }

  // For Filter Popup
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  return (
    <Layout>
      <Segment className='segment-content' padded='very'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column computer={4} mobile={10} tablet={4}>
            <Header as='h2'>Calendar</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={12} mobile={10} tablet={12}>
            <Popup
              basic
              on='click' onClose={_handleClose} onOpen={_handleOpen}
              open={open} position='bottom right'
              trigger={<Button basic={!open} color={open ? 'teal' : null} content='Filters'/>}>
              <Popup.Content className='popup-filter-form' style={{ minWidth: '22rem', padding: '1rem 1rem 0.5rem' }}>
                {/* eslint-disable-next-line react/jsx-handler-names */}
                <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Location'
                      multiple={true}
                      name='location'
                      options={[
                        { key: 1, value: 1, text: 'location1' },
                        { key: 2, value: 2, text: 'location 2' }
                      ]}
                      placeholder='Select option'
                      selectOnBlur={false}/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Month'
                      name='filter_month'
                      options={[
                        { key: 1, value: 1, text: 'Jan' },
                        { key: 2, value: 2, text: 'Feb' }
                      ]}
                      placeholder='Select option'
                      selectOnBlur={false}/>
                    <Field
                      component={FormField}
                      control={Select}
                      label='Year'
                      name='filter_year'
                      options={[
                        { key: 1, value: 1, text: '2020' },
                        { key: 2, value: 2, text: '2021' }
                      ]}
                      placeholder='Select option'
                      selectOnBlur={false}/>
                  </Form.Group>
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <Button
                        basic color='teal' content='Clear all filters'
                        type='reset'/>

                      <Button
                        color='teal' content='Apply'
                        icon='filter'/>
                    </Form.Field>
                  </Form.Group>
                </Form>

              </Popup.Content>
            </Popup>
            <Button
              as={Link} color='teal'
              content='Edit Calendar'
              onClick={_handleHolidayBtnClick}/>
          </Grid.Column>
        </Grid>

        <Grid className='segment-content-header' columns={1}>
          <Grid.Column style={{ paddingTop: 0 }} width={16}>
            <Label
              basic className='tag-manager-label' color='blue'>
              <strong>Location:</strong> SA-03
              <Icon name='delete'/>
            </Label>
          </Grid.Column>
          <Grid.Column width={16}>
            <FullCalendar
              eventContent={_renderEventContent}
              events={[
                { title: 'Daycamp', count: '10', date: '2020-11-02', className: 'service_full' },
                { title: 'Training', count: '15', date: '2020-11-02', color: '#A52A2A' },
                { title: 'Boarding', count: '20', date: '2020-11-06', color: 'blue' },
                { title: 'Daycamp', count: '10', date: '2020-12-02', className: 'service_full' },
                { title: 'Training', count: '15', date: '2020-12-02', color: '#A52A2A' },
                { title: 'Boarding', count: '20', date: '2020-12-13', color: 'blue' },
                {
                  count     : '0',
                  title     : 'Thanks Giving',
                  date      : '2020-11-26',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  start     : '2020-12-25',
                  end       : '2021-01-01',
                  classNames: [ 'calendar_Holiday' ],
                  display   : 'background'
                },
                {
                  count     : '0',
                  title     : 'Christmas Holiday',
                  date      : '2020-12-25',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  title     : 'Christmas Holiday',
                  date      : '2020-12-26',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  title     : 'Christmas Holiday',
                  date      : '2020-12-27',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  title     : 'Christmas Holiday',
                  date      : '2020-12-28',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  title     : 'Christmas Holiday',
                  date      : '2020-12-29',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  title     : 'New Year Eve',
                  date      : '2020-12-30',
                  classNames: [ 'calendar_Holiday' ]
                },
                {
                  count     : '0',
                  title     : 'New Year Eve',
                  date      : '2020-12-31',
                  classNames: [ 'calendar_Holiday' ]
                }
              ]}

              initialView='dayGridMonth'
              plugins={[ dayGridPlugin ]}
              weekends={true}/>
            <CalendarEventCreate/>
          </Grid.Column>
          <Grid.Column width={16}>
            <Label className='color_training' size='mini'>&nbsp;   </Label>&nbsp;&nbsp;
            Training&nbsp;&nbsp;
            <Label color='teal' size='mini'>&nbsp;   </Label>&nbsp;&nbsp;
            Daycamp&nbsp;&nbsp;
            <Label color='blue' size='mini'>&nbsp;   </Label>&nbsp;&nbsp;
            Boarding&nbsp;&nbsp;
            <Label className='service_full' size='mini'>&nbsp;</Label> Full&nbsp;&nbsp;
            <Label className='color_peak' size='mini'>&nbsp;   </Label>&nbsp;&nbsp;
            Peak&nbsp;&nbsp;
          </Grid.Column >
          <Grid.Column width={16}>
            <List>
              <List.Item>
                <List.Icon name='marker'/>
                <List.Content>
                  <List.Description>December 18-January 3 (Christmas/New Year) PREPAYMENT REQUIRED by December 4th 2020
                  </List.Description>
                </List.Content>
              </List.Item>
              <List.Item>
                <List.Icon name='marker'/>
                <List.Content>
                  <List.Description>There is a 4 Day Minimum reservation required for Medium and Large dogs through
                    the following Holiday/Peak boarding periods in 2020
                  </List.Description>
                </List.Content>
              </List.Item>
            </List>
          </Grid.Column>
        </Grid>
      </Segment>
    </Layout>
  )
}

export default compose(
  connect(
    () => ({}),
    {
      setItem: calendarDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form              : 'calendar-filter-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(Calendar)

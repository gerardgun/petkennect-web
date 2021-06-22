/* eslint-disable */
import React, { useState } from 'react'
import { useDispatch, useSelector, connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Label, Icon, Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, GridColumn, GridRow } from 'semantic-ui-react'
import * as Yup from 'yup'
import Theme from '@components/mainTheme'

import tenantDetailDuck from '@reducers/tenant/detail'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import { parseFormValues, syncValidate } from '@lib/utils/functions'
import { TimeAmPm } from './utils'

const SetupCompanyProfileSystemSettings = props => {
  const {
    tenant,
    error, handleSubmit // redux-form
  } = props
  const dispatch = useDispatch()

  const[sundayStart, setSundayStart] = useState('9:00')
  const[sundayEnd, setSundayEnd] = useState('6:00')
  const[mondayStart, setMondayStart] = useState('9:00')
  const[mondayEnd, setMondayEnd] = useState('6:00')
  const[tuesdayStart, setTuesdayStart] = useState('9:00')
  const[tuesdayEnd, setTuesdayEnd] = useState('6:00')
  const[wednesdayStart, setWednesdayStart] = useState('9:00')
  const[wednesdayEnd, setWednesdayEnd] = useState('6:00')
  const[thursdayStart, setThursdayStart] = useState('9:00')
  const[thursdayEnd, setThursdayEnd] = useState('6:00')
  const[fridayStart, setFridayStart] = useState('9:00')
  const[fridayEnd, setFridayEnd] = useState('6:00')
  const[saturdayStart, setSaturdayStart] = useState('9:00')
  const[saturdayEnd, setSaturdayEnd] = useState('6:00')
  const[showEdit, setShowEdit] = useState(false)

  const setStartTimes = (timeStart) =>{
    if(timeStart){
      setSundayStart(timeStart);setMondayStart(timeStart);setTuesdayStart(timeStart);
      setWednesdayStart(timeStart);setThursdayStart(timeStart);setFridayStart(timeStart);setSaturdayStart(timeStart);
    }
  }

  const setEndTimes = (timeEnd) =>{
    if(timeEnd){
      setSundayEnd(timeEnd);setMondayEnd(timeEnd);setTuesdayEnd(timeEnd);
      setWednesdayEnd(timeEnd);setThursdayEnd(timeEnd);setFridayEnd(timeEnd);setSaturdayEnd(timeEnd);
    }
  }
      
  const _handleSubmit = values => {
    console.log(values)
    const { weigth_type, currency_format, ...rest } = parseFormValues(values)
    const convertChar = {...rest, weight_type: weigth_type}
    const s_config = {system_config: convertChar}
    dispatch(tenantDetailDuck.creators.put(s_config))
  }

return (
  <Layout>
    <Segment className='segment-content' padded='very'>
      <Menu/>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onSubmit={handleSubmit(_handleSubmit)}>
        <Header as='h3' color={Theme(tenant).headingColor} content='System Wide Settings: Changes Affect All Locations'/>
        <Grid>
          <Grid.Row style={{ padding: '1rem' }}>
            <Grid.Column width='5'>
              <Header as='h4' content='Set the format for the following field types:' />
            </Grid.Column>
            <Grid.Column width='11' verticalAlign='middle'>
              <Grid style={{ padding: '1rem' }}>
                <Grid.Row>
                  <Grid.Column width='3'>
                    <Header as='h4' content='Date Format:'/>
                  </Grid.Column>
                  <Grid.Column width='4'>
                  <Field
                    component={FormField}
                    control={Select}
                    name='date_format'
                    options={[
                      { value: 'MM/DD/YYYY', text: 'MM/DD/YYYY' },
                      { value: 'DD/MM/YYYY', text: 'DD/MM/YYYY' },
                    ]}
                    placeholder='Select format'
                    selectOnBlur={false}
                    required/>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width='3'>
                    <Header as='h4' content='Time Format:'/>
                  </Grid.Column>
                  <Grid.Column width='4'>
                    <Field
                      component={FormField}
                      control={Select}
                      name='time_format'
                      options={[
                        { value: 'H:mm a', text: '24 Hours' },
                        { value: 'h:mm a', text: '12 Hours' },
                      ]}
                      placeholder='Select format'
                      selectOnBlur={false}
                      required/>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width='3'>
                    <Header as='h4' content='Weight Units:'/>
                  </Grid.Column>
                  <Grid.Column width='4'>
                    <Field
                      component={FormField}
                      control={Select}
                      name='weigth_type'
                      options={[
                        { value: 'L', text: 'Lbs' },
                        { value: 'K', text: 'Kgs' },
                      ]}
                      placeholder='Select format'
                      selectOnBlur={false}/>
                  </Grid.Column>
                </Grid.Row>

                <Grid.Row>
                  <Grid.Column width='3'>
                    <Header as='h4' content='Currency:'/>
                  </Grid.Column>
                  <Grid.Column width='4'>
                    <Field
                      component={FormField}
                      control={Select}
                      name='currency_format'
                      options={[
                        { value: 1, text: 'US Dollar' },
                        { value: 2, text: 'Euro' },
                      ]}
                      placeholder='Select format'
                      search
                      selectOnBlur={false}
                      required/>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Divider/>
        
        <Grid style={{ padding: '1rem' }}>
          <Grid.Row>
            <Grid.Column width='5'>
              <Header as='h4' content='Enable Hours of Operation and Special Days for All Locations:' />
            </Grid.Column>
            <GridColumn width='11' style={{ padding: '0px 2rem' }}>
              <Checkbox toggle  className='header-check'/>
            </GridColumn>
          </Grid.Row>
        </Grid>

        <Grid style={{ padding: '1rem' }}>
          <GridRow>
            <Grid.Column width='1'>
              <Icon name='clock outline'/>
            </Grid.Column>
            <Grid.Column width='2'>
              <p>Hours</p>
            </Grid.Column>
            <Grid.Column width='4'>
              <div className='day-hours'>
                <p>Sunday</p>
                <p>{sundayStart} am - {sundayEnd} pm</p>
              </div>
              <div className='day-hours'>
                <p>Monday</p>
                <p>{mondayStart} am - {mondayEnd} pm</p>
              </div>
              <div className='day-hours'>
                <p>Tuesday</p>
                <p>{tuesdayStart} am - {tuesdayEnd} pm</p>
              </div>
              <div className='day-hours'>
                <p>Wednesday</p>
                <p>{wednesdayStart} am - {wednesdayEnd} pm</p>
              </div>
              <div className='day-hours'>
                <p>Thursday</p>
                <p>{thursdayStart} am - {thursdayEnd} pm</p>
              </div>
              <div className='day-hours'>
                <p>Friday</p>
                <p>{fridayStart} am - {fridayEnd} pm</p>
              </div>
              <div className='day-hours'>
                <p>Saturday</p>
                <p>{saturdayStart} am - {saturdayEnd} pm</p>
              </div>
            </Grid.Column>
            <Grid.Column width='1'>
                {/* eslint-disable-next-line react/jsx-handler-names */}
                <Icon name='pencil' onClick={() => setShowEdit(true)} />
            </Grid.Column>
            {showEdit &&
              <>
                  <Grid.Column width='5'>
                    <div className='day-hours'>
                      <p>Sunday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setSundayStart(TimeAmPm(e.target.value))}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setSundayEnd(TimeAmPm(e.target.value))}/></div>
                    </div>
                    <div className='day-hours'>
                      <p>Monday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setMondayStart(TimeAmPm(e.target.value))}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setMondayEnd(TimeAmPm(e.target.value))}/></div>
                    </div>
                    <div className='day-hours'>
                      <p>Tuesday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setTuesdayStart(TimeAmPm(e.target.value))}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setTuesdayEnd(TimeAmPm(e.target.value))}/></div>
                    </div>
                    <div className='day-hours'>
                      <p>Wednesday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setWednesdayStart(TimeAmPm(e.target.value))}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setWednesdayEnd(TimeAmPm(e.target.value))}/></div>
                    </div>
                    <div className='day-hours'>
                      <p>Thursday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setThursdayStart(TimeAmPm(e.target.value))}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setThursdayEnd(TimeAmPm(e.target.value))}/></div>
                    </div>
                    <div className='day-hours'>
                      <p>Friday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setFridayStart(e.target.value)}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setFridayEnd(e.target.value)}/></div>
                    </div>
                    <div className='day-hours'>
                      <p>Saturday</p>
                      <div className='input-hours'>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="00:00" max="11:00" onChange={(e)=> e.target.value && setSaturdayStart(e.target.value)}/><p> to </p>
                        {/* eslint-disable-next-line react/jsx-handler-names */}
                        <Input type='time' min="12:00" max="23:00" onChange={(e)=> e.target.value && setSaturdayEnd(e.target.value)}/></div>
                    </div>
                  </Grid.Column>
                  <Grid.Column width='3'>
                    {/* eslint-disable-next-line react/jsx-handler-names */}
                    <Label onClick={()=>{setStartTimes(sundayStart); setEndTimes(sundayEnd)} }>
                      <Icon name='copy' color='teal' outline />
                      Copy time to all
                    </Label>
                  </Grid.Column>
                </>}
          </GridRow>
        </Grid>
        
        <Grid style={{ padding: '1rem' }}>
          <GridRow>
            <Grid.Column width='1'>
              <Icon.Group >
                <Icon name='calendar outline' />
                <Icon corner='bottom right' name='clock outline' />
              </Icon.Group>
            </Grid.Column>
            <Grid.Column width='2'>
              <p>Special Hours</p>
            </Grid.Column>
            <Grid.Column width='4'>
              <div className='day-hours'>
                <p>05/06/21</p>
                <p>Closed</p>
              </div>
              <div className='day-hours'>
                <p>05/06/21</p>
                <p>Closed</p>
              </div>
              <div className='day-hours'>
                <p>05/06/21</p>
                <p>Closed</p>
              </div>
            </Grid.Column>
          </GridRow>
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }
          <Grid.Row>
              <Grid.Column width='6'>
              </Grid.Column>
              <Grid.Column width='4' floated='right'>
                <Form.Field>
                    <Button basic 
                      type='button'
                      color='red' 
                      content='Cancel'/>
                    <Button 
                      color= 'teal' 
                      type= 'submit'
                      content= 'Save changes'/>
                </Form.Field>
              </Grid.Column>
            </Grid.Row>
        </Grid>

      </Form>
    </Segment>
  </Layout>
  )
}

export default compose(
  withRouter,
  connect(
    state => {
      const tenant = tenantDetailDuck.selectors.detail(state)
      return {
        tenant,
      }
    }
  ),
  reduxForm({
  form              : 'system-settings-form',
  enableReinitialize: true,
  validate          : values => {
    const schema = {
      date_format  : Yup.string().required('Date Format is required'),
      time_format  : Yup.string().required('Time Format is required'),
      weight_type  : Yup.string().required('Weight is required'),
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})
)(SetupCompanyProfileSystemSettings)
/* eslint-enable */

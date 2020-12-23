import React, { useState } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Menu, Grid, Button , Segment, Header ,Input ,Form, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import trainPackageDuck from '@reducers/training-package'
import FormField from '@components/Common/FormField'
import Table from '@components/Table'
import './style.scss'
const TrainingPerformance =  () => {
  const  [ activeMenuItem,setActiveMenuItem ] = useState('report')

  const _handleMenuItemClick = (e,{ name }) =>{
    setActiveMenuItem(name)
  }

  return (

    <Grid className='mv32'>

      <Grid.Column

        computer={4} mobile={12} tablet={9}>

        <Menu
          className='petkennect-profile-menu' color='teal' fluid
          vertical>
          <Menu.Item
            active={activeMenuItem === 'report'} link name='report'
            onClick={_handleMenuItemClick}>
                      Reports
          </Menu.Item>
          <Menu.Item
            active={activeMenuItem === 'performance'} link name='performance'
            onClick={_handleMenuItemClick}>
                      Performance
          </Menu.Item>

        </Menu>
      </Grid.Column>
      <Grid.Column
        className='petkennect-profile-body' computer={12} mobile={16}
        tablet={16}>
        <Grid.Column>

        </Grid.Column>

        {activeMenuItem === 'performance'  && (

          <>

            <Form onReset='' onSubmit=''>

              <Field component='input' name='id' type='hidden'/>
              <Form.Group>
                <Button
                  className='perfomance-save'
                  color='teal'
                  content='Save'
                  onClick=''
                  type='button'/>
              </Form.Group>
              <Form.Group widths='2'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Trainer  '

                  name='trainer'
                  options={[
                    { key: 1, value: 1, text: 'Trainer 1' },
                    { key: 2, value: 2, text: 'Trainer 2' },
                    { key: 3, value: 3, text: 'Trainer 3' },
                    { key: 4, value: 4, text: 'Trainer 4' }
                  ]}
                  placeholder='Select Trainer'
                  selectOnBlur={false}/>
                <Field
                  component={FormField}
                  control={Select}
                  label='Method'

                  name='method'
                  options={[
                    { key: 1, value: 1, text: 'Method 1' },
                    { key: 2, value: 2, text: 'Method 2' },
                    { key: 3, value: 3, text: 'Method 3' },
                    { key: 4, value: 4, text: 'Method 4' }
                  ]}
                  placeholder='Select Method'
                  selectOnBlur={false}/>

              </Form.Group>
              <Form.Group widths='2'>
                <Field
                  component={FormField}
                  control={Input}
                  label='Eval Date'
                  name='eval_date'
                  required
                  type='date'/>

                <Field

                  component={FormField}
                  control={Select}
                  label='Time'
                  name='trainer'
                  options={[
                    { key: 1, value: 1, text: 'Am' },
                    { key: 2, value: 2, text: 'Pm' }

                  ]}
                  placeholder='Select Time'
                  selectOnBlur={false}/>
              </Form.Group>

              <Segment>
                <Header as='h3'>Training Commands</Header>
                <Grid columns={4} >
                  <Grid.Column computer={3} mobile={6}>
                    <Form.Group>  <label>Sit</label></Form.Group>
                    <Form.Group> <label>Activity</label></Form.Group>
                    <Form.Group> <label>Down/Stay</label>  </Form.Group>
                    <Form.Group>  <label>Sit in Motion</label></Form.Group>
                    <Form.Group>  <label>Off</label></Form.Group>
                    <Form.Group> <label>Loose Lead</label></Form.Group>
                    <Form.Group> <label>place/Stay</label></Form.Group>
                    <Form.Group>  <label>Come</label></Form.Group>
                  </Grid.Column>
                  <Grid.Column computer={5} mobile={10}>
                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='sit' type='radio'
                        value='1'/>
                      <label  className='radio-label'>2</label>
                      <Field
                        component='input' name='sit' type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='sit' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='sit' type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='sit' type='radio'
                        value='5'/>
                    </Form.Group>
                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='activity' type='radio'
                        value='1'/>
                      <label  className='radio-label'>2</label>
                      <Field
                        component='input'name='activity' type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='activity' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='activity'type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='activity'type='radio'
                        value='5'/>
                    </Form.Group>
                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='down_stay' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input'name='down_stay'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='down_stay' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='down_stay'  type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='down_stay'  type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='Sit in Motion' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input'name='Sit in Motion' type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='Sit in Motion' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='Sit in Motion'type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='Sit in Motion'type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='Off' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input'name='Off'type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='Off' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='Off'type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='Off' type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='Loose_Lead' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input'name='Loose_Lead'type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='Loose_Lead' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='Loose_Lead'type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='Loose_Lead' type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='place_stay' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='place_stay' type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='place_stay' type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='place_stay' type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='place_stay' type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='come' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='come'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='come'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='come'  type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='come'  type='radio'
                        value='5'/>
                    </Form.Group>

                  </Grid.Column>
                  <Grid.Column computer={3} mobile={6} >
                    <Form.Group>  <label>Down</label></Form.Group>
                    <Form.Group> <label>Sit/Stay</label></Form.Group>
                    <Form.Group> <label>Touch</label>  </Form.Group>
                    <Form.Group>  <label>Down in Motion</label></Form.Group>
                    <Form.Group>  <label>Place</label></Form.Group>
                    <Form.Group> <label>Quiet</label></Form.Group>
                    <Form.Group> <label>Heel</label></Form.Group>

                  </Grid.Column>
                  <Grid.Column computer={5} mobile={10}>
                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='down' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='down'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='down'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input'  name='down'  type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='down'  type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='sit_stay' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='sit_stay'   type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='sit_stay'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='sit_stay'   type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='sit_stay'   type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='touch' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='touch'   type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='touch'   type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='touch'    type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='touch'   type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='down_in_motion' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='down_in_motion'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='down_in_motion'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='down_in_motion'   type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='down_in_motion'   type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='palce' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='palce'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='palce'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='palce'   type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='palce'  type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='quiet' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='quiet'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='quiet'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='quiet'   type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='quiet'  type='radio'
                        value='5'/>
                    </Form.Group>

                    <Form.Group>
                      <label className='radio-label'>1</label>
                      <Field

                        component='input' name='heel' type='radio'
                        value='1'/>
                      <label className='radio-label'>2</label>
                      <Field
                        component='input' name='heel'  type='radio'
                        value='2'/>
                      <label  className='radio-label'>3</label>
                      <Field
                        component='input' name='heel'  type='radio'
                        value='3'/>
                      <label  className='radio-label'>4</label>
                      <Field
                        component='input' name='heel'   type='radio'
                        value='4'/>
                      <label  className='radio-label'>5</label>
                      <Field
                        component='input' name='heel'  type='radio'
                        value='5'/>
                    </Form.Group>
                  </Grid.Column>
                </Grid>

              </Segment>
              <Segment className='seg-class'>
                <Header as='h4'> Ratings Key </Header>
                <p>1= poor &nbsp;&nbsp; 2= Below Average&nbsp;&nbsp; 3= Average&nbsp;&nbsp; 4= Above Average&nbsp;
                  &nbsp; 5=Exceptionl&nbsp;&nbsp; 6= Off Leash</p>
              </Segment>

            </Form>

          </>
        )
        }

        {activeMenuItem === 'report' && (
          <>
            <Form.Group>
              <Button
                className='new-report'
                color='teal'
                content='New Report'
                onClick=''
                type='button'/>
            </Form.Group>
            <div className='search-table'>
              <Table
                duck={trainPackageDuck}
                onOptionClick=''
                onRowClick=''/>
            </div>

          </>

        )
        }

      </Grid.Column>
    </Grid>

  )}

export default compose(
  connect(() => {

  }),
  reduxForm({
    form: 'training-performance'

  })

)(TrainingPerformance)


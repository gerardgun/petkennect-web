import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextArea, Grid , Segment, Header ,Input ,Form, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import FormField from '@components/Common/FormField'

import './style.scss'
const TrainingPerformance =  () => {
  return (
    <div className='training-performance-form'>
      <Form onReset='' onSubmit=''>

        <Field component='input' name='id' type='hidden'/>
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
        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={TextArea}
            label='Training Comments'
            name='training_comments'/>
        </Form.Group>

        <Segment>
          <Header as='h3'>Training Commands</Header>
          <Grid>
            <Grid.Column className='radio-label-grid' >
              <Form.Group><label><b>Rating</b></label></Form.Group>

              <Form.Group>  <label>Sit</label></Form.Group>
              <Form.Group> <label>Activity</label></Form.Group>
              <Form.Group> <label>Down/Stay</label>  </Form.Group>
              <Form.Group>  <label>Sit in Motion</label></Form.Group>
              <Form.Group>  <label>Off</label></Form.Group>
              <Form.Group> <label>Loose Lead</label></Form.Group>
              <Form.Group> <label>place/Stay</label></Form.Group>
              <Form.Group>  <label>Come</label></Form.Group>
            </Grid.Column>
            <Grid.Column className='radio-field-grid'>
              <Form.Group>
                <label className='radio-label'><b>1</b></label>
                <label  className='radio-label'><b>2</b></label>
                <label  className='radio-label'><b>3</b></label>
                <label  className='radio-label'><b>4</b></label>
                <label  className='radio-label'><b>5</b></label>
                <label  ><b>6</b></label>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'
                  component='input' name='sit' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='sit' type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='sit' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='sit' type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='sit' type='radio'
                  value='5'/>
                <Field

                  component='input' name='sit' type='radio'
                  value='6'/>
              </Form.Group>
              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='activity' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input'name='activity' type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='activity' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='activity'type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='activity'type='radio'
                  value='5'/>
                <Field
                  component='input' name='activity' type='radio'
                  value='6'/>
              </Form.Group>
              <Form.Group>

                <Field
                  className='radio-field'
                  component='input' name='down_stay' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input'name='down_stay'  type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='down_stay' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='down_stay'  type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='down_stay'  type='radio'
                  value='5'/>
                <Field
                  component='input' name='down_stay' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='Sit in Motion' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input'name='Sit in Motion' type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='Sit in Motion' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='Sit in Motion'type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='Sit in Motion'type='radio'
                  value='5'/>
                <Field
                  component='input' name='Sit in Motion' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='Off' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input'name='Off'type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='Off' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='Off'type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='Off' type='radio'
                  value='5'/>
                <Field
                  component='input' name='Off' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='Loose_Lead' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input'name='Loose_Lead'type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='Loose_Lead' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='Loose_Lead'type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='Loose_Lead' type='radio'
                  value='5'/>
                <Field
                  component='input' name='Loose_Lead' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='place_stay' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='place_stay' type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='place_stay' type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='place_stay' type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='place_stay' type='radio'
                  value='5'/>
                <Field
                  className='radio-field'
                  component='input' name='place_stay' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='come' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='come'  type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='come'  type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='come'  type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='come'  type='radio'
                  value='5'/>

                <Field
                  className='radio-field'
                  component='input' name='come' type='radio'
                  value='6'/>
              </Form.Group>

            </Grid.Column>
            <Grid.Column className='radio-label-grid'  >
              <Form.Group><label ><b>Rating</b></label></Form.Group>
              <Form.Group>  <label>Down</label></Form.Group>
              <Form.Group> <label>Sit/Stay</label></Form.Group>
              <Form.Group> <label>Touch</label>  </Form.Group>
              <Form.Group>  <label>Down in Motion</label></Form.Group>
              <Form.Group>  <label>Place</label></Form.Group>
              <Form.Group> <label>Quiet</label></Form.Group>
              <Form.Group> <label>Heel</label></Form.Group>

            </Grid.Column>
            <Grid.Column className='radio-field-grid' >

              <Form.Group>
                <label className='radio-label'><b>1</b></label>
                <label className='radio-label'><b>2</b></label>
                <label  className='radio-label'><b>3</b></label>
                <label  className='radio-label'><b>4</b></label>
                <label  className='radio-label'><b>5</b></label>
                <label ><b>6</b></label>
              </Form.Group>

              <Form.Group>

                <Field

                  className='radio-field'
                  component='input' name='down' type='radio'
                  value='1'/>

                <Field

                  className='radio-field'
                  component='input' name='down'  type='radio'
                  value='2'/>

                <Field

                  className='radio-field'
                  component='input' name='down'  type='radio'
                  value='3'/>

                <Field

                  className='radio-field'
                  component='input'  name='down'  type='radio'
                  value='4'/>

                <Field

                  className='radio-field'
                  component='input' name='down'  type='radio'
                  value='5'/>
                <Field

                  component='input' name='down' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='sit_stay' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='sit_stay'   type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='sit_stay'  type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='sit_stay'   type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='sit_stay'   type='radio'
                  value='5'/>

                <Field

                  component='input' name='sit_stay' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='touch' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='touch'   type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='touch'   type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='touch'    type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='touch'   type='radio'
                  value='5'/>
                <Field

                  component='input' name='touch' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='down_in_motion' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='down_in_motion'  type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='down_in_motion'  type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='down_in_motion'   type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='down_in_motion'   type='radio'
                  value='5'/>
                <Field

                  component='input' name='down_in_motion' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='palce' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='palce'  type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='palce'  type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='palce'   type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='palce'  type='radio'
                  value='5'/>

                <Field

                  component='input' name='place' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='quiet' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='quiet'  type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='quiet'  type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='quiet'   type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='quiet'  type='radio'
                  value='5'/>
                <Field

                  component='input' name='quiet' type='radio'
                  value='6'/>
              </Form.Group>

              <Form.Group>

                <Field
                  className='radio-field'

                  component='input' name='heel' type='radio'
                  value='1'/>

                <Field
                  className='radio-field'
                  component='input' name='heel'  type='radio'
                  value='2'/>

                <Field
                  className='radio-field'
                  component='input' name='heel'  type='radio'
                  value='3'/>

                <Field
                  className='radio-field'
                  component='input' name='heel'   type='radio'
                  value='4'/>

                <Field
                  className='radio-field'
                  component='input' name='heel'  type='radio'
                  value='5'/>
                <Field

                  component='input' name='heel' type='radio'
                  value='6'/>
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
    </div>
  )}

export default compose(
  connect(() => {

  }),
  reduxForm({
    form: 'training-performance'

  })

)(TrainingPerformance)


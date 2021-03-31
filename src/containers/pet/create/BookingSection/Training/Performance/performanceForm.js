/* eslint-disable react/jsx-key */
import React, { useEffect } from 'react'
import { Field, reduxForm } from 'redux-form'
import { TextArea, Grid , Segment, Header ,Input ,Form, Select } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import trainingCommandDuck from '@reducers/training-command'
import trainingCommandDetailDuck from '@reducers/training-command/detail'
import FormField from '@components/Common/FormField'

import './style.scss'

const TrainingPerformance =  ({ trainingCommand, ...props }) => {
  useEffect(() => {
    props.getTrainingCommand()
  }, [])

  let leftGridData = []
  let rightGridData = []

  trainingCommand.items.length > 0 && trainingCommand.items.map((item,index)=>{
    if(index % 2 === 0)
      leftGridData.push(item.name)
    else
      rightGridData.push(item.name)
  })

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
          <Header as='h3' className='ph0'>Training Commands</Header>
          <Grid>

            <Grid.Column className='radio-label-grid' >
              <Form.Group><label><b>Rating</b></label></Form.Group>
              {
                leftGridData.length > 0 && leftGridData.map(item=>{
                  return <Form.Group >  <label>{item}</label></Form.Group>
                })

              }

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
              {
                leftGridData.length > 0 && leftGridData.map(item=>{
                  return (<Form.Group>
                    <Field
                      className='radio-field'
                      component='input' name={item} type='radio'
                      value='1'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='2'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='3'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='4'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='5'/>
                    <Field

                      component='input' name={item}  type='radio'
                      value='6'/>
                  </Form.Group>)
                })

              }

            </Grid.Column>
            <Grid.Column className='radio-label-grid'  >
              <Form.Group><label><b>Rating</b></label></Form.Group>
              {
                rightGridData.length > 0 && rightGridData.map(item=>{
                  return <Form.Group >  <label>{item}</label></Form.Group>
                })

              }

            </Grid.Column>
            <Grid.Column className='radio-field-grid' >

              <Form.Group>
                <label className='radio-label'><b>1</b></label>
                <label  className='radio-label'><b>2</b></label>
                <label  className='radio-label'><b>3</b></label>
                <label  className='radio-label'><b>4</b></label>
                <label  className='radio-label'><b>5</b></label>
                <label  ><b>6</b></label>
              </Form.Group>

              {
                rightGridData.length > 0 && rightGridData.map(item=>{
                  return (<Form.Group>
                    <Field
                      className='radio-field'
                      component='input' name={item} type='radio'
                      value='1'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='2'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='3'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='4'/>

                    <Field
                      className='radio-field'
                      component='input' name={item}  type='radio'
                      value='5'/>
                    <Field

                      component='input' name={item}  type='radio'
                      value='6'/>
                  </Form.Group>)
                })

              }

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
  connect(
    (state) => ({
      trainingCommand      : trainingCommandDuck.selectors.list(state),
      trainingCommandDetail: trainingCommandDetailDuck.selectors.detail(state)

    }),
    {
      getTrainingCommand: trainingCommandDuck.creators.get,
      setItem           : trainingCommandDetailDuck.creators.setItem
    }
  ),
  reduxForm({
    form: 'training-performance'

  })

)(TrainingPerformance)


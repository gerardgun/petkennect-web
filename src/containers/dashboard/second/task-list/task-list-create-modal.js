/* eslint-disable react/jsx-handler-names */
import React,{ useMemo } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Grid, Header, Button, Form, Input, TextArea, Select, Modal } from 'semantic-ui-react'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import InputColor from '@components/Common/InputColor'
import dashboardTaskDetailDuck from '@reducers/dashboard/tasklist/detail'
import '../../dashboard.scss'

const TaskCreateForm = (props)=>{
  const {
    taskDetail,
    error,
    reset,   // redux form
    handleSubmit
  } = props
  const getIsOpened = (mode) => mode === 'CREATE'

  const _handleClose = () => {
    props.reset()
    props.resetItem()
  }

  const isOpened = useMemo(() => getIsOpened(taskDetail.mode), [
    taskDetail.mode
  ])

  const _handleSubmit = () => {
    //
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={isOpened}>
      <div className='task-create-h-div'>
        <Header
          as='h3' className='mb0' content='Add New Task'/>
      </div>
      <Modal.Content>
        <Form id='task-create-redux-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Grid>
            <Grid.Column  computer={16} style={{ marginTop: '-15px' }}>
              <Field
                component={FormField}
                control={Input}
                label='Task Name'
                name='task'
                placeholder='Enter Task'
                required={true}/>
              <Field
                component={FormField}
                control={TextArea}
                label='Description'
                name='task_desc'
                placeholder='Enter...'/>

              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Assigned To'
                  name='assigned_to'
                  options={[ { value: 'emp1', text: 'Employee 1' } ]}
                  placeholder='Assigned to'
                  required={true}/>
                {/* <Field
                  component={FormField}
                  control={Select}
                  label='Color Code'
                  name='color_code'
                  options={[ { value: 'red',text: 'REd' },{ value: 'blue',text: 'Blue' } ]}
                  placeholder='Select Color'/> */}
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={InputColor}
                  label='Color Code'
                  name='color_code'/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Due Date'
                  name='due_date'
                  required={true}
                  type='date'/>
              </Form.Group>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Status'
                  name='status'
                  options={[ { value: 'pending',text: 'Pending' } ]}
                  placeholder='Status'
                  required={true}
                  type='date'/>
                <Field
                  component={FormField}
                  control={Input}
                  label='Tags'
                  name='tags'
                  placeholder='Tags/team members'
                  required={true}/>
                <Form.Field className='div-add-button'>
                  <Button
                    basic color='blue' icon='add'
                    type='button'/>
                </Form.Field>
              </Form.Group>
              {
                error && (
                  <Form.Group widths='equal'>
                    <Form.Field>
                      <FormError message={error}/>
                    </Form.Field>
                  </Form.Group>
                )
              }
            </Grid.Column>
            <Grid.Column className='pt0' computer={16} textAlign='right'>
              <Button
                content='Cancel'
                onClick={_handleClose}
                type='button'/>
              <Button color='teal' content='Save'/>
            </Grid.Column>
          </Grid>
        </Form>

      </Modal.Content>
    </Modal>
  )
}

export default  compose(
  connect(
    state => {
      const  taskDetail = dashboardTaskDetailDuck.selectors.detail(state)

      return {
        taskDetail
      }
    },
    {
      resetItem: dashboardTaskDetailDuck.creators.resetItem
    }),
  reduxForm({
    form              : 'task-create-redux-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(TaskCreateForm)

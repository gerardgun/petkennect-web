/* eslint-disable react/jsx-handler-names */
import React,{ useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import { Grid, Header, Button, Form,Select, Modal, Dropdown } from 'semantic-ui-react'
import Table from '@components/Table'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import dashboardExpressListConfig from '@lib/constants/list-configs/dashboard/express-check-in'
import dashboardExpressDuck from '@reducers/dashboard/express-check-in'
import dashboardExpressDetailDuck from '@reducers/dashboard/express-check-in/detail'
import './styles.scss'

const TaskCreateForm = (props)=>{
  const {
    error,
    selectedPets,
    reset,   // redux form
    handleSubmit
  } = props

  useEffect(()=>{
    props.getData()
  },[])

  useEffect(()=>{
    props.getData({ search: selectedPets })
  },[ selectedPets ])

  const _handleClose = () => {
    props.reset()
    props.onModalChange('close')
  }
  const _handleSubmit = () => {
    //
  }

  return (
    <Modal
      className='form-modal'
      onClose={_handleClose}
      open={props.modalOpen}>
      <div className='express-h-div'>
        <Header
          as='h3' className='mb0' content='Express Check In'/>
      </div>
      <Modal.Content>
        <Form id='express-check-in-redux-form' onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>
          <Grid>
            <Grid.Column  computer={16} style={{ marginTop: '-15px' }}>
              <Field
                component={FormField}
                control={Select}
                label='Select Service Type'
                name='serive_name_check'
                options={[
                  {
                    key: 1, value: 'boarding', text: 'Boarding'
                  },{
                    key: 2, value: 'dayService', text: 'Day Service'
                  },{
                    key: 3, value: 'training', text: 'Training'
                  } ]}
                placeholder='Select Service'/>
              <Field
                component={FormField}
                control={Dropdown}
                fluid
                icon='search'
                label='Select Pet'
                multiple
                name='pets'
                options={[ { key: 1, text: 'Boots', value: 1 },
                  { key: 1, text: 'Loki', value: 2 },
                  { key: 1, text: 'Tommy', value: 3 },
                  { key: 1, text: 'Tizen', value: 4 } ,
                  { key: 1, text: 'Goldy', value: 5 },
                  { key: 1, text: 'Pemintay', value: 6 } ]}
                placeholder='Enter Pet'
                search
                selectOnBlur={false}
                selection/>
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
            {
              selectedPets && selectedPets.length != 0
              && <Grid.Column computer={16}>
                <Table
                  config={dashboardExpressListConfig} duck={dashboardExpressDuck}/>
              </Grid.Column>
            }

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
      const  expressCheckInDetaill = dashboardExpressDetailDuck.selectors.detail(state)
      const selectedPets = formValueSelector('express-check-in-redux-form')(state,'pets')

      return {
        expressCheckInDetaill,
        selectedPets
      }
    },
    {
      getData: dashboardExpressDuck.creators.get
    }),
  reduxForm({
    form              : 'express-check-in-redux-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(TaskCreateForm)

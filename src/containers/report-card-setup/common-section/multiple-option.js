import React, { useEffect } from 'react'
import { Field } from 'redux-form'
import { Button, Grid, Header, Form, Input } from 'semantic-ui-react'
import loadable from '@loadable/component'
import FormField from '@components/Common/FormField'
import '../styles.scss'
const FormError = loadable(() => import('@components/Common/FormError'))

const MultipleOption = ({ fields, meta: { error, submitFailed } })=>{
  useEffect(()=>{
    fields.push({ ...optionInitialState })
  },[])

  const optionInitialState = {
    option: ''
  }

  const  _handleAddBtnClick = () =>{
    fields.push({ ...optionInitialState })
  }

  const _handleDeleteAnswerBtnClick = (e, { index }) =>{
    fields.remove(index)
  }

  return (
    <>
      {
        fields.map((item, index) => {
          return (
            <>
              <Grid key={index}  style={{ paddingLeft: '1.3rem' }}>
                <Grid.Column
                  className='pr0' computer={8} mobile={16}
                  tablet={16}>
                  <div className='flex align-center justify-between'>
                    <Header as='h4' className='mb0' content={`Option Value ${index + 1}`}/>
                    <div className='flex align-center'>
                      <Field
                        className='c-option'
                        component={FormField}
                        control={Input}
                        name={`${item}.option`}
                        placeholder='Enter Value'/>
                      {
                        index == 0
                          ? <Button
                            basic
                            className='m0' color='teal' icon='add'
                            onClick={_handleAddBtnClick}/>
                          : <Button
                            basic
                            className='m0'
                            color='red' data-index={index}
                            icon='trash alternate outline'
                            index={`${index}`}
                            onClick={_handleDeleteAnswerBtnClick}/>

                      }

                    </div>
                  </div>
                </Grid.Column>
              </Grid>
            </>
          ) })
      }
      {
        submitFailed && error && (
          <Form.Group widths='equal'>
            <Form.Field>
              <FormError message={error}/>
            </Form.Field>
          </Form.Group>
        )
      }

    </>
  )
}

export default MultipleOption

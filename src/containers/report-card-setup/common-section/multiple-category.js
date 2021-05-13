import React, { useEffect } from 'react'
import { Field, FieldArray } from 'redux-form'
import { Grid, Header, Form,Checkbox,  Input, Select, TextArea, Button } from 'semantic-ui-react'
import loadable from '@loadable/component'
import FormField from '@components/Common/FormField'
import '../styles.scss'
const FormError = loadable(() => import('@components/Common/FormError'))
const MultipleOption = loadable(() => import('./multiple-option'))

const MultipleCategory = ({ fields, meta: { error, submitFailed }, categoryData, max_char })=>{
  useEffect(()=>{
    fields.push({ ...optionInitialState })
  },[])
  const optionInitialState = {
    header            : '',
    header_fieldChoice: '',
    text_box_value    : '',
    optionList        : []
  }

  const  _handleAddBtnClick = () =>{
    fields.push({ ...optionInitialState })
  }

  const _handleDeleteBtnClick = (e, { index }) =>{
    fields.remove(index)
  }

  return (
    <>

      {
        fields.map((item, index) => {
          return (<>
            <Grid style={{ paddingLeft: '1.3rem' }}>
              <Grid.Row>
                <Grid.Column className='pr0' computer={8}>
                  <Header
                    as='h4' color='teal' content={max_char != undefined ? `Category ${index + 1} Header ${max_char}` : `Category ${index + 1} Header`}
                    style={{ marginBottom: '.5rem' }}/>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      name={`${item}.header`}
                      placeholder='Enter Header'/>
                  </Form.Group>
                </Grid.Column>
                <Grid.Column className='add-header' computer={8}>
                  {
                    index === 0 ? <Button
                      basic
                      className='mt6rm w180'
                      color='teal'
                      content='Add Category'
                      icon='add'
                      onClick={_handleAddBtnClick}/>

                      :                     <Button
                        basic
                        className='mt6rm w180'
                        color='red'
                        content='Delete Category'
                        data-index={index}
                        icon='trash alternate outline'
                        index={`${index}`}
                        onClick={_handleDeleteBtnClick}/>
                  }

                  <div className='flex align-center justify-end mt6rm'>
                    <Header
                      as='h4' className='mb0' content='Hide:'
                      style={{ marginRight: '40px' }}/>
                    {/* <Checkbox toggle/> */}
                    <div  className='hide-ph-toggle'>
                      <Field
                        component={FormField}
                        control={Checkbox}
                        format={Boolean}
                        name='category_hide'
                        toggle
                        type='checkbox'/>
                    </div>
                  </div>

                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Grid className='mt0' style={{ paddingLeft: '1.2rem' }}>
              <Grid.Column
                className='pt0 pr0' computer={8} mobile={16}
                tablet={16}>
                <div className='flex align-center justify-between'>
                  <Header as='h4' className='mb0' content='Select Field Type'/>
                  <Field
                    component={FormField}
                    control={Select}
                    name={`${item}.header_fieldChoice`}
                    options={[ { key: 1 , value: 'dropdown', text: 'Dropdown' },
                      { key: 2 , value: 'textbox', text: 'Free Text' },
                      { key: 3, value: 'checkbox', text: 'Select all that apply' }
                    ]}
                    placeholder='Field Type'
                    style={{ width: '240px' }}/>
                </div>
              </Grid.Column>
            </Grid>
            {
              categoryData && (categoryData[index].header_fieldChoice === 'dropdown' || categoryData[index].header_fieldChoice === 'checkbox')
              && <FieldArray component={MultipleOption}  name={`${item}.optionList`}/>

            }

            {
              categoryData && categoryData[index].header_fieldChoice ===  'textbox' && <Grid style={{ paddingLeft: '1.3rem' }}>
                <Grid.Column className='pr0' computer={8}>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={TextArea}
                      name={`${item}.text_box_value`}
                      placeholder='Please enter default value if any.'/>
                  </Form.Group>
                </Grid.Column>
              </Grid>
            }
          </>)
        })
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

export default MultipleCategory

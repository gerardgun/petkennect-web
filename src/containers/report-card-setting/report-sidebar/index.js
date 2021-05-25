import React from 'react'
import { Field } from 'redux-form'
import { Grid, Image, Header, Select, TextArea } from 'semantic-ui-react'
import FormField from '@components/Common/FormField'
// import { defaultImageUrl } from '@lib/constants'
import CheckboxGroup from '@components/Common/CheckboxGroup'
import '../styles.scss'

const Sidebar = (props) => {
  let sidebarCategory = [
    {
      header     : 'Side Header 1', serviceType: 'dropdown',
      values     : [ { id: 1, option: 'Option 1' }, { id: 2, option: 'Option 2' }, { id: 3, option: 'Option 3' }, { id: 4, option: 'Option 4' } ]
    },
    {
      header     : 'Side Header 2', serviceType: 'checkbox',
      values     : [ { text: 'Option 1', value: 'option1' }, { text: 'Option 2', value: 'option2' }, { text: 'Option 3', value: 'option3' }, { text: 'Option 4', value: 'option4' } ]
    },
    {
      header: 'Side Header 3', serviceType: 'freeText'
    }
  ]

  const sidebarCategoryMargin = props.imageSlider === true ? '100px' : '350px'

  return (
    <>
      <Grid
        className='grid-height sidebar-grid-display ml0 report-font'
        style={{ backgroundColor: props.themeColor }}>
        <Grid>
          <Grid.Column width={16}>
            <div className='div-image-report'>
              <Image
                circular className='mt20' height='175px'
                src='/images/dogboarding.png'/>
            </div>

          </Grid.Column>
        </Grid>
        <Grid className='sidebar-grid-display sidebar-grid' style={{ marginTop: sidebarCategoryMargin }}>
          {
            sidebarCategory.map((item,index) => {
              return (
                <Grid.Column key={index} width={16}>
                  {item.serviceType === 'freeText' && <Grid.Column width={16}>
                    <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                    <Field
                      className='text-area-border'
                      component={FormField}
                      control={TextArea}
                      name={index}
                      placeholder='Enter Text'
                      style={{ minWidth: '12.5em' }}/>
                  </Grid.Column>}
                  {item.serviceType === 'dropdown' && <Grid.Column className='sidebar-dropdown' width={16}>
                    <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                    <Field
                      component={FormField}
                      control={Select}
                      name={item.id}
                      options={item.values.map(item=>({
                        key  : item.id,
                        value: item.option,
                        text : `${item.option}`
                      }))}
                      placeholder='Select'
                      selectOnBlur={false}/>
                  </Grid.Column>}
                  {item.serviceType === 'checkbox' && <Grid.Column width={16}>
                    <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                    {
                      // item.values.map((item,index) => {
                      //   return (
                      //     <Grid.Column key={index} width={16}>
                      //       <Field
                      //         className='checkbox-margin'
                      //         component={FormField}
                      //         control={Checkbox}
                      //         label={item.option}
                      //         name={item.id}
                      //         type='checkbox'/>
                      //     </Grid.Column>
                      <Field
                        component={FormField}
                        control={CheckboxGroup}
                        inline={false}
                        key={index}
                        name={item.header}
                        options={item.values}/>
                      //   )
                      // }
                      // )

                    }
                  </Grid.Column>}
                </Grid.Column>
              )})
          }
        </Grid>
      </Grid>

    </>

  )
}

export default (Sidebar)

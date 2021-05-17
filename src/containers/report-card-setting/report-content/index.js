import React from 'react'
import { Field } from 'redux-form'
import { Grid, Icon, Label, Image, Header, Select, TextArea, Checkbox } from 'semantic-ui-react'
import FormField from '@components/Common/FormField'
import ImageSlider from './image-slider'
import '../styles.scss'

const Content = (props) => {
  let contentCategory = [
    {
      header     : 'Meals', serviceType: 'dropdown',
      values     : [ { id: 1, name: 'Hungry' }, { id: 2, name: 'Ate All' }, { id: 3, name: 'Selective at First' }, { id: 4, name: 'Required Wet Food' } ]
    },
    {
      header     : 'Play Times/Camp', serviceType: 'checkbox',
      values     : [ { id: 1, name: 'Timid' }, { id: 2, name: 'Laid-Back' }, { id: 3, name: 'Energetic' }, { id: 4, name: 'Active' }, { id: 5, name: 'Fetch' }, { id: 6, name: 'Pool' } ]
    },
    {
      header     : 'My Mood', serviceType: 'checkbox',
      values     : [ { id: 1, name: 'Shy at First' }, { id: 2, name: 'Calm most of the Time' }, { id: 3, name: 'Nervous' }, { id: 4, name: 'Outgoing and Active' } ]
    },
    {
      header     : 'Health', serviceType: 'dropdown',
      values     : [ { id: 1, name: 'Fur Mats' }, { id: 2, name: 'Ear Infection' }, { id: 3, name: 'Scratches' }, { id: 4, name: 'Skin Irritation' } ]
    },
    {
      header: 'Staff Comments', serviceType: 'freeText'
    }
  ]

  const contentCategoryMargin = props.imageSlider === true ? '80px' : '0px'

  return (
    <Grid className='report-content padding-content grid-height sidebar-grid-display'>
      <Grid className='grid-height-body report-font sidebar-grid-display'>
        <Grid className='mb12'>
          <Grid.Column className='content-align content-header' style={{ color: props.textColor }} width={16}>
            <span style={{ fontSize: '40px' }}><b>LALA GLOVER</b></span>
            <span style={{ fontSize: '18px', marginTop: '12px' }}><b>Day Camp Report Card</b></span>
            <span style={{ fontSize: '18px', marginTop: '10px' }}><b>04/20/2021</b></span>
          </Grid.Column>
        </Grid>
        {
          props.imageSlider === false && (
            <Grid.Column width={16}>
              <ImageSlider textColor={props.textColor}/>
            </Grid.Column >
          )
        }
        <Grid.Column  style={{ marginTop: contentCategoryMargin }} width={16}>
          {
            contentCategory.map((item,index) => {
              return (
                <Grid className='pt0' key={index}>
                  <Grid.Column className='icon-line-div pt0' width={2}>
                    <Label circular style={{ backgroundColor: props.themeColor, height: '40px', width: '40px' }}>
                      <Icon className='mt8' name='paw circle' style={{ color: props.textColor, fontSize: '30px' }} ></Icon>
                    </Label>
                    {
                      contentCategory.length - 1 !== index && (
                        <div className='vertical-div-line'>
                        </div>
                      )
                    }
                  </Grid.Column>
                  <Grid.Column  className='pt12' width={14}>
                    {item.serviceType === 'freeText' && <Grid.Column width={16}>
                      <Header as='h4' className='mb8' style={{ color: props.textColor }}>{item.header}</Header>
                      <Field
                        className='text-area-border'
                        component={FormField}
                        control={TextArea}
                        name={`${item}.textbox`}
                        placeholder='Enter Text'
                        style={{ minWidth: '34em', minHeight: '5em' }}/>
                    </Grid.Column>}
                    {item.serviceType === 'dropdown' && <Grid.Column className='mb0' width={16}>
                      <Header as='h4' className='mb4' style={{ color: props.textColor }}>{item.header}</Header>
                      <Field
                        component={FormField}
                        control={Select}
                        name={`${item.header}.dropdown`}
                        options={item.values.map(item=>({
                          key  : item.id,
                          value: item.name,
                          text : `${item.name}`
                        }))}
                        placeholder='Select'
                        selectOnBlur={false}/>
                    </Grid.Column>}
                    {item.serviceType === 'checkbox' && <Grid.Column width={16}>
                      <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                      <Grid width={16}>
                        {
                          item.values.map((item1,_index) => {
                            return (
                              <Grid.Column className='content-checkbox' key={_index} width={8}>
                                <Field
                                  className='checkbox-margin'
                                  component={FormField}
                                  control={Checkbox}
                                  label={item1.name}
                                  name={`${item1.name}.checkbox`}
                                  type='checkbox'/>
                              </Grid.Column>
                            )
                          })
                        }
                      </Grid>
                    </Grid.Column>}
                  </Grid.Column>
                </Grid>
              )
            })
          }
        </Grid.Column>
      </Grid>

      <Grid className='grid-height-footer'>
        <Grid.Column className='content-align p20 mb20' width={16}>
          <Image
            className='logo-img footer-image' height='60px' src='/images/logo.png'
            width='80px'/>
        </Grid.Column>
      </Grid>
    </Grid>
  )
}

export default (Content)

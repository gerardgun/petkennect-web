import React from 'react'
import { Grid, Icon, Label, Image, Header } from 'semantic-ui-react'
import ImageSlider from './image-slider'
import './../styles.scss'

const Content = (props) => {
  let contentCategory = [
    {
      header     : 'Meals', serviceType: 'dropdown',
      values     : [ { id: 1, name: 'Hungry' } ]
    },
    {
      header     : 'Play Times/Camp', serviceType: 'checkbox',
      values     : [ { id: 1, name: 'Timid' }, { id: 2, name: 'Laid-Back' }, { id: 3, name: 'Energetic' } ]
    },
    {
      header     : 'My Mood', serviceType: 'checkbox',
      values     : [ { id: 1, name: 'Shy at First' }, { id: 2, name: 'Calm most of the Time' } ]
    },
    {
      header     : 'Health', serviceType: 'dropdown',
      values     : [ { id: 1, name: 'Fur Mats' } ]
    },
    {
      header: 'Staff Comments', serviceType: 'freeText'
    }
  ]

  const contentCategoryMargin = props.imageSlider === true ? '50px' : '0px'

  return (
    <Grid className='report-content padding-content modal-grid-height sidebar-grid-display'>
      <Grid className='modal-grid-height-body report-font sidebar-grid-display'>
        <Grid className='mb12'>
          <Grid.Column className='content-align content-header' style={{ color: props.textColor }} width={16}>
            <span style={{ fontSize: '40px' }}><b>LALA GLOVER</b></span>
            <span style={{ fontSize: '18px' }}><b>{props.reportName} Report Card</b></span>
            <span style={{ fontSize: '18px', marginTop: '4px' }}><b>04/20/2021</b></span>
          </Grid.Column>
        </Grid>
        {
          props.imageSlider === false && (
            <Grid.Column width={16}>
              <ImageSlider textColor={props.textColor}/>
            </Grid.Column >
          )
        }
        <Grid.Column style={{ marginTop: contentCategoryMargin }} width={16}>
          {
            contentCategory.map((item,index) => {
              return (
                <Grid key={index}>
                  <Grid.Column className='icon-line-div pt4' width={2}>
                    <Label circular style={{ backgroundColor: props.themeColor, height: '40px', width: '40px' }}>
                      <Icon className='mt8' name='paw circle' style={{ color: props.textColor, fontSize: '30px' }} ></Icon>
                    </Label>
                  </Grid.Column>
                  <Grid.Column  className='pt16' width={14}>
                    {item.serviceType === 'freeText' && <Grid.Column className='text-align-justify' width={16}>
                      <Header as='h4' className='mb8' style={{ color: props.textColor }}>{item.header}</Header>
                      <span>Text area</span>
                    </Grid.Column>}
                    {item.serviceType === 'dropdown' && <Grid.Column width={16}>
                      <Header as='h4' className='mb4' style={{ color: props.textColor }}>{item.header}</Header>
                      {
                        item.values.map((item,index) => {
                          return (
                            <Grid.Column className='content-checkbox' key={index} width={16}>
                              {item.name}
                            </Grid.Column>
                          )
                        })
                      }
                    </Grid.Column>}
                    {item.serviceType === 'checkbox' && <Grid.Column className='mb8' width={16}>
                      <Header as='h4' className='mb20' style={{ color: props.textColor }}>{item.header}</Header>
                      <Grid width={16}>
                        {
                          item.values.map((item1,index) => {
                            return (
                              <Grid.Column className='content-checkbox' key={index} width={16}>
                                {
                                  item.values && item.values.length > 1 && (<Icon name='genderless' style={{ color: props.textColor, fontSize: '13px', width: '1rem' }}></Icon>
                                  )}
                                {item1.name}
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

      <Grid className='modal-grid-height-footer'>
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

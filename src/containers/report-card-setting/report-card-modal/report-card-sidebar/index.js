import React from 'react'
import { Grid, Image, Header, Icon } from 'semantic-ui-react'
// import { defaultImageUrl } from '@lib/constants'
import '../styles.scss'

const Sidebar = (props) => {
  let sidebarCategory = [
    {
      header     : 'Side Header 1', serviceType: 'dropdown',
      values     : [ { id: 1, option: 'Option 1' } ]
    },
    {
      header     : 'Side Header 2', serviceType: 'checkbox',
      values     : [ { text: 'Option 1', value: 'option1' }, { text: 'Option 2', value: 'option1' } ]
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
            <Image
              circular className='mt20' height='175px'
              src='/images/dogboarding.png'/>
          </Grid.Column>
        </Grid>
        <Grid className='sidebar-grid-display' style={{ marginTop: sidebarCategoryMargin }}>
          {
            sidebarCategory.map((item,index) => {
              return (
                <Grid.Column key={index} width={16}>
                  {item.serviceType === 'freeText' && <Grid.Column width={16}>
                    <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                    Text Area
                  </Grid.Column>}
                  {item.serviceType === 'dropdown' && <Grid.Column className='sidebar-dropdown' width={16}>
                    <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                    {
                      item.values.map((item,index) => {
                        return (
                          <Grid.Column key={index} width={16}>
                            {item.option}
                          </Grid.Column>
                        )
                      }
                      )

                    }
                  </Grid.Column>}
                  {item.serviceType === 'checkbox' && <Grid.Column width={16}>
                    <Header as='h4' className='mb12' style={{ color: props.textColor }}>{item.header}</Header>
                    {
                      item.values.map((item1,index) => {
                        return (
                          <Grid.Column key={index} width={16}>
                            {
                              item.values && item.values.length > 1 && (<Icon name='genderless' style={{ color: props.textColor, fontSize: '13px', width: '1rem' }}></Icon>
                              )}
                            {item1.text}
                          </Grid.Column>
                        )
                      }
                      )

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

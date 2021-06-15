import React,{ useState } from 'react'
import { Grid,Segment, Card, Header, Form, Select, Icon, Dropdown } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import FormField from '@components/Common/FormField'
import Layout from '@components/Common/Layout'
import Menu from '../menu'
import FolderStructure from  './folder-structure'
import HeaderLink from '../header-link'

import './styles.scss'
export const  formId = 'employee-document-redux-form'
const items = [
  { id        : 1,
    foldername: 'New Hire PaperWork',
    open      : false,
    children  : [ { id  : 1, file: 'Dakota Jhonsan Offer.pdf',
      meta: {
        date: '12/15/2017',
        by  : 'Daniel Jhon',
        size: '1.13MB'
      }, type: 'pdf', checked: false },{ id     : 2, file   : 'Dakota Jhonsan Offer.docx', type   : 'text', checked: false,  meta   : {
      date: '12/15/2017',
      by  : 'Daniel Jhon',
      size: '1.23KB'
    } },{ id     : 3, file   : 'Employeement Related.pdf', type   : 'pdf',checked: false,  meta   : {
      date: '12/15/2017',
      by  : 'Daniel Jhon',
      size: '1.13MB'
    } } ]

  },
  { id        : 2,
    foldername: 'Resumes and Applications',
    open      : false,
    children  : [ { id: 1, file: 'Dakota Jhonsan Offer.pdf', type: 'pdf', checked: false },
      { id: 2, file: 'Dakota Jhonsan Offer.docx', type: 'text', checked: false },{ id: 3, file: 'Employeement Related.pdf', type: 'pdf', checked: false } ]
  },
  { id        : 3,
    foldername: 'Signed Documents',
    open      : false,
    children  : []
  },
  { id        : 4,
    foldername: 'Tasklist Attachments',
    open      : false,
    children  : [ { id     : 1, file   : 'Dakota Jhonsan Offer.pdf', type   : 'excel', checked: false,   meta   : {
      date: '12/15/2017',
      by  : 'Daniel Jhon',
      size: '1.1KB'
    } } ]
  },
  { id        : 5,
    foldername: 'Tax Documents',
    open      : false,
    children  : []
  },
  { id        : 6,
    foldername: 'Training Files',
    open      : false,
    children  : [ { id: 1, file: 'Dakota Jhonsan Offer.pdf', type: 'pdf',checked: true },{ id: 2, file: 'Dakota Jhonsan Offer.docx', type: 'text', checked: true } ]
  }
]
const MyDocument = (props)=>{
  const { reset,error } = props
  const [ sidebarHidden, setSidebarHidden ] = useState()

  const _onHandleSideBar = (sidebar)=>{
    setSidebarHidden(sidebar)
  }

  const trigger = (
    <span>
      <Icon name='setting'/>
    </span>
  )

  const settingOptions = [
    { key: '1' , text: 'Settings Option 1' },
    { key: '2' , text: 'Settings Option 2' },
    { key: '3' , text: 'Settings Option 3' } ]

  return (
    <Layout sidebarHandle={_onHandleSideBar}>
      <Segment className='segment-dashboard-content' >
        <Form id={formId} reset={reset}>
          <Grid>
            <Grid.Column className='pb12 pt0 ' computer={16}>
              <HeaderLink sideBarHidden={sidebarHidden}/>
            </Grid.Column>
            <Grid.Column computer={3}>
              <Menu/>
            </Grid.Column>
            <Grid.Column computer={13}>
              <Card fluid style={{ height: '100%' }}>
                <div className='pv12' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
                  <Header as='h3' className='mb0 ml16' style={{ opacity: '0.9' }}>
                My Documents
                  </Header>
                </div>
                <div className='flex justify-end align-center mr32'>
                  <label className='mr4'>Sort By</label>
                  <div className='flex'>
                    <Field
                      className='mr16 mt17'
                      component={FormField}
                      control={Select}
                      options={[
                        {
                          key: 1, value: 'ascending', text: 'Name: A-Z'
                        },{
                          key: 2, value: 'descending', text: 'Name: Z-A'
                        } ]}/>
                    <Dropdown
                      className='setting-dropdown mt17' direction='left' options={settingOptions}
                      trigger={trigger}/></div>
                </div>
                <FolderStructure data={items}/>
              </Card>

            </Grid.Column>

          </Grid>
        </Form>
      </Segment>
    </Layout>
  )
}

export default reduxForm({
  form              : formId,
  destroyOnUnmount  : false,
  enableReinitialize: true

})(MyDocument)

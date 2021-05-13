/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Form, Divider, Segment } from 'semantic-ui-react'
import { reduxForm, formValueSelector } from 'redux-form'
import {  parseFormValues } from '@lib/utils/functions'
import DayServiceReportCardSetupDetailDuck from '@reducers/report-card-setup/day-service-report-card/detail'
import MainSectionCategory from '../common-section/main-section-category'
import Layout from '@components/Common/Layout'
import SideBarCategory from '../common-section/side-bar-category'
import MenuItem from '../common-section/menu'
import ReportMidSection from '../common-section/report-mid-section'
import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'
import CreateReportForm from '../common-section/create-report'
import '../styles.scss'

const GroomingReportSetUp = (props)=>{
  const {
    category,
    sideCategory,
    handleSubmit
    // redux-form
  } = props

  const _handleSubmit = values => {
    values = parseFormValues(values)
    console.log(values)
  }

  return (
    <>
      <Layout>

        <Segment className='segment-content' padded='very'>
          <MenuItem/>
          <Form  id='grooming-setup-redux-form' onSubmit={handleSubmit(_handleSubmit)} >
            <Grid style={{ paddingLeft: '1.1rem' }}>
              <Grid.Row>
                <Header
                  as='h3'  content='Report Cards Created'
                  style={{ marginRight: '10%', marginTop: '.5rem' }}/>
                <div style={{ width: '20%' }}>
                  <div className='flex align-center justify-between'>
                    <Header
                      as='h4' className='m0' color='blue'
                      content='Grooming'/>
                    <Button basic  color='teal' icon='edit outline'/>
                  </div>

                </div>
                <Grid.Column computer={5} floated='right'>
                  <Button
                    basic color='teal' content='Create Report Card'
                    floated='right'
                    icon='add'
                    onClick={()=>{props.setReportCard(null,'CREATE')}}/>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider className='mt12 mb30'/>
            <ReportMidSection
              duck={petImageDuck}
              duckDetail={petImageDetailDuck}
              imagePath='/images/hydrobath.png'
              reportName='Grooming'/>

            <Divider className='mt32 mb28'/>
            {/* <ReportCardForm/> */}

            <MainSectionCategory
              categoryData={category}/>
            <Divider className='mt32 mb28'/>
            <SideBarCategory
              categoryData={sideCategory}/>

            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  basic
                  className='w150'
                  color='teal'
                  content='Cancel'/>
                <Button
                  className='w150'
                  color='teal'
                  content='Save Changes'
                  form='grooming-setup-redux-form'
                  type='submit'/>
              </Form.Field>
            </Form.Group>
          </Form>
          <CreateReportForm detailDuck={DayServiceReportCardSetupDetailDuck}/>
        </Segment>
      </Layout>
    </>
  )
}

export default compose(

  connect(
    (state) => {
      const DayServiceReportCardSetupDetail = DayServiceReportCardSetupDetailDuck.selectors.detail(state)
      const category = formValueSelector('grooming-setup-redux-form')(state,'category')
      const sideCategory = formValueSelector('grooming-setup-redux-form')(state,'side_category')
      // const status  = formValueSelector('grooming-setup-redux-form')(state, 'option_list')

      return {
        DayServiceReportCardSetupDetail,
        category,
        sideCategory,
        initialValues: { service_report_name: 'Grooming' }

      }
    },
    {
      setPetImage  : petImageDetailDuck.creators.setItem,
      setReportCard: DayServiceReportCardSetupDetailDuck.creators.setItem
    }
  ),

  reduxForm({
    form              : 'grooming-setup-redux-form',
    enableReinitialize: true,
    destroyOnUnmount  : false
  })

)(GroomingReportSetUp)


import React  from 'react'
import { Field, reduxForm } from 'redux-form'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Select,Button, Popup, Grid, Header, Input, Form, Modal } from  'semantic-ui-react'
import FormField from '@components/Common/FormField'
import customReportDetailDuck from '@reducers/custom-report/detail'

import  ShowReport from  './showReport'
import { printFileURL } from '@lib/utils/functions'

const ReportForm = ({ reportDetail, ...props }) => {
  const { mode } = reportDetail

  const _handleClose = () => {
    props.resetItem()
  }

  const opened = [ 'CREATE' ].includes(mode)

  const _handleRowOptionClick = e => {
    const option = e.currentTarget.dataset.optionName
    e.stopPropagation()
    if(option === 'view_pdf')
      props.setItem(null, 'READ')
    else if(option === 'print_pdf')
      printFileURL('https://petkennect-collection.s3.us-east-2.amazonaws.com/Feeney%2C%20Bahringer%20and%20Runolfsdottir-2020-10-07%2014%3A55%3A58.643471.pdf')
    else if(option === 'download_pdf')
      window.open('https://petkennect-collection.s3.us-east-2.amazonaws.com/WebsiteEdits_Deanna_9-21-20.pdf')
    else if(option === 'download_excel')
      window.open('https://petkennect-collection.s3.us-east-2.amazonaws.com/WebsiteEdits_Deanna_9-21-20.xlsx')
    else if(option === 'send_document')
      props.setItem({ id: 1, filename: 'file anme' }, 'SEND')
  }

  return (
    <>
      <Modal
        className='form-modal'
        onClose={_handleClose}
        open={opened}
        size='small'>
        <Modal.Content>
          {/* eslint-disable-next-line react/jsx-handler-names*/}
          <Form onReset='' onSubmit=''>
            <Header as='h2' className='segment-content-header'>
            View Report
            </Header>

            <Grid columns={1}>

              <Grid.Column
                className='ui-grid-align'
                computer={16} mobile={16} tablet={16}>

                <Form.Group className='icon-container' style={{ 'float': 'right', marginRight: '0rem' }} widths='equal'>
                  <Popup
                    content='View Report' inverted  position='bottom center'
                    trigger={
                      <Button
                        basic
                        className='report-icons'
                        color='teal'
                        content=''
                        data-option-name='view_pdf' icon='eye' onClick={_handleRowOptionClick}/>
                    }/>
                  <Popup
                    content='Print PDF' inverted  position='bottom center'
                    trigger={
                      <Button
                        basic
                        className='report-icons'
                        color='teal'
                        content=''
                        data-option-name='print_pdf' icon='print' onClick={_handleRowOptionClick}/>
                    }/>
                  <Popup
                    content='Download PDF' inverted  position='bottom center'
                    trigger={
                      <Button
                        basic
                        className='report-icons'
                        color='teal'
                        content=''
                        data-option-name='download_pdf' icon='download' onClick={_handleRowOptionClick}/>
                    }/>
                  <Popup
                    content='Download Excel' inverted  position='bottom center'
                    trigger={
                      <Button
                        basic
                        className='report-icons'
                        color='teal'
                        content=''
                        data-option-name='download_excel' icon='file' onClick={_handleRowOptionClick}/>
                    }/>
                  <Popup
                    content='Email PDF' inverted  position='bottom center'
                    trigger={
                      <Button
                        basic
                        color='teal'
                        content=''
                        data-option-name='send_document' icon='envelope outline' onClick={_handleRowOptionClick}/>
                    }/>
                </Form.Group>

              </Grid.Column>
            </Grid>
            <Field component='input' name='id' type='hidden'/>

            <Form.Group className='report_field_width' widths='2'>
              <Field
                autoFocus
                component={FormField}
                control={Input}
                label='From Date'
                name='from_date'
                required
                type='date'/>
              <Field
                autoFocus
                className='field_right'
                component={FormField}
                control={Input}
                label='To Date'
                name='to_date'
                required
                type='date'/>
            </Form.Group>

            <Form.Group className='report_field_width' style={{ marginBottom: '0px' }} widths='equal'>

              <Field
                component={FormField}
                control={Select}
                label='Select Location'
                multiple={true}
                name='location'
                options={[
                  { key: 1, value: 1, text: 'All' },
                  { key: 2, value: 2, text: 'location1' },
                  { key: 3, value: 3, text: 'location2' },
                  { key: 4, value: 4, text: 'location3' }
                ]}
                placeholder='Select location'
                selectOnBlur={false}/>
            </Form.Group>
            <Form.Group className='form-modal-actions' widths='equal'>
              <Form.Field>
                <Button
                  content='Cancel'
                  onClick={_handleClose}
                  type='button'/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>

      </Modal>
      <ShowReport/>
    </>
  )
}

export default compose(
  connect(
    (state)  => {
      const  reportDetail = customReportDetailDuck.selectors.detail(state)

      return {
        reportDetail ,
        initialValues: {
          action_type: 'preview'

        }

      }
    },
    {
      resetItem: customReportDetailDuck.creators.resetItem,
      setItem  : customReportDetailDuck.creators.setItem
    }

  ),

  reduxForm({
    form: 'report-form'

  })
)(ReportForm)


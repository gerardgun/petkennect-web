import React, { useState } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Grid, Header, Segment, Table, Checkbox } from 'semantic-ui-react'
import FormField from '@components/Common/FormField'
import InputColor from '@components/Common/InputColor'
import loadable from '@loadable/component'
import ReportTemplate from '@containers/report-card-setting'
import './styles.scss'

const Layout = loadable(() => import('@components/Common/Layout'))

const ReportSheetSetting = () => {
  const [ themeColor, setThemeColor ] = useState('#00AA9F18')
  const [ textColor,setTextColor ] = useState('#00b5ad')
  const [ reportView,setReportTemplate ] = useState(false)
  const [ imageSlider,setImageSlider ] = useState(false)

  const _handleImageSlider = () => {
    setImageSlider(!imageSlider)
  }

  return (
    <>
      {reportView != true ?  <Layout>
        <Segment className='segment-content' padded='very'>
          <Header as='h2' content='Report Setting' style={{ 'margin-bottom': '70px' }}/>
          <Grid>
            <Grid.Column className='pb0' computer={16}>
              <Button
                basic
                color='teal'
                content='View Report' floated='right'
                onClick={()=>setReportTemplate(true)}/>
            </Grid.Column>

          </Grid>

          <Grid>
            <Grid.Column className='pl0' computer={16}>
              <Table
                basic='very' className='table-primary' selectable
                sortable unstackable>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell className='input-color'>Options</Table.HeaderCell>
                    <Table.HeaderCell className='input-color'>Values</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  <>
                    <Table.Row>
                      <Table.Cell className='input-color'>Theme Color</Table.Cell>
                      <Table.Cell className='input-color'>
                        <Field
                          autoComplete='off'
                          component={FormField}
                          control={InputColor}
                          name='themeColor'
                          onChange={(color)=>{setThemeColor(color)}}
                          required/>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className='input-color'>Text Color</Table.Cell>
                      <Table.Cell className='input-color'><Field
                        autoComplete='off'
                        component={FormField}
                        control={InputColor}
                        name='textColor'
                        onChange={(color)=>{setTextColor(color)}}
                        required/></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell className='input-color'>Hide Pet Image Slider</Table.Cell>
                      <Table.Cell className='input-color'>
                        <Field
                          checked={imageSlider}
                          component={FormField}
                          control={Checkbox}
                          format={Boolean}
                          name='photo_slider_toggle'
                          onChange={_handleImageSlider}
                          toggle
                          type='checkbox'/>
                      </Table.Cell>
                    </Table.Row>

                  </>
                </Table.Body>

              </Table>
            </Grid.Column>
          </Grid>
        </Segment>
      </Layout> : <ReportTemplate
        imageSlider={imageSlider} textColor={textColor} themeColor={themeColor}/>
      }

    </>
  )
}

export default compose(
  connect(
    () => {
      return {
        // initialValues: {}
      }
    }),
  reduxForm({
    form              : 'report-sheet-form',
    destroyOnUnmount  : false,
    enableReinitialize: true
  })
)(ReportSheetSetting)


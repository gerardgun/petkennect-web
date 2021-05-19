import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Grid, Button, Icon } from 'semantic-ui-react'
import ImageEditor from '@components/Common/ImageEditor'

import Layout from '@components/Common/Layout'
import ReportSidebar from './report-sidebar'
import ReportContent from './report-content'
import ReportCardModalPrint from './report-card-modal-print'

import reportCardSettingDetailDuck from '@reducers/pet/report-card-setting/detail'
import petDetailDuck from '@reducers/pet/detail'
import petImageDuck from '@reducers/pet/image'
import petImageDetailDuck from '@reducers/pet/image/detail'

import './styles.scss'

const ReservationReportTemplate = (props) => {
  const inputFileRef = useRef()

  const _handleUploadImage = () => {
    if(inputFileRef.current)
      inputFileRef.current.click()
  }

  const _handleFileChange = e => {
    if(e.target.files && e.target.files[0])
      props.setPetImage({
        filepath  : e.target.files[0],
        filename  : e.target.files[0].name,
        filetype  : 'image',
        is_profile: true
      }, 'CREATE')
  }

  const _handlePreviewReport = () => {
    props.setReport(null, 'READ')
  }

  return (
    <div  className='app-content-slider'>
      <Layout>
        <Grid className='mv20'>
          <>
            <Grid.Column className='mt32 grid-header' width='12'>
              <Button basic color='teal' onClick={_handlePreviewReport}><Icon name='print'></Icon>Preview Report</Button>
              <Button
                basic className='mh12' color='teal'
                onClick={_handleUploadImage}><Icon name='upload'></Icon>Upload Image</Button>
            </Grid.Column>
            <Grid.Column
              className='mh40'
              computer={12} mobile={16} tablet={16}>
              <input
                accept='image/*'
                hidden onChange={_handleFileChange} ref={inputFileRef}
                type='file'/>
              <Grid
                className='pdf-layout-portrait' width={16}>
                <Grid className='mt0' width={16}>
                  <Grid.Column width={4}>
                    <ReportSidebar
                      imageSlider={props.imageSlider} textColor={props.textColor}
                      themeColor={props.themeColor}/>
                  </Grid.Column >
                  <Grid.Column width={12}>
                    <ReportContent
                      imageSlider={props.imageSlider} reportName={props.reportName}
                      textColor={props.textColor} themeColor={props.themeColor}/>
                  </Grid.Column >
                </Grid>
              </Grid>
              <div className='mh24 mv32'>
                <ImageEditor
                  duck={petImageDuck}
                  duckDetail={petImageDetailDuck}/>
              </div>

            </Grid.Column >
          </>
        </Grid>
        <ReportCardModalPrint
          imageSlider={props.imageSlider} reportName={props.reportName} textColor={props.textColor}
          themeColor={props.themeColor}/>
      </Layout>
    </div>
  )
}

export default compose(
  connect(
    state => ({
      petImageDetail: petImageDetailDuck.selectors.detail(state),
      petDetail     : petDetailDuck.selectors.detail(state)
    }),
    {
      setPetImage: petImageDetailDuck.creators.setItem,
      setItem    : petImageDetailDuck.creators.setItem,
      setReport  : reportCardSettingDetailDuck.creators.setItem
    }
  )
)(ReservationReportTemplate)

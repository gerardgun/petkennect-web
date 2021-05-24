import React, { useState,useRef } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  Grid, Header, Image, Checkbox, Input, Button, Card } from 'semantic-ui-react'
import { Field } from 'redux-form'
import FormField from '@components/Common/FormField'
import ImageEditor from '@components/Common/ImageEditor'

import '../styles.scss'
const ReportMidSection = (props)=>{
  const { duckDetail, duck, imagePathOne,imagePathTwo,reportName } = props

  const [ selectedImage, setSelectedImage ] = useState('first')
  const dispatch = useDispatch()
  const inputFileRef = useRef()
  const _handleUploadImage = () => {
    if(inputFileRef.current)
      inputFileRef.current.click()
  }
  const _handleFileChange = e => {
    if(e.target.files && e.target.files[0])
      dispatch(
        duckDetail.creators.setItem({
          filepath  : e.target.files[0],
          filename  : e.target.files[0].name,
          filetype  : 'image',
          is_profile: true
        },'CREATE')
      )
  }

  return (
    <>
      <div className='flex align-center justify-between mt20'>
        <Header
          as='h3' className='mb0' color='blue'
          content={`Editing ${reportName} Report Card`}/>
        <Button
          as={Link}
          basic
          className='mr0' color='teal' content='Preview'
          style={{ width: '200px' }}
          to='/setup/report-sheet-setting'/>
      </div>

      <Grid  className='pt32'style={{ paddingLeft: '1.3rem' }}>
        <Grid.Row>
          <Grid.Column computer={8}>
            <Header as='h3' textAlign='justified'>
                Service Type
              <Header.Subheader  style={{ marginTop: '.5rem' }}>
                This is the service type that the report card applies to
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column computer={8} textAlign='right'>
            <Field
              className='service-text'
              component={FormField}
              control={Input}
              name='service_report_name'
              readOnly
              style={{ width: '200px' }}/>
          </Grid.Column >
        </Grid.Row>

      </Grid>
      <Grid  className='pt0 mt32'style={{ paddingLeft: '1.3rem' }}>
        <Grid.Row>
          <Grid.Column computer={8}>
            <Header as='h3' textAlign='justified'>
                Pet Photo Slider
              <Header.Subheader  style={{ marginTop: '.5rem' }}>
                {/* eslint-disable-next-line react/no-unescaped-entities*/}
         Enable this option if reports will contain pictures of pet's stay.
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column computer={8}>
            <div className='flex align-center justify-end'>
              <Header
                as='h4' className='mb0' content='Hide:'
                style={{ marginRight: '40px' }}/>
              {/* <Checkbox style={{ marginRight: '15%' }} toggle/> */}
              <div  className='hide-ph-toggle'>
                <Field
                  component={FormField}
                  control={Checkbox}
                  format={Boolean}
                  name='photo_slider'
                  toggle
                  type='checkbox'/>
              </div>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid style={{ paddingLeft: '1.3rem' }}>
        <Grid.Row>
          <Grid.Column computer={6}>
            <Header as='h3' style={{ marginTop: '1.5rem' }} textAlign='justified'>
                Pet Profile Photo
              <Header.Subheader  style={{ marginTop: '.5rem' }}>
                If a pet photo is not available, a default image can be used. Select one of the
                following options or upload a custom image. Silohoutee images will be recolered with
                the primary color of branding.
              </Header.Subheader>
            </Header>
          </Grid.Column>
          <Grid.Column
            computer={10}
            mobile={16} tablet={16}>
            <div className='flex align-center justify-end' style={{ marginTop: '1.5rem' }}>

              <div className='card-img-mid'>
                <div>
                  <Card
                    className={selectedImage == 'first' ? 'selected-pic box-shadow-pic' : 'box-shadow-pic'}
                    onClick={()=>{setSelectedImage('first')}}
                    style={{ height: '150px' }}>
                    <div className={reportName === 'Day Training' ? 'mid-deafult-training' : 'mid-deafult-image-1'}>
                      <Image src={imagePathOne}/>
                    </div>
                  </Card>
                  <Header
                    as='h3'
                    className={selectedImage == 'first' ? 'selected-h mt0' : 'unselected-h mt0'}
                    content='SELECTED' textAlign='center'/>

                </div>
              </div>
              <div className='card-img-mid'>
                <Card
                  className={selectedImage === 'second'
                    ? 'flex justify-center selected-pic box-shadow-pic' : 'flex justify-center box-shadow-pic'}
                  onClick={()=>{setSelectedImage('second')}}
                  style={{ height: '150px' }}>
                  <div className='mid-deafult-image-2'>
                    <Image src={imagePathTwo}/>
                  </div>
                </Card>
                <Header
                  as='h3'
                  className={selectedImage == 'second'
                    ? 'selected-h mt0' : 'unselected-h mt0'}
                  content='SELECTED'
                  textAlign='center'/>
              </div>
              <Button
                basic color='teal' content='Upload'
                icon='add'
                onClick={_handleUploadImage}
                style={{ width: '200px', marginLeft: '8%', marginBottom: '6%' }}
                type='button'/>

            </div>

          </Grid.Column>
        </Grid.Row>
      </Grid>
      <input
        accept='image/*'
        hidden onChange={_handleFileChange} ref={inputFileRef}
        type='file'/>
      <div className='mh24 mv32'>
        <ImageEditor
          duck={duck}
          duckDetail={duckDetail}/>
      </div>
    </>
  )
}

export default ReportMidSection

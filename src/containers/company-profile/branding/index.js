import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { Field, reduxForm, change, formValueSelector } from 'redux-form'
import { Label, Image, Breadcrumb, Icon, Button, Checkbox, Divider, Form, Grid, Header, Input, Select, Segment, TextArea, GridColumn } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'

import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import theme from '@components/mainTheme'
import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import Tab from '@containers/setup/boarding/general/components/Tab'
import SetupBoardingGeneralBelongingIndex from '@containers/setup/boarding/general/belonging-section'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import { previewImage, deleteImage } from './utils'

const colors = [
  { color: 'red', label: '#FF0000' },
  { color: 'orange', label: '#FFA500' },
  { color: 'yellow', label: '#FFFF00' },
  { color: 'olive', label: '#808000' },
  { color: 'green', label: '#008000' },
  { color: 'teal', label: '#008080' },
  { color: 'blue', label: '#0000FF' },
  { color: 'violet', label: '#7F00FF' },
  { color: 'purple', label: '#800080' },
  { color: 'pink', label: '#FFC0CB' },
  { color: 'brown', label: '#A52A2A' },
  { color: 'grey', label: '#808080' },
  { color: 'black', label: '#000000' }
]

const textColors = [
  { color: 'white', label: '#000000' },
  { color: 'black', label: '#FFFFFF' }
]

function SetupCompanyProfileBranding(props) {
  const {
    error, handleSubmit, reset, initialize // redux-form
  } = props

  const [ logo, setLogo ] = useState([])
  const [ background, setBackground ] = useState([])
  const [ navColor, setNavColor ] = useState()
  const [ headingColor, setHeadingColor ] = useState()
  const [ textColor, setTextColor ] = useState()

  const { getRootProps: getRootLogo, getInputProps: getInputLogo } = useDropzone({
    maxFiles: 1,
    accept  : 'image/png, image/gif, image/jpeg',
    onDrop  : acceptedFiles => {
      setLogo(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })

  const { getRootProps: getRootBackground, getInputProps: getInputBackground } = useDropzone({
    maxFiles: 1,
    accept  : 'image/png, image/gif, image/jpeg',
    onDrop  : acceptedFiles => {
      setBackground(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })))
    }
  })

  const _handleSubmit = values => {
    console.log(values)
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Header as='h3' color='teal' content='Branding Options'/>
        <Form onSubmit={handleSubmit(_handleSubmit)}>
          <Grid className='grid-branding'>
            <Grid.Row>
              <Grid.Column width='8'>
                <Segment {...getRootLogo({ className: 'dropzone' })}>
                  <p className='branding-titles'>Logo Image for Top Navigation</p>
                  <div className='segment-delete'>
                    <Button
                      basic className='button-delete-image' color='teal'
                      onClick={() => deleteImage('logo_preview')}>
                      <Icon name='trash alternate outline'/> Delete Image
                    </Button>
                  </div>
                  <Image
                    centered className='image-default-size' id='logo_preview'
                    size='small' src={logo[0] ? logo[0].preview : '/images/logo.png'}/>
                  <p className='branding-titles'>Drag {'&'} Drop</p>
                  <label className='branding-titles-label'>
                  files or click here for upload
                    <Input
                      {...getInputLogo()} accept='image/png, image/gif, image/jpeg' className='input-file'
                      type='file'/>
                  </label>
                </Segment>
              </Grid.Column>

              <Grid.Column width='8'>
                <Segment {...getRootBackground({ className: 'dropzone' })}>
                  <p className='branding-titles'>Login Background Image</p>
                  <div className='segment-delete'>
                    <Button
                      basic className='button-delete-image' color='teal'
                      onClick={() => deleteImage('background_preview')}>
                      <Icon name='trash alternate outline'/> Delete Image
                    </Button>
                  </div>
                  <Image
                    centered className='image-default-size' id='background_preview'
                    size='small' src={background[0] ? background[0].preview : '/images/background_dog.jpg'}/>
                  <p className='branding-titles'>Drag {'&'} Drop</p>
                  <label className='branding-titles-label'>
                  files or click here for upload
                    <Input
                      {...getInputBackground()} accept='image/png, image/gif, image/jpeg' className='input-file'
                      type='file'/>
                  </label>
                </Segment>
              </Grid.Column>
            </Grid.Row>

            <Grid.Row>
              <Grid.Column width='12'>
                <Header as='h4'>Navigation Color</Header>
                {colors.map(item => (<Button
                  className='button-color' color={item.color} onClick={() => setNavColor(item)}
                  size='mini'/>))}
              </Grid.Column>
              <Grid.Column width='4'>
                {navColor
              && <Label basic className='label-color'>
                <Button className='button-color' color={navColor.color} size='mini'/>
                {navColor.label}
              </Label>}
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='12'>
                <Header as='h4'>Top Navigation Text Color</Header>
                {textColors.map(item => (
                  <Button
                  type='button'
                  className='button-color' 
                  color={item.color} onClick={() => {setTextColor(item)}}
                  size='mini'/>))}
              </Grid.Column>
              <Grid.Column width='4'>
                {textColor && 
                  <Label basic className='label-color'>
                    <Button className='button-color' color={textColor.color} size='mini'/>
                    {textColor.label}
                  </Label>}
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='12'>
                <Header as='h4'>Headings Color</Header>
                {colors.map(item => (<Button
                  className='button-color' color={item.color} onClick={() => setHeadingColor(item)}
                  size='mini'/>))}
              </Grid.Column>
              <Grid.Column width='4'>
                {headingColor
              && <Label basic className='label-color'>
                <Button className='button-color' color={headingColor.color} size='mini'/>
                {headingColor.label}
              </Label>}
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row className='row-end'>
              <Button basic color='teal' content='Cancel'/>
              <Button color='teal' content='Save changes'/>
            </Grid.Row>
          </Grid>
        </Form>
      </Segment>
    </Layout>
  )}

export default reduxForm({
  form              : 'setup-company-profile-branding',
  enableReinitialize: true,
  validate          : values => {
    const schema = {}

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupCompanyProfileBranding)

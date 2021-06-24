/* eslint-disable */
import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Label, Image, Icon, Button, Divider, Form, Grid, Header, Input, Segment } from 'semantic-ui-react'
import * as Yup from 'yup'

import Theme from '@components/mainTheme'
import Layout from '@components/Common/Layout'
import Menu from '@containers/company-profile/components/Menu'
import tenantDetailDuck from '@reducers/tenant/detail'
import userFilesDetailDuck from '@reducers/user_files/detail'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import { deleteImage } from './utils'

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
  { color: 'black', label: '#000000', labelC: '#00000B' },
  { color: 'white', label: '#FFFFFF', labelC: '#FFFFF0' }
]

function SetupCompanyProfileBranding(props) {
  const dispatch = useDispatch()
  const tenant = useSelector(tenantDetailDuck.selectors.detail)

  const {
   handleSubmit // redux-form
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

  const _handleSubmit = () => {
    console.log(logo, background)
    const newColors = {branding_config: {
                        navigation_color: navColor ? navColor.label:tenant.item.branding_config.navigation_color, 
                        navigation_text_color: textColor ? textColor.labelC:tenant.item.branding_config.navigation_text_color, 
                        heading_text_color: headingColor ? headingColor.label:tenant.item.branding_config.heading_text_color, 
                      }}
    dispatch(tenantDetailDuck.creators.put(newColors))
    //if(logo[0]){dispatch(tenantDetailDuck.creators.put(  ) )}
    //if(background[0]){dispatch(userFilesDetailDuck.creators.post( {file: background[0]} ) )}
    setNavColor();setHeadingColor();setTextColor()
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Menu/>
        <Header as='h3' color={Theme(tenant).headingColor} content='Branding Options'/>
        <Form onSubmit={handleSubmit(_handleSubmit)}>
          <Grid className='grid-branding'>
            <Grid.Row>
              <Grid.Column width='8'>
                <Segment {...getRootLogo({ className: 'dropzone' })}>
                  <p className='branding-titles'>Logo Image for Top Navigation</p>
                  <div className='segment-delete'>
                    <Button type='button' basic  
                      className='button-delete-image' color='teal'
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
                    <Button type='button' onClick={() => deleteImage('background_preview')}
                      basic className='button-delete-image' color='teal'>
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
                {colors.map(item => (
                  <Button type='button' onClick={() => setNavColor(item)}
                    key={`nav${item.color}`}
                    className='button-color' 
                    color={item.color} 
                    size='mini'/>))}
              </Grid.Column>
              <Grid.Column width='4'>
                {navColor && 
                <Label basic className='label-color'>
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
                  <Button type='button' onClick={() => {setTextColor(item)}}
                    key={`text${item.color}`}
                    className='button-color' 
                    color={item.color}
                    size='mini'/>))}
              </Grid.Column>
              <Grid.Column width='4'>
                {textColor && 
                  <Label basic className='label-color'>
                    <Button disabled={true} className='button-color' color={textColor.color} size='mini'/>
                    {textColor.label}
                  </Label>}
              </Grid.Column>
            </Grid.Row>

            <Divider/>

            <Grid.Row>
              <Grid.Column width='12'>
                <Header as='h4'>Headings Color</Header>
                {colors.map(item => (
                  <Button type='button' onClick={() => setHeadingColor(item)}
                    key={`heading${item.color}`}
                    className='button-color' 
                    color={item.color} 
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
              <Button basic color='red' content='Cancel' disabled={!(navColor || textColor || headingColor)} onClick={()=>{setNavColor();setHeadingColor();setTextColor()}}/>
              <Button type='submit' color='teal' content='Save changes' disabled={!(navColor || textColor || headingColor)}/>
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
    const schema = {
      navigation_text_color : Yup.string().required('Navigation Text Color is required'),
      navigation_color      : Yup.string().required('Navigation Color is required'),
      heading_text_color    : Yup.string().required('Heading Text Color is required'),
    }

    return syncValidate(Yup.object().shape(schema), values)
  }
})(SetupCompanyProfileBranding)
/* eslint-enable */

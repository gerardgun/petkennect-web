import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Grid, Header, Segment } from 'semantic-ui-react'

import Layout from '@components/Common/Layout'
import Table from '@components/Table'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'

import EmailTemplateCreate from './create'
import emailTemplateDuck from '@reducers/email-template'
import emailTemplateDetailDuck from '@reducers/email-template/detail'

const EmailTemplate = ({ ...props }) => {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  useEffect(() => {
    props.getEmailTemplate()
  }, [])

  const _handleAddBtnClick = () => {
    props.setItem(null, 'CREATE')
  }

  const _handleOptionClick = option => {
    if(option === 'delete')
      _handleOpen()
  }

  return (
    <Layout>
      <Segment className='segment-content'>
        <Grid className='segment-content-header' columns={2}>
          <Grid.Column>
            <Header as='h2'>Email Templates</Header>
          </Grid.Column >
          <Grid.Column
            className='ui-grid-align'
            computer={8} mobile={12} tablet={8}>
            <Button color='teal' content='New Email Template'  onClick={_handleAddBtnClick}/>
          </Grid.Column>
        </Grid>
        <Table
          duck={emailTemplateDuck}
          onOptionClick={_handleOptionClick}/>
      </Segment>

      <EmailTemplateCreate/>
      <ModalDelete
        duckDetail={emailTemplateDetailDuck}
        onClose={_handleClose}
        open={open}/>

    </Layout>
  )
}

export default compose(
  connect(
    ({ emailTemplate ,...state }) => ({
      emailTemplate,
      emailTemplateDetail: emailTemplateDetailDuck.selectors.detail(state)

    }), {
      getEmailTemplate: emailTemplateDuck.creators.get,
      setItem         : emailTemplateDetailDuck.creators.setItem
    })
)(EmailTemplate)

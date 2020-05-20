import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Divider, Grid, Header, Segment, Tab } from 'semantic-ui-react'
import { submit } from 'redux-form'

import FormInformation from './FormInformation'
import ModalDelete from '@components/Modal/Delete'

import MediaSection from './MediaSection'
import useModal from '@components/Modal/useModal'
import Layout from '@components/Layout'

import productDetailDuck from '@reducers/product/detail'
import categoryDuck from '@reducers/category'
import { parseResponseError } from '@lib/utils/functions'

const ProductSection = (props) => {
  const { productDetail, submit, history } = props
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const  [ open,{ _handleClose, _handleOpen } ] =  useModal()
  const { id } = useParams()
  const isUpdating = Boolean(id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(productDetail.status)

  useEffect(()=> {
    if(productDetail.status === 'DELETED')
      history.replace('/product')
  }, [ productDetail.status ])

  useEffect(()=> {
    if(isUpdating)
      props.getProduct(id)
    props.resetItem()
    props.getCategories()
  },[ id ])
  const _handleSaveBtnClick = () => {
    submit('product-create-information')
  }

  const _handleSubmit = (values) => {
    if(isUpdating)
      return props.put({ id: productDetail.item.id, ...values })
        .catch(parseResponseError)
    else
      return props.post({ ...values })
        .then(result =>  history.replace(`/product/${result.id}`))
        .catch(parseResponseError)
  }
  const _handleTabChange = (e, { activeIndex }) => setTabActiveIndex(activeIndex)

  return (
    <Layout>

      <Grid className='form-primary'>
        <Grid.Column width='thirteen'>
          <Segment className='segment-content' padded='very'>
            <Grid className='segment-content-header'>
              <Grid.Column>
                <Header as='h2'>Info Product</Header>
              </Grid.Column>
            </Grid>

            <Tab
              activeIndex={activeTabIndex}
              menu={{ secondary: true, pointing: true }}
              onTabChange={_handleTabChange}
              panes={[
                {
                  menuItem: 'Information',
                  render  : () => <FormInformation onSubmit={_handleSubmit}/>
                },
                isUpdating ? {
                  menuItem: 'Media',
                  render  : () => <MediaSection/>
                } : {}
              ]}/>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>

          <Button
            as={Link} content='Cancel' disabled={saving}
            fluid size='large' to='/product'/>
          <Button
            color='teal'
            content={`${isUpdating ? 'Update' : 'Create'} Product`}
            disabled={saving}
            fluid
            loading={false}
            onClick={_handleSaveBtnClick}
            size='large'/>
          {
            isUpdating && (<Button
              color='google plus' content='Delete Product' fluid
              onClick={_handleOpen} size='large'/>)
          }
          <Divider horizontal>Quick Actions</Divider>

          <Button
            content='Send Reminder' disabled fluid
            icon='mail outline'/>
          <Button
            content='Print' disabled fluid
            icon='print'/>
        </Grid.Column>
      </Grid>

      <ModalDelete
        duckDetail={productDetailDuck}
        onClose={_handleClose}
        open={open}/>
    </Layout>

  )
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      productDetail: productDetailDuck.selectors.detail(state)
    }),
    {
      submit,
      getProduct   : productDetailDuck.creators.get,
      resetItem    : productDetailDuck.creators.resetItem,
      getCategories: categoryDuck.creators.get,
      post         : productDetailDuck.creators.post,
      put          : productDetailDuck.creators.put
    }
  )
)(ProductSection)

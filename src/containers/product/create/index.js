import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter, useParams } from 'react-router-dom'
import { compose } from 'redux'
import { Button, Divider, Grid, Header, Segment, Tab, Menu, Label, Popup } from 'semantic-ui-react'
import { submit , destroy , formValueSelector } from 'redux-form'

import FormInformation from './FormInformation'
import ModalDelete from '@components/Modal/Delete'

import MediaSection from './MediaSection'
import PackageSection from './PackageSection'
import useModal from '@components/Modal/useModal'
import Layout from '@components/Common/Layout'

import productDetailDuck from '@reducers/product/detail'
import productPackageDuck from '@reducers/product/package'
import productImageDetailDuck from '@reducers/product/image/detail'
import categoryDuck from '@reducers/category'
import { parseResponseError } from '@lib/utils/functions'
import { useGalleryState } from 'src/contexts/GalleryContext'

const ProductSection = (props) => {
  const { productPackage, productDetail, submit, history ,destroy } = props
  const [ activeTabIndex, setTabActiveIndex ] = useState(0)
  const  [ open,{ _handleClose, _handleOpen } ] =  useModal()
  const { id } = useParams()
  const itemsGallery = useGalleryState()

  const isUpdating = Boolean(id)
  const saving = [ 'POSTING', 'PUTTING' ].includes(productDetail.status)

  useEffect(()=> {
    return ()=> destroy([ 'product-create-information' ])
  }, [])

  useEffect(()=> {
    if(productDetail.status === 'DELETED')
      history.replace('/product')

    if(productDetail.status === 'POSTED')
      if(itemsGallery.length)
      {
        Promise.all(itemsGallery.map((_itemGallery)=>props.postProductImage(
          { images: _itemGallery.file[0]  }
        )))
          .then(() => history.replace(`/product/${productDetail.item.id}`))
          .catch(()=>{})
      }
  }, [ productDetail.status , productDetail.item.id ])

  useEffect(()=> {
    if(isUpdating)
      props.getProduct(id)
    props.resetItem()
    props.getCategories()
  },[ id ])

  useEffect(()=> {
    if(productDetail.item.id && productDetail.item.is_package)
      props.getPackageProducts(id)
  }, [ productDetail.item.id ])

  const _handleSaveBtnClick = () =>
    submit('product-create-information')

  const _handleSubmit = async (values) => {
    if(isUpdating)
      return props.put({ id: productDetail.item.id, ...values })
        .catch(parseResponseError)
    else
      return props.post({ ...values })
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
                <Header as='h2' className='cls-MainHeader'>Info Product</Header>
              </Grid.Column>
            </Grid>

            <Tab
              activeIndex={activeTabIndex}
              className='cls-tabHeader'
              menu={{ secondary: true, pointing: true }}
              onTabChange={_handleTabChange}
              panes={[
                {
                  menuItem: 'Information',
                  render  : () => <FormInformation onSubmit={_handleSubmit}/>
                },
                isUpdating ? {
                  menuItem: (
                    productDetail.item.is_package && props.watchedIsPackage
                      ? (
                        <Menu.Item key='product-packages'>
                        Products <Label>{productPackage.items.length}</Label>
                        </Menu.Item>
                      )
                      : (
                        <Popup
                          content='The product must be a package to enable and save this option.'
                          trigger={
                            <Menu.Item disabled key='product-packages'>
                              Products <Label>{productPackage.items.length}</Label>
                            </Menu.Item>
                          }/>
                      )

                  ),
                  render: () => <PackageSection/>
                } : {},
                {
                  menuItem: 'Media',
                  render  : () => <MediaSection/>
                }
              ]}/>
          </Segment>
        </Grid.Column>
        <Grid.Column className='form-primary-actions vertical' width='three'>

          <Button
            as={Link} className='cls-cancelButton' content='Cancel'
            disabled={saving}
            fluid size='large' to='/product'/>
          <Button
            className='cls-saveButton'
            color='teal'
            content={`${isUpdating ? 'Update' : 'Create'} Product`}
            disabled={saving}
            fluid
            loading={false}
            onClick={_handleSaveBtnClick}
            size='large'/>
          {
            isUpdating && (<Button
              className='cls-deleteButton'
              color='google plus' content='Delete Product' fluid
              onClick={_handleOpen} size='large'/>)
          }
          <Divider horizontal>Quick Actions</Divider>

          <Button
            className='cls-cancelButton'
            content='Send Reminder' disabled fluid
            icon='mail outline'/>
          <Button
            className='cls-cancelButton'
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
      productDetail   : productDetailDuck.selectors.detail(state),
      productPackage  : productPackageDuck.selectors.list(state),
      watchedIsPackage: formValueSelector('product-create-information')(state,'is_package')

    }),
    {
      submit,
      getProduct        : productDetailDuck.creators.get,
      resetItem         : productDetailDuck.creators.resetItem,
      getCategories     : categoryDuck.creators.get,
      getPackageProducts: productPackageDuck.creators.get,
      post              : productDetailDuck.creators.post,
      postProductImage  : productImageDetailDuck.creators.post,
      put               : productDetailDuck.creators.put,
      destroy
    }
  )
)(ProductSection)

import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import { compose } from 'redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'
import { Grid, Segment, Button, Form, Header, Input, TextArea, Checkbox, Select } from 'semantic-ui-react'
import * as Yup from 'yup'

import Layout from '@components/Common/Layout'
import ModalDelete from '@components/Modal/Delete'
import useModal from '@components/Modal/useModal'
import Table from '@components/Table'

import { parseFormValues, parseResponseError, syncValidate } from '@lib/utils/functions'
import FormError from '@components/Common/FormError'
import FormField from '@components/Common/FormField'

import ProductVariationsFormModal from './../../product-variations/create'

import productClassesDuck from '@reducers/product/product-classes'
import categoryDuck from '@reducers/category'
import authDuck from '@reducers/auth'
import productVariationDuck from '@reducers/product/product-variations'
import productVariationsDetailDuck from '@reducers/product/product-variations/detail'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'
import productClassesDetailDuck from '@reducers/product/product-classes/detail'

import './styles.scss'

export const formId = 'client-form'

const ProductFamilyShow = (props) => {
  const {
    currentTenant,
    productVariations,
    productFamiliesDetail,
    productClassesDetail,
    productClasses,
    category,
    product_name,
    short_description,
    error,
    reset,
    handleSubmit,
    submitting // redux-form
  } = props

  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  const [ { _handleOpen } ] = useModal()
  const { id } = useParams()
  const history = useHistory()

  const [ ActiveInfoItem, setActiveInfoItem ] = useState('information')
  const _handleInfoItemClick = (e, { name }) => setActiveInfoItem(name)

  useEffect(() => {
    props.getCategories()
    props.getProductFamilies(id)
    props.getProductVariations(id)

    return () => {
      props.resetItem()
    }
  }, [])

  useEffect(()=> {
    if(productFamiliesDetail.item.family)
      props.getProductClasses(productFamiliesDetail.item.family.id)
  }, [ productFamiliesDetail.status ])

  // eslint-disable-next-line no-unused-vars
  const _handleDeleteClick = () => {
    _handleOpen()
  }

  const _handleOptionClick = option => {
    if(option === 'delete') {
      props.setItem(productVariations.selector.selected_items[0], 'DELETE')
      _handleOpenDeleteModal()
    }
  }
  const _handleRowClick = (e, item) => {
    props.setProductVariations(item, 'UPDATE')
  }

  const _handleCancelBtnClick = () =>{
    history.replace('/product-families')
  }

  const _handleSubmit = values => {
    values = parseFormValues(values)
    values.categories = values.categories.map((item,index) => {
      return  item == false ? null : category.items[index].id
    }).filter(function(el) {
      return el != null
    })

    return props.put({ id: productFamiliesDetail.item.id, ...values })
      .then(_handleCancelBtnClick)
      .catch(parseResponseError)
  }

  return (
    <Layout>

      <Segment className='segment-content' padded='very'>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form id={formId} onReset={reset}>
          <Grid className='petkennect-profile-body-header div-client-info-edit-button'>
            <Grid.Column textAlign='left' width={8}>
              <Header as='h2'>Edit Product </Header>
            </Grid.Column >
            <Grid.Column textAlign='right' width={8}>
              <Button
                basic
                className='w120'
                color='teal'
                content='Cancel' disabled={submitting}
                onClick={_handleCancelBtnClick}
                size='small'/>
              <Button
                className='ml16'
                color='teal'
                content='Save Changes'
                disabled={submitting}
                loading={submitting}
                // eslint-disable-next-line react/jsx-handler-names
                onClick={handleSubmit(_handleSubmit)}
                size='small'/>
            </Grid.Column>

          </Grid>
          <div className='petkennect-profile-body-content'>
            <div className='div-client-info-button'>
              <Button
                basic={ActiveInfoItem !== 'information'} color='teal'
                content='Information' name='information'
                onClick={_handleInfoItemClick}/>
              <Button
                basic={ActiveInfoItem !== 'variations'} color='teal'
                content='Variations' name='variations'
                onClick={_handleInfoItemClick}/>
              <Button
                basic={ActiveInfoItem !== 'seo'} color='teal'
                content='SEO' name='seo'
                onClick={_handleInfoItemClick}/>
            </div>
          </div>
          {ActiveInfoItem === 'information'  && (
            <>
              <Grid className='mt32'>
                <Grid.Column  computer={12} mobile={16} tablet={10}>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Input}
                      label='Product name'
                      name='name'
                      required
                      type='text'/>
                  </Form.Group> </Grid.Column>
                <Grid.Column computer={4} mobile={16} tablet={6}>
                  <Form.Group widths='equal'>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      label='Active'
                      name='is_active'
                      type='checkbox'/>
                    <Field
                      component={FormField}
                      control={Checkbox}
                      label='Outstanding'
                      name='is_outstanding'
                      type='checkbox'/>
                  </Form.Group>
                </Grid.Column>
              </Grid>
              <Form.Group widths='equal'>
                <Field
                  component={FormField}
                  control={Select}
                  label='Class'
                  name='family'
                  options={productClasses.items.map((_productClasses) => ({
                    key  : _productClasses.id,
                    value: _productClasses.id,
                    text : `${_productClasses.name}`
                  }))}
                  placeholder='Select product class'
                  required
                  selectOnBlur={false}/>
              </Form.Group>

              <Form.Group widths='equal'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={TextArea}
                  label='Description'
                  name='description'
                  placeholder='Enter description'
                  required/>
              </Form.Group>

              <Grid className='mt32'>
                <Grid.Column computer={8} mobile={16} tablet={8}>
                  <label>Categories</label>
                  <Segment>
                    {
                      category.items.length > 0  && category.items.filter(_ => _.id == _.parent || _.parent == null).map((item)=>(
                        <>
                          <Field
                            className='label_h0'
                            component={FormField}
                            control={Checkbox}
                            label={`${item.name}`}
                            name={`categories[${item.index}]`}
                            type='checkbox'/>
                          <div className='ml16'>
                            {
                              category.items.filter(_ => _.id != _.parent && _.parent == item.id).map((item)=>(
                                <>
                                  <Field
                                    className='label_h0'
                                    component={FormField}
                                    control={Checkbox}
                                    label={`${item.name}`}
                                    name={`categories[${item.index}]`}
                                    type='checkbox'/>
                                </>
                              ))
                            }
                          </div>
                        </>
                      ))
                    }
                  </Segment>
                </Grid.Column>
                <Grid.Column
                  className='div_text_center' computer={8} mobile={16}
                  tablet={8}>
          Select the categories where this product will appear. Remember that a product can belong to many categories at the same time.
                </Grid.Column>
              </Grid>

            </>
          )}
          {ActiveInfoItem === 'variations'  && (
            <>
              <Segment className='p40'>
                <Header as='h3' className='section-info-header'>Attributes</Header>
                <Form.Group widths={8}>
                  {
                    productFamiliesDetail.item.family && (
                      <>
                        <Field
                          checked={true}
                          component={FormField}
                          control={Checkbox}
                          label={`${productFamiliesDetail.item.family.name}`}
                          type='checkbox'/>
                      </>
                    )
                  }
                </Form.Group>
              </Segment>

              <Segment className='p40'>
                <Header as='h3' className='section-info-header'>Values</Header>
                <label>Select the values to generate variations </label>

                <Form.Group widths='equal'>
                  {
                    productClassesDetail.item.family_attributes && productClassesDetail.item.family_attributes.map((item) => (
                      <>
                        <Field
                          checked={true}
                          component={FormField}
                          control={Checkbox}
                          label={`${item.attribute.name}`}
                          type='checkbox'/>
                      </>
                    ))
                  }
                </Form.Group>
              </Segment>

              <Segment className='p40 variation_table'>
                <Header as='h3' className='section-info-header'>Variations</Header>
                <label>Modify your variations or click on the edit button the modify the details. </label>
                <Table
                  duck={productVariationDuck}
                  onRowClick={_handleRowClick}
                  onRowOptionClick={_handleOptionClick}/>
              </Segment>

            </>
          )}
          {ActiveInfoItem === 'seo'  && (
            <>
              <div className='mt32 mb16 div_url'>
                <label>Product URL</label>
                <br/>
                <Input
                  disabled label={`http://${currentTenant.subdomain_prefix}.petkennect.com/`}
                  value={productFamiliesDetail.item.slug}/>
              </div>

              <Form.Group widths='equal'>
                <Field
                  autoComplete='off'
                  component={FormField}
                  control={TextArea}
                  label='Meta Description'
                  name='short_description'
                  placeholder='Enter description'
                  required/>
              </Form.Group>
              <label>Browser preview</label>
              <div className='ui fluid card div_browser_preview'>
                <div className='content'>
                  <div className='meta'>
                    <a href={`https://${currentTenant.subdomain_prefix}.petkennect.com/${productFamiliesDetail.item.slug}`} rel='noopener noreferrer' target='_blank'>{`https://${currentTenant.subdomain_prefix}.petkennect.com/${productFamiliesDetail.item.slug}`}</a>
                  </div>
                  <div className='header mb8 mt8'>{product_name}</div>
                  <div className='description'>{short_description}</div>
                </div>
              </div>

            </>
          )}
          {
            error && (
              <Form.Group widths='equal'>
                <Form.Field>
                  <FormError message={error}/>
                </Form.Field>
              </Form.Group>
            )
          }

          <Field component='input' name='id' type='hidden'/>
        </Form>

        <ModalDelete
          duckDetail={productVariationsDetailDuck}
          onClose={_handleCloseDeleteModal}
          open={openDeleteModal}/>

        <ProductVariationsFormModal/>

      </Segment>

    </Layout>

  )
}

export default compose(
  connect(
    ({ auth,  ...state }) => {
      const productFamiliesDetail = productFamiliesDetailDuck.selectors.detail(state)
      const product_name = formValueSelector(formId)(state, 'name')
      const short_description = formValueSelector(formId)(state, 'short_description')
      const categories =  categoryDuck.selectors.list(state)

      return {
        initialValues: { ...productFamiliesDetail.item, categories: categories.items.map((item)=>{
          return (productFamiliesDetail.item.categories && productFamiliesDetail.item.categories.filter(function(id) {
            return id == item.id}).length > 0 ? true : false
          )
        }) },
        product_name,
        short_description,
        currentTenant        : authDuck.selectors.getCurrentTenant(auth),
        productClasses       : productClassesDuck.selectors.list(state),
        productClassesDetail : productClassesDetailDuck.selectors.detail(state),
        category             : categories,
        productVariations    : productVariationDuck.selectors.list(state),
        productFamiliesDetail: productFamiliesDetail
      }
    },
    {
      getProductVariations: productVariationDuck.creators.get,
      getProductClasses   : productClassesDuck.creators.get,
      getCategories       : categoryDuck.creators.get,
      getProductFamilies  : productFamiliesDetailDuck.creators.get,
      setProductVariations: productVariationsDetailDuck.creators.setItem,
      resetItem           : productFamiliesDetailDuck.creators.resetItem,
      setItem             : productFamiliesDetailDuck.creators.setItem,
      put                 : productFamiliesDetailDuck.creators.put
    }),
  reduxForm({
    form              : formId,
    enableReinitialize: true,
    validate          : values => {
      const schema = {
        email            : Yup.string().email().required('Email is required'),
        first_name       : Yup.string().required('Name is required'),
        name             : Yup.string().required('Product name is required'),
        family           : Yup.string().required('Class is required'),
        short_description: Yup.string().required('Description name is required')
      }

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ProductFamilyShow)

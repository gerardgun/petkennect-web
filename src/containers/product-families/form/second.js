import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Segment, Table, Checkbox, Image, Grid, Popup, Button, Header } from 'semantic-ui-react'

import ModalDelete from '@components/Modal/Delete'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import useModal from '@components/Modal/useModal'

import productClassesDetailDuck from '@reducers/product/product-classes/detail'
import ProductVariationsFormModal from './../../product-variations/create'
import productFamiliesDetailDuck from '@reducers/product/product-families/detail'
import productVariationsDetailDuck from '@reducers/product/product-variations/detail'
import productAttributeValueDetailDuck from '@reducers/product/product-attribute-value/detail'
import productVariationDuck from '@reducers/product/product-variations'

import { defaultImageUrl } from '@lib/constants'
import { formId } from '../form/first'
import DeleteConfirmationForm from './deleteConfirmation'

import './styles.scss'

const ProductFormSecond = props => {
  const {
    productAttributes,
    productClassesDetail,
    productVariations,
    productVariationsAttributes,
    productVariationsDetail,
    productFamiliesDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  useEffect(() => {
    props.getProductAttributes()
    props.getProductVariations(productFamiliesDetail.item.id)
    if(productFamiliesDetail.item.family)
      props.getProductClasses(productFamiliesDetail.item.family)
  }, [])

  useEffect(() => {
    if(productVariationsDetail.status === 'DELETED' || productVariationsDetail.status === 'POSTED' || productVariationsDetail.status === 'PUT')
      props.getProductVariations(productFamiliesDetail.item.id)
  }, [ productVariationsDetail.status ])

  const _handleRowOptionClick = e => {
    e.stopPropagation()
    const itemId = +e.currentTarget.dataset.itemId
    const optionName = e.currentTarget.dataset.optionName
    const item = productVariations.items.find(({ id }) => id === itemId)
    if(optionName === 'delete') {
      props.setProductVariations(item, 'DELETE')
      _handleOpenDeleteModal()
    }
    else {
      props.setProductVariations(item, 'UPDATE')
    }
  }

  const _handleAttributeValueChange = (e, { item_id, attribute_id, product_variation, checked }) => {
    e.stopPropagation()
    if(checked) {
      let attributes = {}

      productVariationsAttributes.forEach((item) => {
        attributes[item.product_family_attribute] = item.product_attribute_value
      })
      attributes[attribute_id] = item_id

      return props.postProductVariation({ product: productFamiliesDetail.item.id, attributes })
    }
    else {
      const item = productVariations.items.find(({ id }) => id === product_variation)
      props.setProductVariations(item, 'READ')
    }
  }

  const _handleVariationValueChange = (e, { name, value, checked }) =>{
    e.stopPropagation()

    const itemId = e.target.parentNode.parentNode.parentNode.dataset.itemId
    let item = productVariations.items.find(({ id }) => id == itemId)

    let paylord = {
      id       : item.id,
      product  : item.product,
      sku_id   : item.sku_id,
      is_active: item.is_active,
      stock    : item.stock,
      price    : item.price
    }

    paylord[name] = checked == null ? value : checked

    return props.putProductVariation({ ...paylord })
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <>
          <Segment className='p40'>
            <Header as='h3' className='section-info-header'>Attributes</Header>
            <div className='div_attribute'>
              {
                productClassesDetail.item.family_attributes && productClassesDetail.item.family_attributes.map((item) => (
                  <>
                    <Field
                      checked={true}
                      className='pl8'
                      component={FormField}
                      control={Checkbox}
                      disabled={true}
                      label={`${item.attribute.name}`}
                      name={item.id}
                      type='checkbox'/>
                  </>
                ))
              }
            </div>
          </Segment>

          <Segment className='p40'>
            <Header as='h3' className='section-info-header'>Values</Header>
            <label>Select the values to generate variations </label>
            {
              productClassesDetail.item.family_attributes && productClassesDetail.item.family_attributes.map((item) => (
                <>
                  <Grid  className='grid_attribute_value' >
                    <Grid.Column
                      className='display_flex' computer={2} mobile={16}
                      tablet={16}>
                      <label><b>{item.attribute.name}</b></label>
                    </Grid.Column>
                    <Grid.Column
                      computer={14} mobile={16} style={{ padding: '0px' }}
                      tablet={16}>
                      <div className='div_attribute_value'>
                        {
                          productAttributes.items
                                && productAttributes.items.filter(_ => _.product_attribute == item.product_attribute).map((fieldItem)=>{
                                  const currentProductVariation = productVariationsAttributes
                                    .filter(_ => _.product_family_attribute === item.id
                                     && _.product_attribute_value === fieldItem.id)
                                  let isChecked = false
                                  let product_variation = 0

                                  if(currentProductVariation.length > 0) {
                                    isChecked = true
                                    product_variation = currentProductVariation[0].product_variation
                                  }

                                  return (
                                    <>
                                      <Checkbox
                                        attribute_id={item.id}
                                        checked={isChecked} item_id={fieldItem.id} label={`${fieldItem.display_value}`}
                                        onChange={_handleAttributeValueChange}
                                        product_variation={product_variation}/><br/>
                                    </>
                                  )
                                })
                        }
                      </div>
                    </Grid.Column>
                  </Grid>
                </>
              ))
            }
            {
              error && (
                <Form.Group widths='equal'>
                  <Form.Field>
                    <FormError message={error}/>
                  </Form.Field>
                </Form.Group>
              )
            }
          </Segment>

          <Segment className='p40 variation_table'>
            <Header as='h3' className='section-info-header'>Variations</Header>
            <label>Modify your variations or click on the edit button the modify the details. </label>
            <Table
              basic='very' className='table-primary mt16' selectable
              sortable unstackable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>COMBINATION</Table.HeaderCell>
                  <Table.HeaderCell>SKU</Table.HeaderCell>
                  <Table.HeaderCell>PRICE</Table.HeaderCell>
                  <Table.HeaderCell>STOCK</Table.HeaderCell>
                  <Table.HeaderCell>ACTIVE</Table.HeaderCell>
                  <Table.HeaderCell>OPTIONS</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {
                  productVariations.items.map((item)=>(
                    <>
                      <Table.Row data-item-id={item.id}>
                        <Table.Cell>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ display: 'flex' }}>
                              <Image
                                className='profile' rounded size='mini'
                                src={item.images.length > 0 && item.images[0].filepath || defaultImageUrl}/>&nbsp;&nbsp;&nbsp;
                            </div>
                            <div>
                              {
                                item.attributes.map((item) => {
                                  return (
                                    <p key={item.id}><span>{item.product_family_attribute} : {item.product_attribute_value}</span></p>
                                  )
                                })
                              }
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell><Input name='sku_id' onChange={_handleVariationValueChange} value={item.sku_id}/></Table.Cell>
                        <Table.Cell><Input
                          name='price' onChange={_handleVariationValueChange} type='number'
                          value={item.price}/></Table.Cell>
                        <Table.Cell><Input
                          name='stock' onChange={_handleVariationValueChange} type='number'
                          value={item.stock}/></Table.Cell>
                        <Table.Cell><Checkbox checked={item.is_active} name='is_active' onChange={_handleVariationValueChange}/></Table.Cell>
                        <Table.Cell><Popup
                          content='Edit' inverted position='bottom center'
                          trigger={
                            <Button
                              basic
                              data-item-id={item.id} data-option-name='edit'
                              icon='edit' onClick={_handleRowOptionClick}/>
                          }/><Popup
                          content='Delete' inverted position='bottom center'
                          trigger={
                            <Button
                              basic
                              color='red' data-item-id={item.id}
                              data-option-name='delete' icon='trash alternate' onClick={_handleRowOptionClick}/>
                          }/></Table.Cell>
                      </Table.Row>
                    </>
                  ))
                }
              </Table.Body>
            </Table>

            <DeleteConfirmationForm/>
            <ModalDelete
              duckDetail={productVariationsDetailDuck}
              onClose={_handleCloseDeleteModal}
              open={openDeleteModal}/>

            <ProductVariationsFormModal/>
          </Segment>

        </>

        {
          error && (
            <Form.Group widths='equal'>
              <Form.Field>
                <FormError message={error}/>
              </Form.Field>
            </Form.Group>
          )
        }
      </Form>
    </>
  )
}

export default compose(
  connect(
    ({ category, ...state }) => {
      const productFamiliesDetail = productFamiliesDetailDuck.selectors.detail(state)
      const productVariations = productVariationDuck.selectors.list(state)
      const productVariationsAttributes = []

      productVariations.items && productVariations.items.forEach(_attributeValue => {
        _attributeValue.attributes.forEach(_values => {
          productVariationsAttributes.push(_values)
        })
      })

      return {
        productFamiliesDetail,
        category,
        productAttributes          : productAttributeValueDetailDuck.selectors.detail(state),
        productClassesDetail       : productClassesDetailDuck.selectors.detail(state),
        productVariations          : productVariations,
        productVariationsDetail    : productVariationsDetailDuck.selectors.detail(state),
        productVariationsAttributes: productVariationsAttributes
      }
    },
    {
      getProductVariations: productVariationDuck.creators.get,
      getProductClasses   : productClassesDetailDuck.creators.get,
      getProductAttributes: productAttributeValueDetailDuck.creators.get,
      setProductVariations: productVariationsDetailDuck.creators.setItem,
      setItem             : productFamiliesDetailDuck.creators.setItem,
      post                : productFamiliesDetailDuck.creators.post,
      postProductVariation: productVariationsDetailDuck.creators.post,
      putProductVariation : productVariationsDetailDuck.creators.put,
      put                 : productFamiliesDetailDuck.creators.put,
      resetItem           : productFamiliesDetailDuck.creators.resetItem
    }
  ),
  reduxForm({
    form                    : formId,
    destroyOnUnmount        : false,
    forceUnregisterOnUnmount: true
  })
)(ProductFormSecond)

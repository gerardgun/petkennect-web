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

import './styles.scss'

const ProductFormSecond = props => {
  const {
    productAttributes,
    productClassesDetail,
    productVariations,
    productFamiliesDetail,
    error, handleSubmit, reset // redux-form
  } = props

  const [ openDeleteModal, { _handleOpen: _handleOpenDeleteModal, _handleClose: _handleCloseDeleteModal } ] = useModal()

  useEffect(() => {
    props.getProductAttributes()
    props.getProductVariations(productFamiliesDetail.item.id)
  }, [])

  useEffect(()=> {
    if(productFamiliesDetail.item.family)
      props.getProductClasses(productFamiliesDetail.item.family.id)
  }, [ productFamiliesDetail.status ])

  const _handleRowOptionClick = e => {
    e.stopPropagation()
    const itemId = +e.currentTarget.dataset.itemId
    const optionName = e.currentTarget.dataset.optionName
    const item = productVariations.items.find(({ id }) => id === itemId)
    if(optionName === 'delete') {
      props.setItem(item, 'DELETE')
      _handleOpenDeleteModal()
    }
    else {
      props.setProductVariations(item, 'UPDATE')
    }
  }

  const renderAttributeAndValue = attributeArray =>{
    return (
      attributeArray.map((item) => {
        return (
          <p key={item.id}><span>{item.product_family_attribute} : {item.product_attribute_value}</span></p>
        )
      })
    )
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={reset} onSubmit={handleSubmit}>

        <>
          <Segment className='p40'>
            <Header as='h3' className='section-info-header'>Attributes</Header>
            <Form.Group widths='equal'>
              {
                productClassesDetail.item.family_attributes && productClassesDetail.item.family_attributes.map((item) => (
                  <>
                    <Field
                      checked={true}
                      component={FormField}
                      control={Checkbox}
                      disabled={true}

                      label={`${item.attribute.name}`}
                      name={item.id}
                      type='checkbox'/>
                  </>
                ))
              }
            </Form.Group>
          </Segment>

          <Segment className='p40'>
            <Header as='h3' className='section-info-header'>Values</Header>
            <label>Select the values to generate variations </label>
            {
              productClassesDetail.item.family_attributes && productClassesDetail.item.family_attributes.map((item) => (
                <>
                  <Grid  className='grid_attribute_value' >
                    <Grid.Column className='display_flex' width={2}>
                      <label><b>{item.attribute.name}</b></label>
                    </Grid.Column>
                    <Grid.Column style={{ padding: '0px' }} width={14}>
                      {/* <Form.Group widths='equal'> */}
                      <div className='div_attribute_value'>
                        {
                          productAttributes.items.length > 0
                                && productAttributes.items.filter(_ => _.product_attribute == item.attribute.id).map((fieldItem)=>(
                                  <>
                                    <Field
                                      component={FormField}
                                      control={Checkbox}
                                      label={`${fieldItem.display_value}`}
                                      name={fieldItem.id}
                                      type='checkbox'/>
                                  </>
                                ))
                        }
                      </div>
                      {/* </Form.Group> */}
                    </Grid.Column>
                  </Grid>
                </>
              ))
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
                  productVariations.items.map((item,index)=>(
                    <>
                      <Table.Row key={index}>
                        <Table.Cell><div className='detail_table_row_item'><div className='div_image'><Image rounded size='mini' src={item.Image || defaultImageUrl}/>&nbsp;&nbsp;{item.name}&nbsp;&nbsp;&nbsp;</div><div>{renderAttributeAndValue(item.attributes)}</div></div></Table.Cell>
                        <Table.Cell><Input value={item.sku_id}/></Table.Cell>
                        <Table.Cell><Input type='number' value={item.price}/></Table.Cell>
                        <Table.Cell><Input type='number' value={item.stock}/></Table.Cell>
                        <Table.Cell><Checkbox checked={item.is_active}/></Table.Cell>
                        <Table.Cell><Popup
                          content='Edit' inverted
                          key={index} position='bottom center'
                          trigger={
                            <Button
                              basic
                              data-item-id={item.id} data-option-name='edit'
                              icon='edit' onClick={_handleRowOptionClick}/>
                          }/><Popup
                          content='Delete' inverted
                          key={item.id} position='bottom center'
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

      return {
        productFamiliesDetail,
        category,
        productAttributes   : productAttributeValueDetailDuck.selectors.detail(state),
        productClassesDetail: productClassesDetailDuck.selectors.detail(state),
        productVariations   : productVariationDuck.selectors.list(state)
      }
    },
    {
      getProductVariations: productVariationDuck.creators.get,
      getProductClasses   : productClassesDetailDuck.creators.get,
      getProductAttributes: productAttributeValueDetailDuck.creators.get,
      setProductVariations: productVariationsDetailDuck.creators.setItem,
      setItem             : productFamiliesDetailDuck.creators.setItem,
      post                : productFamiliesDetailDuck.creators.post,
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

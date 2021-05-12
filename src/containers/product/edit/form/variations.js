import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Field, formValueSelector, reduxForm } from 'redux-form'
import { Form, Input, Segment, Checkbox, Image, Grid, Popup, Button, Header } from 'semantic-ui-react'

import CheckboxGroup from '@components/Common/CheckboxGroup'
import ModalDelete from '@components/Modal/Delete'
import FormField from '@components/Common/FormField'
import FormError from '@components/Common/FormError'
import ProductVariationsFormModal from '@containers/product-variations/create'
import Table from '@components/Table'
import DeleteConfirmationForm from '@containers/product/form/deleteConfirmation'
import { defaultImageUrl } from '@lib/constants'
import { parseResponseError, syncValidate } from '@lib/utils/functions'
import productVariationListConfig from '@lib/constants/list-configs/product/variation'

import productDetailDuck from '@reducers/product/detail'
import productAttributeDuck from '@reducers/product/product-attribute'
import productFamilyDuck from '@reducers/product/family'
import productFamilyDetailDuck from '@reducers/product/family/detail'
import productOptionDuck from '@reducers/product/option'
import productOptionDetailDuck from '@reducers/product/option/detail'
import productVariationDetailDuck from '@reducers/product/product-variations/detail'
import productVariationDuck from '@reducers/product/product-variations'

const selector = formValueSelector('product')

const ProductEditVariationsForm = props => {
  const {
    change, error, handleSubmit, initialize, reset // redux-form
  } = props

  const detail = useSelector(productDetailDuck.selectors.detail)
  const dispatch = useDispatch()
  const params = useParams()
  const productAttributeList = useSelector(productAttributeDuck.selectors.list)
  const productFamilyDetail = useSelector(productFamilyDetailDuck.selectors.detail)
  const productFamilyList = useSelector(productFamilyDuck.selectors.list)
  const productOptionList = useSelector(productOptionDuck.selectors.list)
  const watchedAttributeIds = useSelector(state => selector(state, 'attribute_ids'))
  const watchedAttributes = useSelector(state => selector(state, 'attributes'))

  useEffect(() => {
    if(productAttributeList.items.length === 0)
      dispatch(
        productAttributeDuck.creators.get()
      )

    if(productFamilyList.items.length === 0)
      dispatch(
        productFamilyDuck.creators.get()
      )

    if(productOptionList.items.length === 0)
      dispatch(
        productOptionDuck.creators.get({
          product_id: params.id
        })
      )
  }, [])

  useEffect(() => {
    if(productFamilyList.status === 'GOT') {
      const productFamily = productFamilyList.items.find(({ id }) => id === detail.item.product_family)

      dispatch(
        productFamilyDetailDuck.creators.setItem(productFamily)
      )
    }
  }, [ productFamilyList.status ])

  useEffect(() => {
    if(productOptionList.status === 'GOT') {
      const attributeIds = productOptionList.items.map(({ product_attribute }) => product_attribute)

      change('attribute_ids', attributeIds)
    }
  }, [ productOptionList.status ])

  useEffect(() => {
    if(watchedAttributes) {
      const attributes = Object.entries(watchedAttributes)
        .filter(([ , attributeValueIds ]) => attributeValueIds.length > 0)
        .reduce((a, [ attributeId, attributeValueIds ]) => ({ ...a, [attributeId]: attributeValueIds }), {})

      const attributeIds = Object.keys(attributes)
      const attributeValueIds = Object.values(attributes)
      const combinations = attributeValueIds.length > 0 ? cartesian(...attributeValueIds) : []

      const variations = combinations.map(combination => {
        return {
          sku_id    : '',
          price     : 0.00,
          stock     : 0,
          is_active : true,
          attributes: [].concat(combination)
            .map((productAttributeValueId, index) => {
              const productAttributeId = parseInt(attributeIds[index], 10)
              const productAttribute = productAttributeList.items.find(({ id }) => id === productAttributeId)
              const productAttributeValue = productAttribute.values.find(({ id }) => id === productAttributeValueId)

              return {
                attribute_id           : productAttributeId,
                attribute_value_id     : productAttributeValueId,
                attribute_name         : productAttribute.name,
                attribute_value_display: productAttributeValue.value_display
              }
            })
        }
      })

      dispatch(
        productVariationDuck.creators.set({
          items: variations
        })
      )
    }
  }, [ watchedAttributes ])

  const cartesian = (...a) => {
    return a.reduce((a, b) => {
      return a.flatMap(d => b.map(e => [ d, e ].flat()))
    })
  }

  const getAttributeOptions = () => {
    let options = []

    if('attributes' in productFamilyDetail.item && productAttributeList.items.length > 0)
      options = productFamilyDetail.item.attributes
        .map(item => {
          const productAttribute = productAttributeList.items.find(({ id }) => id === item.product_attribute)

          return productAttribute
        })
        .map(item => ({ text: item.name, value: item.id }))

    return options
  }

  const _handleRowButtonClick = (button, item) => {
    if(button === 'edit') alert('Edit variation...')
  }

  const _handleSubmit = values => {
    return dispatch(productFamilyDetailDuck.creators.put({ id: detail.item.id, ...values }))
      .catch(parseResponseError)
  }

  const attributeOptions = useMemo(() => getAttributeOptions(), [ productFamilyDetail.item, productAttributeList.status ])

  return (
    // eslint-disable-next-line react/jsx-handler-names
    <Form onReset={reset} onSubmit={handleSubmit(_handleSubmit)}>

      <Segment style={{ padding: '2rem' }}>
        <Header as='h3'>Attributes</Header>

        <Form.Group widths='equal'>
          <Field
            component={FormField}
            control={CheckboxGroup}
            name='attribute_ids'
            options={attributeOptions}/>
        </Form.Group>
      </Segment>

      <Segment style={{ padding: '2rem' }}>
        <Header as='h3'>Values</Header>
        <span className='text-gray'>Select the values to generate variations</span>

        {
          Array.isArray(watchedAttributeIds) && (
            watchedAttributeIds
              .map(attributeId => {
                const productAttribute = productAttributeList.items.find(({ id }) => id === attributeId)

                return productAttribute
              })
              .map(item => (
                <Form.Group key={item.id}>
                  <Form.Field style={{ marginRight: '1rem' }}>
                    <label style={{ fontWeight: 'bold', paddingTop: '0.8rem' }}>{item.name}</label>
                  </Form.Field>
                  <Field
                    component={FormField}
                    control={CheckboxGroup}
                    name={`attributes[${item.id}]`}
                    options={
                      item.values.map(item => ({ text: item.value_display, value: item.id }))
                    }/>
                </Form.Group>
              ))
          )
        }
      </Segment>

      <Segment style={{ padding: '2rem' }}>
        <Header as='h3'>Variations</Header>
        <span className='text-gray'>Modify your variations or click on the edit button the modify the details</span>
        <br/>
        <br/>

        <Table
          config={productVariationListConfig}
          duck={productVariationDuck}
          onRowButtonClick={_handleRowButtonClick}/>
      </Segment>

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
  )
}

export default reduxForm({
  form: 'product'
})(ProductEditVariationsForm)

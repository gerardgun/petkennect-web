import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Form, FormField } from 'semantic-ui-react'
import { Field, reduxForm, getFormValues } from 'redux-form'
import { syncValidate } from '@lib/utils/functions'
import * as Yup from 'yup'

const ModalFilter = ({  duckList,duck, open, reset, options ,...props }) => {
  useEffect(() => {
    return  _handleReset
  }, [])

  const getEmptyFilters = () => {
    const filters = {}

    duckList.config.columns
      .filter(_column => Boolean(_column.filter))
      .forEach(_column => {
        if(_column.filter.range) {
          filters[_column.filter.lt] = ''
          filters[_column.filter.gt] = ''
        }
        if(_column.filter.selectable)
          filters[_column.filter.name] = ''
      })

    return  filters
  }

  const _handleSubmit = (values) => {
    props.dispatch(
      duck.creators.setFilters({
        ...getEmptyFilters(),
        ...values
      })
    )
    props.dispatch(
      duck.creators.get()
    )
    props.onClose()
  }

  const _handleReset = () => {
    props.dispatch(
      duck.creators.setFilters(
        getEmptyFilters()
      )
    )
    reset()

    duckList.config.columns
      .filter(_column => Boolean(_column.filter))
      .forEach(_column => {
        /* Why? Because a problem with semantic ui*/
        if(_column.filter.selectable)
          props.change(_column.filter.name, null)
      })
  }

  const _handleChangeDropdown = _column =>  (e,data)=> {
    props.change(_column.filter.name,data.value)
  }

  const _renderItemFilter  = (_column)=> {
    if(_column.filter.range)
      return (
        <div key={_column.name}>
          <Header as='h3'>{_column.display_name}</Header>
          <Form.Group widths='equal'>
            <Field
              component={FormField}
              control={Form.Input}
              label='Lower than'
              name={_column.filter.lt}
              placeholder={`Enter ${_column.display_name}`}
              type='number'/>
            <Field
              component={FormField}
              control={Form.Input}
              label='Greater than'
              name={_column.filter.gt}
              placeholder={`Enter ${_column.display_name}`}
              type='number'/>
          </Form.Group>
        </div>
      )
    if(_column.filter.selectable)
      return (
        <div key={_column.name}>
          <Form.Group widths='equal'>
            <Field component='input'  name={_column.filter.name} type='hidden'/>
            <Form.Field
              control={Form.Select}
              fluid
              label={_column.filter.label}
              onChange={_handleChangeDropdown(_column)}
              options={options[_column.name].map(_option => ({
                key  : _option.id,
                value: _option.id,
                text : `${_option.name}`
              }))}
              placeholder={`Select ${_column.filter.label}`}
              search
              value={props.formValues[_column.filter.name]}/>
          </Form.Group>
        </div>
      )

    return null
  }

  return (
    <Modal
      closeOnDimmerClick={false}
      onClose={props.onClose}
      open={open}
      size='tiny'>
      <Modal.Content>
        <Header content='Filters'/>
        {/* eslint-disable-next-line react/jsx-handler-names */}
        <Form  onSubmit={props.handleSubmit(_handleSubmit)}>
          {duckList.config.columns
            .filter(_column => Boolean(_column.filter))
            .map(_column =>_renderItemFilter(_column))}

          <Form.Group className='form-modal-actions' widths='equal'>
            <Form.Field>
              <Button
                content='Cancel' disabled={duckList.status === 'GETTING'} onClick={props.onClose}
                type='button'/>
              <Button
                content='Reset' disabled={duckList.status === 'GETTING'} onClick={_handleReset}
                type='button'/>

              <Button
                color='teal' content='Filter'
                disabled={duckList.status === 'GETTING'}
                icon='trash'
                loading={duckList.status === 'GETTING'}/>
            </Form.Field>
          </Form.Group>

        </Form>
      </Modal.Content>

    </Modal>
  )
}

ModalFilter.defaultProps = {
  duck   : null,
  open   : false,
  options: {},
  onClose: () => {}
}

export default compose(
  connect(
    (state, { duck }) => ({
      duckList     : duck.selectors.list(state),
      initialValues: {},
      form         : `filter-modal-form/${duck.store}`,
      formValues   : getFormValues(`filter-modal-form/${duck.store}`)(state) || {}
    }),
    dispatch => ({ dispatch })
  ),
  reduxForm({

    destroyOnUnmount  : false,
    enableReinitialize: true,
    validate          : values  => {
      const schema = {}

      return syncValidate(Yup.object().shape(schema), values)
    }
  })
)(ModalFilter)

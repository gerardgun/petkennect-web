import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Button, Header, Modal, Form, FormField } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { syncValidate } from '@lib/utils/functions'
import * as Yup from 'yup'

const ModalFilter = ({  duckList,duck, open, reset,...props }) => {
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
  }

  const _renderItemFilter  = (_column)=> {
    if(_column.filter.range)
      return (
        <div key={_column.name}>
          <Header as='h3'>{_column.display_name}</Header>
          <Form.Group widths='equal'>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Lower than'
              name={_column.filter.lt}
              placeholder={`Enter ${_column.display_name}`}
              type='number'/>
            <Field
              autoFocus
              component={FormField}
              control={Form.Input}
              label='Greater than'
              name={_column.filter.gt}
              placeholder={`Enter ${_column.display_name}`}
              type='number'/>
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
  onClose: () => {}
}

export default compose(
  connect(
    (state, { duck }) => ({
      duckList     : duck.selectors.list(state),
      initialValues: {},
      form         : `filter-modal-form/${duck.store}`
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

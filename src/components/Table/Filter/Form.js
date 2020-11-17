import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Input, Select } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'

const FilterForm = props => {
  const {
    duck,
    list,
    // redux-form
    handleSubmit
  } = props

  const getFilterNames = () => {
    return props.filterColumns
      .reduce((a, b) => a.concat(b.filter.name), [])
  }

  const _handleSubmit = values => {
    props.dispatch(
      duck.creators.removeFilters(...getFilterNames())
    )

    props.dispatch(
      duck.creators.get(values)
    )
  }

  const _handleReset = () => {
    props.dispatch(
      duck.creators.removeFilters(...getFilterNames())
    )

    props.dispatch(
      duck.creators.get()
    )
  }

  const _renderItemFilter = column => {
    return (
      <Form.Group key={column.name} widths='equal'>
        {
          column.filter.type === 'range' || column.filter.type === 'range_date' ? (
            <>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label={`${column.display_name} from`}
                name={column.filter.name[0]}
                placeholder={`Enter ${column.display_name}`}
                type={column.filter.type === 'range_date' ? 'date' : 'text'}/>
              <Field
                autoComplete='off'
                component={FormField}
                control={Input}
                label='To'
                name={column.filter.name[1]}
                placeholder={`Enter ${column.display_name}`}
                type={column.filter.type === 'range_date' ? 'date' : 'text'}/>
            </>
          ) : column.filter.type === 'dropdown' ? (
            <Field
              component={FormField}
              control={Select}
              label={column.display_name}
              multiple={column.filter.multiple == true ? true : false}
              name={column.filter.name}
              options={props.filterColumnSources[column.filter.name]}
              placeholder={`Select ${column.display_name}`}
              search
              selectOnBlur={false}/>
          ) : <span>Not valid filter type</span>
        }
      </Form.Group>
    )
  }

  return (
    <>
      {/* eslint-disable-next-line react/jsx-handler-names */}
      <Form onReset={_handleReset} onSubmit={handleSubmit(_handleSubmit)}>
        {
          props.filterColumns
            .map(item => _renderItemFilter(item))
        }

        <Form.Group widths='equal'>
          <Form.Field>
            <Button
              basic color='teal' content='Clear all filters'
              disabled={list.status === 'GETTING'} type='reset'/>

            <Button
              color='teal' content='Apply'
              disabled={list.status === 'GETTING'}
              icon='filter'
              loading={list.status === 'GETTING'}/>
          </Form.Field>
        </Form.Group>

      </Form>
    </>
  )
}

FilterForm.defaultProps = {
  duck: null
}

export default compose(
  connect(
    (state, { duck }) => ({
      list               : duck.selectors.list(state),
      filterColumns      : duck.selectors.filterColumns(state),
      filterColumnSources: duck.selectors.filterColumnSources(state),
      // for redux form
      initialValues      : {
        ...duck.selectors.filters(state)
      },
      form: `${duck.store}/form-filter`
    }),
    dispatch => ({ dispatch })
  ),
  reduxForm({
    destroyOnUnmount  : true,
    enableReinitialize: true
  })
)(FilterForm)

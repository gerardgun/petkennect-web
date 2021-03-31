import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector, useStore } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { Button, Form, Input, Select } from 'semantic-ui-react'

import FormField from '@components/Common/FormField'
import { getFilterColumnSources, getFilterColumns } from './../helpers'

const FilterForm = props => {
  const {
    config,
    duck,
    // redux-form
    handleSubmit, initialize
  } = props

  useEffect(() => {
    initialize({
      ...filters
    })
  }, [])

  const dispatch = useDispatch()
  const store = useStore()
  const filters = useSelector(duck.selectors.filters)
  const list = useSelector(duck.selectors.list)

  const getFilterNames = () => {
    return filterColumns
      .reduce((a, b) => a.concat(b.filter.name), [])
  }

  const _handleSubmit = values => {
    dispatch(
      duck.creators.removeFilters(...getFilterNames())
    )

    dispatch(
      duck.creators.get(values)
    )
  }

  const _handleReset = () => {
    dispatch(
      duck.creators.removeFilters(...getFilterNames())
    )

    dispatch(
      duck.creators.get()
    )
  }

  const filterColumns = useMemo(() => getFilterColumns(config), [])
  const filterColumnSources = useMemo(() => getFilterColumnSources(config, store.getState()), [])

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
              name={column.filter.name}
              options={filterColumnSources[column.filter.name]}
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
          filterColumns
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

export default reduxForm({
  form            : `filter-${parseInt(Math.random() * 1000)}`,
  destroyOnUnmount: true
})(FilterForm)

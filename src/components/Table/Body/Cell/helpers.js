import React from 'react'
import _get from 'lodash/get'
import { Image, Label } from 'semantic-ui-react'

import { defaultImageUrl } from '@lib/constants'

const getContent = (item, column) => {
  const cell = _get(item, column.name, null)

  if(cell === null || cell === undefined)
    return <span style={{ color: 'grey' }}>-</span>
  else if(typeof column.formatter === 'function')
    return column.formatter(cell, item)
  else if(column.type === 'boolean')
    return getContentBoolean(cell)
  else if(column.type === 'boolean_active')
    return getContentBooleanActive(cell)
  // improve
  else if(column.type === 'color')
    return getContentColor(cell)
  // improve
  else if(column.type === 'image')
    return getContentImage(cell)
  else if(column.type === 'date')
    return getContentDate(cell)
  else if(column.type === 'datetime')
    return getContentDatetime(cell)
  else if(column.type === 'money')
    return getContentMoney(cell)
  else if(column.type === 'string')
    return cell
}

const getContentBoolean = cell => {
  return cell ? 'Yes' : 'No'
}

const getContentBooleanActive = cell => {
  return (
    <Label
      circular color={cell ? 'green' : 'red'} horizontal
      style={{ minWidth: '6rem' }}>{cell ? 'Active' : 'Inactive'}</Label>
  )
}

const getContentColor = cell => {
  return (
    <Label
      horizontal
      style={{ minWidth: '4rem', height: '2rem', background: cell }}/>
  )
}

const getContentDate = cell => {
  return new Date(cell).toLocaleDateString('en-US')
}

const getContentDatetime = cell => {
  return new Date(cell).toLocaleString('en-US')
}

const getContentImage = cell => {
  return (
    <Image rounded size='mini' src={cell || defaultImageUrl}/>
  )
}

const getContentMoney = cell => {
  return new Intl.NumberFormat('en-US', {
    style                : 'currency',
    currency             : 'USD',
    minimumFractionDigits: 2
  })
    .format(cell)
}

export { getContent }

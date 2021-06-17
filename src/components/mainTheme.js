import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import tenantDetailDuck from '@reducers/tenant/detail'

const dispatch = useDispatch()
const detail = useSelector(tenantDetailDuck.selectors.detail)
  useEffect(() => {
    console.log('gettttttttt')
      dispatch(
        tenantDetailDuck.creators.get()
      )
}, [])

console.log('detail', detail)

const theme = {
  buttonMenuColor: 'violet',
  headerTextColor: 'teal',
  headringsColor: 'teal',
}

export default theme;
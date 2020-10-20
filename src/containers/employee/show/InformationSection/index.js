import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import EmployeeInformationShow from './show'
import EmployeeInformationEdit from './edit'

import employeeDetailDuck from '@reducers/employee/detail'

const EmployeeInformation = ({ employeeDetail }) => {
  return employeeDetail.mode === 'UPDATE' ? <EmployeeInformationEdit/> : <EmployeeInformationShow employeeDetail={employeeDetail}/>
}

export default compose(
  connect(
    state => ({
      employeeDetail: employeeDetailDuck.selectors.detail(state)
    }), {
      setItem: employeeDetailDuck.creators.setItem
    }
  )
)(EmployeeInformation)

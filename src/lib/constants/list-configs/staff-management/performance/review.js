import React from 'react'
import { Link } from 'react-router-dom'
export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Period',
      name        : 'period',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Date',
      name        : 'date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Manager',
      name        : 'manager',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Action',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : ()=>{
        return (
          <>
            <Link style={{ color: 'blue' , fontWeight: 'bold' }}to=''>{'Review & Esign'}</Link>
          </>)
      }
    },
    {
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : (cell)=>{
        return (<>
          {
            cell === 'Completed' && <label style={{ color: 'green' , fontWeight: 'bold' }}>{cell}</label>

          }
          {
            cell === 'Pending' && <label style={{ color: 'red', fontWeight: 'bold' }}>{cell}</label>

          }

        </>)
      }
    }

  ]
}

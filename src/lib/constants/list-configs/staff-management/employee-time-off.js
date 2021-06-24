import React from 'react'
export default {
  search_enabled: false,
  columns       : [
    {
      display_name: 'Type',
      name        : 'leave_type',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'From',
      name        : 'start_date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'To',
      name        : 'end_date',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
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
            cell === 'Approved' && <label style={{ color: 'green' , fontWeight: 'bold' }}>{cell}</label>

          }
          {
            cell === 'Not Approved' && <label style={{ color: 'red', fontWeight: 'bold' }}>{cell}</label>

          }
          {
            cell === 'Pending' && <label style={{ color: 'blue', fontWeight: 'bold' }}>{cell}</label>

          }

        </>)
      }
    }

  ]
}

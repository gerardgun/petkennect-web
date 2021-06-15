import React from 'react'
export default {
  search_enabled: false,
  columns       : [

    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : 4,
      align       : 'left',
      sort        : false ,
      formatter   : (cell)=>{
        return (
          <label style={{ color: 'blue' , fontWeight: 'bold' }}>{cell}</label>
        )
      }
    },
    {
      display_name: 'Data Submitted',
      name        : 'data_submitted',
      type        : 'string',
      width       : null,
      align       : 'center',
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
            cell === 'Declined' && <label style={{ color: 'red', fontWeight: 'bold' }}>{cell}</label>

          }
          {
            cell === 'Pending' && <label style={{ color: 'blue', fontWeight: 'bold' }}>{cell}</label>

          }

        </>)
      }
    }

  ]
}


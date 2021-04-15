import React from 'react'
import { Link } from 'react-router-dom'

export default {
  columns: [
    {
      display_name: 'Date',
      name        : 'reserved_at',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    },
    {
      display_name: 'Service',
      name        : 'service',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Location',
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Res. Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'type',
        source_store: [
          {
            value: 'type1',
            text : 'type1'
          },
          {
            value: 'type2',
            text : 'type2'
          }
        ]
      }
    },
    {
      display_name: 'Yard',
      name        : 'yard_type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Run',
      name        : 'run',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Addons',
      name        : 'addons',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : true,
      formatter   : (cell) => {
        return (
          <span>
            <Link>
              {cell}
            </Link>

          </span>)
      }
    },
    {
      display_name: 'Time In',
      name        : 'checkin_time',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Time Out',
      name        : 'checkout_at',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: '',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Check In',
          name        : 'check_in',
          icon        : 'arrow right',
          color       : 'green'
        }
      ]
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          icon        : 'edit',
          display_name: 'Edit Reservation',
          name        : 'edit_reserve'
        },
        {
          icon        : 'sticky note',
          display_name: 'Add Notes',
          name        : 'add_notes'
        },
        {
          icon        : 'plus',
          display_name: 'Add Interaction',
          name        : 'add_interaction'
        },
        {
          icon        : 'file pdf',
          display_name: 'Add/Edit Report Card',
          name        : 'add_edit_report_card'
        },
        {
          icon        : 'clipboard list icon',
          display_name: 'Add-On Services',
          name        : 'add_on'
        },
        {
          icon        : 'print',
          display_name: 'Print Run Card',
          name        : 'print_run_card'
        },
        {
          icon        : 'trash alternate outline',
          display_name: 'Delete Reservation',
          name        : 'delete_reservation'
        }
      ]
    }
  ]
}

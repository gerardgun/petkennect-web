import React from 'react'
import { Link } from 'react-router-dom'

export default {

  actions: [
    {
      display_name: 'Add Reservation',
      name        : 'new_reservation',
      color       : 'teal',
      icon        : 'add'
    }
  ],

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
      display_name: 'Addon',
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
      display_name: 'In/Out',
      name        : 'checkin_time',
      type        : 'string',
      width       : 1,
      align       : 'center',
      sort        : true,
      formatter   : (cell,row) => {
        return (
          <>
            <span>

              {row.checkin_time}
            </span>
            <span style={{ display: 'block' }}>
              {row.checkout_at}
            </span>
          </>)
      }
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
      display_name: 'Action',
      name        : 'custom_name',
      type        : 'dropdown',
      options     : [
        {
          icon        : 'edit',
          display_name: 'Edit Reserve',
          name        : 'edit_reserve'
        },
        {
          icon        : 'sticky note outline',
          display_name: 'Add Note',
          name        : 'add_note'
        },
        {
          icon        : 'add',
          display_name: 'Add Interaction',
          name        : 'add_interaction'
        },
        {
          icon        : 'server',
          display_name: 'Add-on Services',
          name        : 'add_on'
        },
        {
          icon        : 'file text',
          display_name: 'Add/Edit Logs',
          name        : 'edit_logs'
        },
        {
          icon        : 'file pdf',
          display_name: 'Add/Edit Report Card',
          name        : 'report_cards'
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

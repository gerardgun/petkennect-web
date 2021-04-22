import React from 'react'
import { Link } from 'react-router-dom'

export default {
  actions: [
    {
      display_name: 'Add Reservation',
      name        : 'add_reservation',
      color       : 'teal',
      icon        : 'add'
    }
  ],

  columns: [
    {
      display_name: 'DATE',
      name        : 'reserved',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'LOCATION',
      name        : 'location_code',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'location__code'
    },
    {
      display_name: 'Check In/Out',
      name        : 'check_in_date',
      type        : 'date',
      width       : 1,
      align       : 'center',
      sort        : true,
      formatter   : (cell,row) => {
        return (
          <>
            <span>
              {row.check_in_date}
            </span>
            <span style={{ display: 'block' }}>
              {row.checkout_at}
            </span>
          </>)
      }
    },

    {
      display_name: 'Nights',
      name        : 'night',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type',
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
      display_name: '',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Check In',
          name        : 'check_in',
          color       : 'green',
          icon        : 'arrow right'
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

import React from 'react'
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
      display_name: 'Program',
      name        : 'program',
      type        : 'string',
      align       : 'left',
      width       : null,
      sort        : false,
      filter      : {
        type        : 'dropdown',
        name        : 'packageName',
        source_store: [
          {
            value: 'package1',
            text : 'Package1'
          },
          {
            value: 'package2',
            text : 'Package2'
          }
        ]
      }
    },
    {
      display_name: 'Location',
      name        : 'location_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Res Type',
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
      display_name: 'Status',
      name        : 'status',
      type        : 'string',
      width       : 1,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Time In/Out',
      name        : 'time_in',
      type        : 'string',
      width       : 1,
      align       : 'center',
      sort        : true,
      formatter   : (cell,row) => {
        return (
          <>
            <span>
              {row.time_in}
            </span>
            <span style={{ display: 'block' }}>
              {row.time_out}
            </span>
          </>)
      }
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'action-button',
      options     : [
        {
          display_name: 'Check In',
          name        : 'check_in',
          icon        : 'arrow right',
          color       : 'green',
          type        : 'button'
        },
        {
          display_name   : '',
          name           : 'custom_name',
          type           : 'dropdown',
          dropdownOptions: [
            {
              icon        : 'edit',
              display_name: 'Edit Reservation',
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
  ]
}

import React from 'react'
import { FaFileSignature } from 'react-icons/fa'

export default {
  base_uri: null,
  row     : {
    options        : [ ],
    dropdownOptions: [
      {
        icon        : 'calendar alternate outline icon',
        display_name: 'Add Reservation',
        name        : 'reservation'
      },
      {
        icon        : 'trophy',
        display_name: 'Training Performance',
        name        : 'view_performance'
      },
      {
        icon        : 'address card outline',
        display_name: 'Report Cards',
        name        : 'view_report_card'
      },
      {
        iconTag     : <><FaFileSignature/></>,
        display_name: 'Digitally Sign Agreement in Person',
        name        : 'digitally_sign'
      },
      {
        icon        : 'mail',
        display_name: 'Contract to Agreement',
        name        : 'email'
      },
      {
        icon        : 'print',
        display_name: 'Print Agreement',
        name        : 'email'
      }
    ]
  },
  columns: [
    {
      display_name: 'Package',
      name        : 'package_name',
      type        : 'string',
      width       : null,
      align       : 'left',
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
      display_name: 'Trainer',
      name        : 'trainer',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Start Date',
      name        : 'starting_date',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false,
      filter      : {
        type: 'range_date',
        name: [ 'created_at__gt', 'created_at__lt' ]
      }
    },
    {
      display_name: 'Type',
      name        : 'reason',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
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
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}

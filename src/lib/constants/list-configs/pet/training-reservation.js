export default {
  base_uri: null,
  row     : {
    options        : [ ],
    dropdownOptions: [
      {
        icon        : 'edit',
        display_name: 'Edit Reserve',
        name        : 'edit_reserve'
      },
      {
        icon        : 'edit outline',
        display_name: 'Edit Note',
        name        : 'edit_note'
      },
      {
        icon        : 'file pdf',
        display_name: 'Report Cards',
        name        : 'report_cards'
      },
      {
        icon        : 'list icon',
        display_name: 'Training Logs',
        name        : 'training_logs'
      }
    ]
  },
  columns: [
    {
      display_name: 'Date',
      name        : 'reserved_at',
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
      display_name: 'Package',
      name        : 'package',
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
      display_name: 'Visit Type',
      name        : 'type',
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
      display_name: 'Trainer',
      name        : 'trainer',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Location',
      name        : 'location_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Kennel',
      name        : 'run',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}

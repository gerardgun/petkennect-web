export default {
  base_uri: null,
  row     : {
    options        : [ ],
    dropdownOptions: [
      {
        display_name: 'Report Cards',
        name        : 'report_cards'
      },
      {
        display_name: 'Training Logs',
        name        : 'training_logs'
      }
    ]
  },
  columns: [
    {
      display_name: 'Date',
      name        : 'date',
      type        : 'date', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Package Name',
      name        : 'package_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Type',
      name        : 'type',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
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
      name        : 'location',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Run',
      name        : 'run',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }

  ]
}

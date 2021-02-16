
export default {
  base_uri      : null,
  search_enabled: false,

  row: {
    options          : [],
    radioButtonOption: [
      {
        headerName     : 'Select',
        radioButtonName: 'training_group_class'
      }
    ]
  },
  columns: [
    {
      display_name: 'Class Name',
      name        : 'class_name',
      type        : 'string',
      align       : 'left',
      width       : null

    },

    {
      display_name: 'Start Date',
      name        : 'start_date',
      type        : 'date',
      align       : 'left',
      width       : null

    },

    {
      display_name: 'Time',
      name        : 'time',
      width       : null,
      type        : 'time',
      align       : 'left'

    },

    {
      display_name: 'Frequency',
      name        : 'frequency',
      type        : 'string',
      align       : 'left',
      width       : null

    },
    {
      display_name: 'Ends',
      name        : 'ends',
      type        : 'date',
      align       : 'left',
      width       : null

    },
    {
      display_name: 'Trainer',
      name        : 'trainer',
      type        : 'string',
      align       : 'left',
      width       : null

    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'string',
      align       : 'left',
      width       : null

    }

  ]
}

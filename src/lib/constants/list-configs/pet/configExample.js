import petBreedDuck from '@reducers/pet/breed'

export default {
  search_placeholder: 'Search',
  search_enabled    : true,
  selector_enabled  : false,
  actions           : [
    {
      display_name: 'Create New Reason',
      name        : 'create',
      color       : 'teal'
    }
  ],
  options: {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      }
    ],
    single: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download',
        color       : 'red',
        disable     : item => item.is_client_notified
      }
    ],
    multiple: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download',
        color       : 'red',
        disable     : items => items.length === 2
      }
    ]
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'first_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      sort_name   : 'service_plan__service__name',
      formatter   : (cell, row) => cell + row,
      filter      : {
        type: 'range_date',
        name: [
          'created_at__gt',
          'created_at__lt'
        ]
      }
    },
    {
      filter: {
        type   : 'dropdown',
        name   : 'packageName',
        options: [
          {
            value: true,
            text : 'Active'
          },
          {
            value: false,
            text : 'Inactive'
          }
        ]
      }
    },
    {
      filter: {
        type   : 'dropdown',
        name   : 'breed__id',
        options: petBreedDuck.store
      }
    },
    {
      display_name: 'Name',
      name        : 'button_name_sample',
      type        : 'button',
      width       : null,
      align       : 'left',
      options     : [
        {
          display_name: 'Review',
          name        : 'review',
          disable     : item => !item.is_client_notified,
          // button props
          color       : 'teal',
          content     : 'Review',
          icon        : 'file pdf outline'
        }
      ]
    },
    {
      display_name: 'Dropdown example',
      name        : 'dropdown_name_sample',
      type        : 'dropdown',
      width       : null,
      align       : 'left',
      options     : [
        {
          display_name: 'Review',
          name        : 'review',
          disable     : item => !item.is_client_notified,
          // dropdown option props
          icon        : 'mail'
        }
      ]
    }
  ]
}

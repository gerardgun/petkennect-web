
export default {
  base_uri          : null,
  search_placeholder: 'Search',
  options           : [
    {
      display_name: 'Download',
      name        : 'download',
      icon        : 'download'
    },
    {
      display_name: 'Print',
      name        : 'print',
      icon        : 'print'
    },
    {
      display_name: 'Delete Client',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : true,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Program',
      name        : 'program',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'program',
        source_store: [
          {
            value: 'Boarding',
            text : 'Boarding'
          },
          {
            value: 'DayCamp',
            text : 'DayCamp'
          },
          {
            value: 'Grooming',
            text : 'Grooming'
          },
          {
            value: 'Training',
            text : 'Training'
          }

        ]
      }
    },
    {
      display_name: 'Sub Category',
      name        : 'sub_category',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true

    },
    {
      display_name: 'Package Name',
      name        : 'package_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true

    },
    {
      display_name: 'Sort',
      name        : 'sort',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Type',
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
            value: 'Service',
            text : 'Service'
          },
          {
            value: 'Retail',
            text : 'Retail'
          }

        ]
      }
    },
    {
      display_name: 'Price',
      name        : 'price',
      type        : 'number',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Description',
      name        : 'description',
      width       : null,
      type        : 'string',
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Send Contract',
      name        : 'contract',
      type        : 'string',
      width       : null,
      align       : 'center',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'Send Contract',
        source_store: [
          {
            value: 'Yes',
            text : 'Yes'
          },
          {
            value: 'NO',
            text : 'No'
          }

        ]
      }

    },

    {
      display_name: 'Status',
      name        : 'status',
      type        : 'boolean_active',
      width       : null,
      align       : 'left',
      sort        : true,
      filter      : {
        type        : 'dropdown',
        name        : 'status',
        source_store: [
          {
            value: 'active',
            text : 'Active'
          },
          {
            value: 'InActive',
            text : 'InActive'
          }

        ]
      }
    },
    {
      display_name: '# of Days',
      name        : 'of_days',
      width       : null,
      type        : 'number',
      align       : 'center',
      sort        : true
    }
  ]
}

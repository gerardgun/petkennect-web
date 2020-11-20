export default {
  base_uri: null,
  options : [
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
      display_name: 'Delete Service',
      name        : 'delete',
      icon        : 'trash alternate outline',
      is_multiple : false,
      color       : 'red'
    }
  ],
  row: {
    options: []
  },
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type',
      type        : null,
      width       : null,
      align       : 'left',
      sort        : true,
      formatter   : cell => {
        let type_str = 'Custom'

        if(cell === 'B')
          type_str = 'Boarding'
        else if(cell === 'D')
          type_str = 'DayCamp'
        else if(cell === 'G')
          type_str = 'Grooming'
        else if(cell === 'D')
          type_str = 'Training'

        return type_str
      }
    },
    {
      display_name: 'Plans',
      name        : 'plans',
      type        : 'number',
      width       : null,
      align       : 'left',
      formatter   : cell => {
        let plans_str = 'No plans'

        if(cell && cell.length > 0) {
          const activePlans = cell.filter(item => item.is_active)

          plans_str = `${activePlans.length}/${cell.length} active plans`
        }

        return plans_str
      }
    },
    {
      display_name: 'Addons',
      name        : 'addons.length',
      type        : 'number',
      width       : null,
      align       : 'left',
      formatter   : cell => {
        let addons_str = 'No addons'

        if(cell && cell.length > 0) {
          const activeAddons = cell.filter(item => item.is_active)

          addons_str = `${activeAddons.length}/${cell.length} active addons`
        }

        return addons_str
      }
    },
    {
      display_name: 'Active',
      name        : 'is_active',
      type        : 'boolean_active',
      width       : null,
      align       : 'left'
    }
  ]
}

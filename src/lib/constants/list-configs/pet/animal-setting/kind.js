import React from 'react'

export default {
  actions: [
    {
      display_name: 'Add Species',
      name        : 'create',
      color       : 'teal',
      icon        : 'add'
    }
  ],
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
      type        : 'string',
      align       : 'left',
      sort        : true,
      sort_name   : 'pet__name'
    },
    {
      display_name: 'Locations',
      name        : 'locations',
      formatter   : cell => {
        let locationNames = <span className='text-gray'>No related locations</span>

        if(cell.length > 0)
          locationNames = cell
            .map(({ name }) => name)
            .join(', ')

        return locationNames
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      width       : 4,
      options     : [
        {
          display_name: 'View Vaccination List',
          name        : 'view',
          icon        : 'medkit',
          color       : 'blue'
        },
        {
          display_name: 'Edit Species',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        },
        {
          display_name: 'Delete Species',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'grey'
        }
      ]
    }
  ]
}

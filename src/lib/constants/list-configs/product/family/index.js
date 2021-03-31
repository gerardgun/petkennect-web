import { ProductFamilyType } from '@lib/constants/product'

export default {
  columns: [
    {
      display_name: 'Name',
      name        : 'name',
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
      sort        : false,
      formatter   : cell => ProductFamilyType[cell]
    },
    {
      display_name: 'Attributes',
      name        : 'family_attributes',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false,
      formatter   : cell => {
        let attributeNames = '-'

        if(cell.length > 0)
          attributeNames = cell
            .map(({ attribute }) => attribute.name)
            .join(', ')

        return attributeNames
      }
    },
    {
      display_name: 'Actions',
      name        : 'custom_name',
      type        : 'button',
      options     : [
        {
          display_name: 'Delete Product',
          name        : 'delete',
          icon        : 'trash alternate outline',
          color       : 'red'
        }
      ]
    }
  ]
}

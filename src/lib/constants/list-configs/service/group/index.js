import { GroupType } from '@lib/constants/service'

export default {
  columns: [
    {
      display_name: 'Service Group Name',
      name        : 'name',
      type        : 'string'
    },
    {
      display_name: 'Type',
      name        : 'type',
      formatter   : cell => {
        return GroupType[cell]
      }
    },
    {
      display_name: 'Actions',
      type        : 'button',
      options     : [
        {
          display_name: 'Edit Group',
          name        : 'edit',
          icon        : 'edit outline',
          color       : 'teal'
        }
      ]
    }
  ]
}

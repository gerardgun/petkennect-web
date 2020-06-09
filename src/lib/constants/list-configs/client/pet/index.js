export default {
  base_uri: null,
  row     : {
    // options: [
    //   {
    //     display_name: 'Send reminder',
    //     name        : 'send_reminder',
    //     icon        : 'paper plane outline'
    //   },
    //   {
    //     display_name: 'View Incident Report',
    //     name        : 'view_incident_report',
    //     icon        : 'search plus'
    //   }
    // ]
    options: [
      {
        display_name: 'Edit',
        name        : 'edit',
        icon        : 'edit outline'
      },
      {
        display_name: 'Delete',
        name        : 'delete',
        icon        : 'trash alternate outline'
      }
    ]
  },
  columns: [
    {
      display_name: 'Pet Name',
      name        : 'name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Breed',
      name        : 'breed_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Current',
      name        : 'current',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Retired',
      name        : 'retired',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Reason',
      name        : 'reason',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Day Camp',
      name        : 'day_camp',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Sex',
      name        : 'sex',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}

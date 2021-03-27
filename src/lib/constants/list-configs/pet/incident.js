import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentTypeDuck from '@reducers/pet/incident-type'

export default {
  search_enabled: false,
  options       : {
    basic: [
      {
        display_name: 'Download',
        name        : 'download',
        icon        : 'download'
      },
      {
        display_name: 'Print',
        name        : 'print',
        icon        : 'print'
      }
    ],
    single: [
      {
        display_name: 'View Incident',
        name        : 'view_pdf',
        icon        : 'file pdf outline',
        color       : 'teal'
      },
      {
        display_name: 'Edit Incident',
        name        : 'edit',
        icon        : 'edit outline',
        color       : 'teal',
        disable     : item => !item.is_client_notified
      },
      {
        display_name: 'Preview Incident Report',
        name        : 'preview_report',
        icon        : 'envelope outline',
        color       : 'teal',
        disable     : item => !item.is_client_notified
      },
      {
        display_name: 'Delete Incident',
        name        : 'delete',
        icon        : 'trash alternate outline',
        color       : 'red',
        disable     : item => !item.is_client_notified
      }
    ]
  },
  columns: [
    {
      display_name: 'DATE OF INCIDENT',
      name        : 'incised_at',
      type        : 'date',
      width       : null,
      align       : 'left',
      sort        : true
    },
    {
      display_name: 'Type',
      name        : 'type_name',
      type        : 'string', // image, boolean, date, datetime, money, label
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'type__name',
      filter      : {
        type        : 'dropdown',
        name        : 'type__id',
        options: petIncidentTypeDuck.store
      }
    },
    {
      display_name: 'Outcome',
      name        : 'action_name',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : true,
      sort_name   : 'action__name',
      filter      : {
        type        : 'dropdown',
        name        : 'action__id',
        options: petIncidentActionDuck.store
      }
    },
    {
      display_name: 'EMPLOYEE NAME',
      name        : 'employee_fullname',
      type        : 'string',
      width       : null,
      align       : 'left',
      sort        : false
    },
    {
      display_name: 'Notified',
      name        : 'is_client_notified',
      type        : 'boolean',
      width       : null,
      align       : 'left',
      sort        : false
    }
  ]
}

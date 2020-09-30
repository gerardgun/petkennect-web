import petIncidentActionDuck from '@reducers/pet/incident-action'
import petIncidentTypeDuck from '@reducers/pet/incident-type'

export default {
  base_uri      : null,
  search_enabled: false,
  options       : [
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
      display_name: 'View Incident',
      name        : 'view_pdf',
      color       : 'teal',
      icon        : 'file pdf outline',
      is_multiple : false
    },
    {
      display_name      : 'Edit Incident',
      name              : 'edit',
      icon              : 'edit outline',
      is_multiple       : false,
      color             : 'teal',
      conditional_render: item => !item.is_client_notified
    },
    {
      display_name      : 'Preview Incident Report',
      name              : 'preview_report',
      icon              : 'envelope outline',
      is_multiple       : false,
      color             : 'teal',
      conditional_render: item => !item.is_client_notified
    },
    {
      display_name      : 'Delete Incident',
      name              : 'delete',
      icon              : 'trash alternate outline',
      is_multiple       : false,
      color             : 'red',
      conditional_render: item => !item.is_client_notified
    }
  ],
  row: {
    options: []
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
        source_store: petIncidentTypeDuck.store
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
        source_store: petIncidentActionDuck.store
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

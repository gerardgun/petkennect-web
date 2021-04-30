export default [
  {
    name : 'Animals',
    icon : 'paw',
    items: [
      {
        name: 'Species',
        to  : '/setup/pet/kind'
      },
      {
        name: 'Breeds',
        to  : '/setup/pet/breed'
      },
      {
        name: 'Vaccinations',
        to  : '/setup/pet/vaccination/type'
      },
      {
        name: 'Feeding',
        to  : '/setup/pet/feeding/time'
      },
      {
        name: 'Medication',
        to  : '/setup/pet/medication'
      },
      {
        name: 'Retire Reasons',
        to  : '/setup/pet/general/retire-reason'
      },
      {
        name: 'Incident Actions',
        to  : '/setup/pet/general/incident/action'
      },
      {
        name: 'Incident Behavior Tags',
        to  : '/setup/pet/general/incident/behavior'
      },
      {
        name: 'Incident Types',
        to  : '/setup/pet/general/incident/type'
      }
    ]
  },
  {
    name : 'Training',
    icon : 'paw',
    items: [
      {
        name: 'General',
        to  : '/setup/training'
      },
      {
        name: 'Reasons',
        to  : '/setup/training/reason'
      },
      {
        name: 'Methods',
        to  : '/setup/training/method'
      },
      {
        name: 'Commands',
        to  : '/setup/training/command'
      },
      {
        name: 'Rating Keys',
        to  : '/setup/training/rating-key'
      }
    ]
  },
  {
    name : 'Boarding',
    icon : 'paw',
    items: [
      {
        name: 'Pricing Settings',
        to  : '/setup/boarding/pricing'
      }
    ]
  },
  {
    name : 'Day Services',
    icon : 'paw',
    items: [
      {
        name: 'General Settings',
        to  : '/setup/day-service/general/setting'
      },
      {
        name: 'Yard Types',
        to  : '/setup/pet-yard-type'
      },
      {
        name    : 'Temperament Test Form',
        to      : '/setup',
        disabled: true
      }
    ]
  },
  {
    name : 'Application Settings',
    icon : 'paw',
    items: [
      {
        name: 'General',
        to  : '/setup/system-setting'
      },
      {
        name: 'System Icons and Codes',
        to  : '/setup/color-codes'
      },
      {
        name    : 'Run Cards',
        to      : '/setup',
        disabled: true
      },
      {
        name: 'Report Cards',
        to  : '/custom-report'
      },
      {
        name: 'Customized Fields',
        to  : '/setup/customized-field'
      }
    ]
  },
  {
    name : 'Company',
    icon : 'paw',
    items: [
      {
        name    : 'Profile',
        to      : '/setup',
        disabled: true
      },
      {
        name: 'Locations',
        to  : '/setup/location'
      },
      {
        name: 'Calendar',
        to  : '/setup/calendar'
      },
      {
        name: 'Pricing Table',
        to  : '/setup/package-pricing'
      }
    ]
  },
  {
    name : 'Forms and Templates',
    icon : 'paw',
    items: [
      {
        name: 'Client Agreements',
        to  : '/setup/agreement'
      },
      {
        name: 'Email Templates',
        to  : '/setup/email-template'
      }
    ]
  },
  {
    name : 'Employee Management',
    icon : 'paw',
    items: [
      {
        name    : 'Schedule',
        to      : '/setup',
        disabled: true
      },
      {
        name    : 'Users & Roles',
        to      : '/setup',
        disabled: true
      },
      {
        name    : 'Task Lists',
        to      : '/setup',
        disabled: true
      },
      {
        name    : 'Payroll',
        to      : '/setup',
        disabled: true
      }
    ]
  },
  {
    name : 'Capacity Management',
    icon : 'paw',
    items: [
      {
        name: 'Kennels',
        to  : '/setup/pet-kennel'
      },
      {
        name: 'Kennel Types',
        to  : '/setup/pet-kennel-type'
      },
      {
        name: 'Kennel Areas',
        to  : '/setup/pet-kennel-area'
      },
      {
        name: 'Appointment Capacity',
        to  : '/setup/capacity/appointment/setting'
      },
      {
        name: 'Services Capacity',
        to  : '/setup/capacity/service/setting'
      },
      {
        name: 'Lodging Area Management',
        to  : '/setup/capacity/boarding/setting'
      }
    ]
  },
  {
    name : 'Client Portal',
    icon : 'paw',
    items: [
      {
        name: 'Notifications',
        to  : '/setup/notifications'
      }
    ]
  }
]

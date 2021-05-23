export default [
  {
    name : 'Application Settings',
    icon : 'settings',
    items: [
      {
        name: 'System Icons & Codes',
        to  : '/setup/color-codes'
      },
      {
        name: 'Run Cards',
        to  : '/setup'
      },
      {
        name: 'Report Cards',
        to  : '/custom-report'
      }
    ]
  },

  {
    name : 'Animals',
    image: '/images/admin-item/Colored_Animals.png',

    items: [
      {
        name: 'Breed Manager',
        to  : '/setup/pet/breed'
      },
      {
        name: 'Behavior Tags',
        to  : '/setup/pet/behavior-tags'
      },

      {
        name: 'Feeding Settings',
        to  : '/setup/pet/feeding/time'
      },

      {
        name: 'Medication Settings',
        to  : '/setup/pet/medication'
      },
      {
        name: 'Incident Managment',
        to  : '/setup/pet/general/incident/action'
      },
      {
        name: 'Retire Reason',
        to  : '/setup/pet/general/retire-reason'
      },
      {
        name: 'Species',
        to  : '/setup/pet/kind'
      },
      {
        name: 'Vaccinations',
        to  : '/setup/pet/vaccination/type'
      }

    ]
  },
  {
    name : 'Company',
    image: '/images/admin-item/coloredCompany.png' ,
    items: [
      {
        name: 'Billing',
        to  : ''

      },
      {
        name: 'Branding',
        to  : ''

      },
      {
        name: 'Email Signature',
        to  : '/setup/system-setting'

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
        name: 'System Formats',
        to  : ''

      },
      {
        name: 'Accounting Settings',
        to  : ''

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
    name : 'Services & Reservations',
    image: '/images/admin-item/ColoredServices.png',
    items: [
      {
        name: 'Boarding',
        to  : '/setup'

      },
      {
        name: 'Day Services',
        to  : '/setup'

      },
      {
        name: 'Grooming',
        to  : '/setup'

      },
      {
        name: 'Training',
        to  : '/setup/training'

      },
      {
        name: 'Add-on Services',
        to  : '/setup'

      },
      {
        name: 'Packages',
        to  : '/setup'

      },
      {
        name: 'Transport',
        to  : '/setup'

      },
      {
        name: 'Retail',
        to  : '/setup'

      }

    ]
  },
  {
    name : 'Employee Management',
    icon : 'users',
    items: [
      {
        name: 'Users & Roles',
        to  : '/employee'

      },
      {
        name: 'Permissions',
        to  : '/setup'

      },
      {
        name: 'Task Lists',
        to  : '/setup'

      },
      {
        name: 'Schedule',
        to  : '/setup'

      },

      {
        name: 'Payroll',
        to  : '/setup'

      }
    ]
  },

  {
    name : 'Forms & Templates',
    image: '/images/admin-item/ColoredTemplates.png' ,
    items: [
      {
        name: 'Client Agreements',
        to  : '/setup/agreement'
      },
      {
        name: 'Email Templates',
        to  : '/setup/email-template'
      },
      {
        name: 'Training Questionnaire',
        to  : 'setup/questionnaire-form'
      },
      {
        name: 'Temperament Test Form',
        to  : '/setup'
      },
      {
        name: 'Custom Form Builder',
        to  : '/setup/customized-field'
      }
    ]
  },

  {
    name : 'Financial Settings',
    image: '/images/admin-item/coloredFinance.png' ,
    items: [
      {
        name: 'Pricing',
        to  : '//setup/package-pricing'
      },
      {
        name: 'POS Settings',
        to  : '/setup'
      },
      {
        name: 'Invoice Settings',
        to  : '/setup/financial/invoice/services-activities'
      },
      {
        name: 'Merchant Account',
        to  : '/setup'
      },
      {
        name: 'Payments Accepted',
        to  : '/setup'
      }
    ]
  },
  {
    name : 'Capacity Management',
    image: '/images/admin-item/CapacityRecolored.png',
    items: [
      {
        name: 'Service Capacity',
        to  : '/setup'
      },
      {
        name: 'Appointment Capacity',
        to  : '/setup'
      },
      {
        name: 'Lodging Areas',
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
    image: '/images/admin-item/coloredPortal.png'  ,
    items: [
      {
        name: 'Portal Settings',
        to  : '/client'
      },
      {
        name: 'Notifications',
        to  : '/setup/notifications'
      }
    ]
  },
  {
    name : 'Miscellaneous',
    image: '/images/admin-item/ColoredMisc.png' ,
    items: [
      {
        name: 'Merge Owners',
        to  : '/setup/'
      },
      {
        name: 'Transfer Pets',
        to  : '/setup'
      }
    ]
  }
]

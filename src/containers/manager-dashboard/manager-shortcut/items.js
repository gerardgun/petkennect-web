export default [
  {
    name : 'Schedule',
    image: '/images/calendar_icon.png',
    to   : ''
  },
  {
    name : 'Timesheets',
    image: '/images/manager-shortcuts/clock.png',
    to   : ''
  },
  {
    name : 'Manager Loop',
    image: '/images/manager-shortcuts/loop_circular.png',
    to   : ''
  },
  {
    name : 'Announcements',
    image: '/images/manager-shortcuts/message.png',
    to   : ''
  },
  {
    name : 'Tasklists',
    image: '/images/manager-shortcuts/task.png',
    to   : ''
  },
  {
    name: 'Requests',
    icon: 'external share',
    to  : ''
  },
  {
    name : 'Employees',
    image: '/images/manager-shortcuts/team-icon.png',
    to   : '/manager-dashboard/employee-directory',
    links: [ '/manager-dashboard/employee-directory/personal-detail',
      '/manager-dashboard/employee-directory/wage-history',
      '/manager-dashboard/employee-directory/availability',
      '/manager-dashboard/employee-directory/note',
      '/manager-dashboard/employee-directory/document',
      '/manager-dashboard/employee-directory/performance'
    ]
  },
  {
    name: 'Run Payroll',
    icon: 'money',
    to  : ''
  },
  {
    name : 'Applicants BETA',
    image: '/images/manager-shortcuts/hiring.png',
    to   : ''
  },
  {
    name : 'Shared Files',
    image: '/images/folder_icon.jpg',
    to   : ''
  },
  {
    name: 'Departments & Roles',
    icon: 'sitemap',
    to  : '/manager-dashboard/department-roles'
  },
  {
    name: 'Settings',
    icon: 'settings',
    to  : '/manager-dashboard/setting/permission',
    link: [ '/manager-dashboard/setting/permission' ]
  }

]

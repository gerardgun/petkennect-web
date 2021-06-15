import React from 'react'
import { Card, Header , Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.scss'

const items = [
  {
    id     : 1,
    message: 'All staff Meeting Reminder',
    icon   : 'announcement',
    link   : {
      to   : '',
      label: 'View & Esign'
    }

  },
  {
    id     : 2,
    message: 'Today is Demas fifth birthday',
    icon   : 'announcement'

  },
  {
    id     : 3,
    message: 'Today is Shanon work anniversary',
    icon   : 'announcement'

  },

  {
    id     : 4,
    message: 'Holiday Party This Weekend',
    icon   : 'announcement',
    link   : {
      to   : '',
      label: 'View & Esign'
    }

  }
]
const NotificationCard = ()=>{
  return (
    <Card fluid >

      <div className='align-baseline pv12 flex' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Header as='h4' className='mr8 mb0 ml16' style={{ opacity: '0.9' }}>
            Announcements and Notifications
        </Header>
        <Icon color='blue' name='chat' size='large'/>
      </div>
      <div className='pl16'>
        {
          items && items.map((item,index)=>{
            return (
              <div className='flex align-baseline pv10 flex-wrap' key={index}>
                <Icon
                  circular className='mr4' color='teal'
                  name={item.icon}/>
                <Header as='h5' className='mb0 mt0 mr12'style={{ opacity: '0.7' }}>
                  {item.message}
                </Header>
                {
                  item.link && <Link style={{ color: 'blue' }} to={item.link.to}>{item.link.label}</Link>
                }
              </div>
            )
          })
        }
      </div>

    </Card>

  )
}

export default NotificationCard

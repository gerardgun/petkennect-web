import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {  Card, Header, Image, Icon } from 'semantic-ui-react'
import DonutChart from 'react-donut-chart'
import './styles.scss'
const items = [ {
  label: 'Total Shift Worked',
  value: 20
},
{
  label: 'Late For Shift',
  value: 5
},
{
  label: 'Missed Breaks',
  value: 4
},
{
  label: 'Missed Clock Outs',
  value: 5
},
{
  label: 'No Shows',
  value: 3
}
]

const AttendanceStats = ()=>{
  const [ stats, setStats ] = useState('days')

  return (
    <Card fluid>
      <div  className='flex align-center justify-evenly' style={{ height: '40px', borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <div className={stats === 'since' ? 'stats-div selected-h' : 'stats-div un-selected-h'}> <Header
          as={Link} className='stats-h m0 stats-color'
          content='SINCE HERE'
          onClick={()=>setStats('since')}/>
        </div>
        <div className={stats === 'days' ? 'stats-div selected-h' : 'stats-div un-selected-h'}><Header
          as={Link}
          className='stats-h stats-color m0' content='LAST 30 DAYS'
          onClick={()=>setStats('days')}/>
        </div>
      </div>
      <div className='flex justify-center' style={{ marginTop: '30px' }}>
        <DonutChart
          colors={[ '#dfbcea', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5' ]}
          data={[ {
            label: 'On Time',
            value: 25
          },
          {
            label: 'Late For Shift',
            value: 5
          },
          {
            label: 'Missed Breaks',
            value: 4
          },  {
            label: 'Missed Clock Outs',
            value: 5
          },
          {
            label: 'No Shows',
            value: 3
          }

          ]}
          height={150}
          legend={false}
          width={150}/>
      </div>
      <div className='ph20 pv32'>
        {
          items && items.map(({ label,value },index)=>{
            return (
              <div className='flex mb12' key={index}>
                <label style={{ marginRight: 'auto' }}>{label}</label>
                <div> <label>{value}</label></div>
              </div>
            )
          })
        }
      </div>
      <div className='ph20 pb20'>
        <div className='flex align-baseline pb8'>
          <Header
            as='h4' className='mb0' color='grey'
            content='AVG HOURS PER WEEK'/>
          <Icon name='question circle'/>
        </div>
        <div>
          <Image src='/images/attendance_graph.png'/>
        </div>
      </div>
    </Card>
  )
}

export default AttendanceStats

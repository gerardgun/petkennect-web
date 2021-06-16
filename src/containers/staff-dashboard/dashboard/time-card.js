import React from 'react'
import { Card, Header, Button } from 'semantic-ui-react'
import './styles.scss'

const items = [
  {
    id   : 1,
    label: 'REG',
    value: '75.00'

  },
  {
    id   : 2,
    label: 'OT',
    value: '10.00'

  },
  {
    id   : 3,
    label: 'VAC',
    value: '00.00'

  },
  {
    id   : 4,
    label: 'HOL',
    value: '00.00'

  },
  {
    id   : 5,
    label: 'OTH',
    value: '00.00'

  },
  {
    id   : 6,
    label: 'Total',
    value: '85.00'

  }

]
const TimeCard = ()=>{
  return (
    <Card fluid >

      <div className='align-baseline pv12 flex justify-between' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <div className='flex align-center'>
          <div className='flex mr20 ml16'>
            <Header as='h4' className='mb0 mt0 mr8 gery-color-h' content='Total Hours'/>
            <Header as='h4' className='m0' content='85.43'/>
          </div>
          <div>
            {/* <Header as='h5' className='m0' content='Currently Pay Period'/> */}
            <label className='font-size-div'>Currently Pay Period</label>
            <Header as='h5' className='m0 gery-color-h' content='02/02/15 - 02/16/15'/>
          </div>
        </div>
        <Button
          className='mr16' color='teal' content='Time Card'
          size='tiny'/>
      </div>
      <div className='ph16 flex justify-between pv32'>
        {
          items && items.map(({ label,value },index)=>{
            return (
              <div key={index}>
                <Header as='h5' content={label}/>
                <label className='time-card-value'>{value}</label>
              </div>
            )
          })
        }
      </div>

    </Card>

  )
}

export default TimeCard

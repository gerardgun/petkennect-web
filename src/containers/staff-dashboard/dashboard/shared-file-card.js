import React from 'react'
import { Card, Header, Image } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import './styles.scss'

const items = [
  {
    id  : 1,
    file: 'Employee Handbook',
    link: ''
  },
  {
    id  : 2,
    file: 'Federal and State Tax Forms',
    link: ''
  },
  {
    id  : 3,
    file: 'Benefits Information',
    link: ''
  },
  {
    id  : 4,
    file: 'Direct Deposit Enrollment/Change',
    link: ''
  }

]
const FileCard = ()=>{
  return (
    <Card fluid >

      <div className='pv12 flex align-end' style={{ borderBottom: 'solid 1px rgba(34, 36, 38, 0.15)' }}>
        <Header as='h4' className='mr8 mb0 ml16' style={{ opacity: '0.9' }}>
            Shared Files
        </Header>
        <Image className='file-icon mr28' src='/images/folder_icon.jpg'/>
      </div>
      <div className='pl16 flex'>
        <div className='w50' >
          {
            items && items.map(({ file },index)=>{
              let  even = index % 2 == 0

              return (<>
                {
                  even  &&  <div className='mv24 flex align-center' key={index}>
                    <Image className='schedule-icon mr28' src='images/pdf_icon.png'/>
                    <Header as={Link} className='file-h m0'>
                      {file}
                    </Header>
                  </div>
                }

              </>)
            })
          }

        </div>

        <div className='w50'>
          {
            items && items.map(({ file },index)=>{
              let  even = index % 2 == 0

              return (<>
                {
                  !even  && <div className='mv24 flex align-center' key={index}>
                    <Image className='schedule-icon mr28' src='images/pdf_icon.png'/>
                    <Header as={Link}  className='file-h m0'>
                      {file}
                    </Header>
                  </div>
                }

              </>)
            })
          }

        </div>

      </div>

    </Card>

  )
}

export default FileCard

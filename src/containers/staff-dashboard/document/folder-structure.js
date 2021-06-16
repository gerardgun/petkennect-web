import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon, Checkbox } from 'semantic-ui-react'
import './styles.scss'

const FolderStructure = ({ data })=>{
  const [ folder,setFolder ] = useState([])

  useEffect(
    ()=>{
      data &&  setFolder(data)
    },[ data ]
  )

  const _handleFolderClick = (clickedFolder)=>{
    // console.log(item)
    const updatedFolder = folder &&  folder.map((item)=>{
      if(clickedFolder.id === item.id)
        item.open =  !clickedFolder.open

      return item
    })

    setFolder(updatedFolder)
  }

  const _handleCheckboxChange = (workingFolder,childrenId,checked)=>{
    const updatedFolder = folder &&  folder.map((item)=>{
      if(workingFolder.id === item.id)
        item.children.map((child)=>{
          if(child.id === childrenId)
            child.checked = !checked

          return child
        })

      return item
    })

    setFolder(updatedFolder)
  }

  return (
    <>
      <div className='folder-container bottom-line'>
        {
          folder  && folder.map((item,index) => {
            return (
              <div className='folder-div' key={index}>
                {
                  <div>
                    <div className='flex align-center h60' >
                      <Icon className='folder-color mr16' name={item.open ? 'folder open' : 'folder'} size='big'/>

                      <Link><Header as='h3'  className='m0' onClick={()=>{_handleFolderClick(item)}} >{item.foldername}</Header></Link>
                      <Header as='h3' className='mb0 mt0 ml4' color='grey' >{`(${item.children.length})`}</Header>
                    </div>
                    { item.open
                    && item.children && item.children.length != 0 && item.children.map(({ id,file,type, checked,meta },index)=>{
                      const lastChild = Boolean(item.children.length === index + 1)

                      return (
                        <div
                          className={lastChild ? 'child-container flex align-center'
                            : 'child-container flex align-center bottom-line'} key={index}>
                          <Checkbox checked={checked} className='mh16' onChange={()=>{_handleCheckboxChange(item,id,checked)}}/>
                          {
                            type === 'text' && <Icon color='blue' name='file text' size='big'/>

                          }
                          {
                            type === 'pdf' && <Icon color='red' name='file text' size='big'/>
                          }
                          {
                            type === 'excel' && <Icon  className='excel-color' name='file excel' size='big'/>
                          }
                          <div>
                            <Link><label className='file-label'>{file}</label></Link>
                            { meta && <div><label style={{ color: 'gray' }}>{`Added by ${meta.by} ${meta.date} (${meta.size}) `}</label></div>}
                          </div>
                        </div>
                      )
                    })
                    }
                  </div>
                }
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default FolderStructure


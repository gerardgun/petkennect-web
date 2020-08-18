import React, { useMemo } from 'react'
import { Card, Icon, Image, Button, Dropdown } from 'semantic-ui-react'

import useModal from '@components/Modal/useModal'

const videoOptions = [
  {
    key  : 'edit',
    value: 'edit',
    text : 'Edit video'
  },
  {
    key      : 'delete',
    value    : 'delete',
    text     : 'Delete video',
    className: 'gallery-dropdown-option-delete'
  }
]

const imageOptions = [
  {
    key  : 'edit',
    value: 'edit',
    text : 'Edit photo'
  },
  {
    key      : 'delete',
    value    : 'delete',
    text     : 'Delete photo',
    className: 'gallery-dropdown-option-delete'
  }
]

function GalleryItem({ item, selectable, selected, onClick, onOptionClick }) {
  const [ open, { _handleOpen, _handleClose } ] = useModal()

  const _handleCardClick = (e, data) => {
    if(selectable === false || !disabled)
      onClick.call(this, e, { ...data, item })
  }

  const _handleDropdownItemClick = (e, data) => {
    onOptionClick.call(this, e, { ...data, item })
  }

  const disabled = useMemo(() => {
    return selectable === true && item.filetype === 'video'
  }, [])

  return (
    <Card className={disabled ? 'disabled' : ''} onClick={_handleCardClick}>
      <Image src={item.filetype === 'video' ? item.thumbnail_path : item.filepath} ui={false} wrapped/>
      {item.filetype === 'video' && <Icon name='video'/>}
      <Card.Content>
        <Card.Description>
          {item.filename}
        </Card.Description>
        {
          selected && <Icon color='teal' name='check circle'/>
        }
        {
          selected === null && (
            <Dropdown
              direction='left'
              icon={null}
              onClose={_handleClose}
              onOpen={_handleOpen}
              selectOnBlur={false}
              trigger={<Button color={open ? 'blue' : null} icon='ellipsis vertical'/>}
              value={null}>
              <Dropdown.Menu>
                {
                  (item.filetype === 'video' ? videoOptions : imageOptions).map(({ key, value, text, ...rest }) => (
                    <Dropdown.Item
                      key={key}
                      onClick={_handleDropdownItemClick}
                      value={value} {...rest}>
                      {text}
                    </Dropdown.Item>
                  ))
                }
              </Dropdown.Menu>
            </Dropdown>
          )
        }
      </Card.Content>
    </Card>
  )
}

export default GalleryItem

import React from 'react'
import { Button, Popup, Table, Dropdown } from 'semantic-ui-react'

const TableCellActionButton = ({ config, data, ...props }) => {
  const { align = null, width = null } = config

  const getOptions = (options) => {
    let option
    = options
      .map(({ display_name, name, ...rest }, index) => {
        return {
          key  : index,
          value: name,
          text : display_name,
          ...rest
        }
      })

    return option
  }

  // const dropoptions = useMemo(getOptions, [])
  // console.log(dropoptions)

  // let option = [ { display_name: 'Action option',icon: 'paw', name: 'action_option_1' },
  //   { display_name: 'Action option 1',icon: 'edit', name: 'action_option_2' },
  //   { display_name: 'Action option 2',icon: 'pen', name: 'action_option_2' }
  // ]
  // const drop = getOptions(option)
  // console.log('dropdown options')
  // console.log(drop)

  const _handleButtonClick = e => {
    e.stopPropagation()

    props.onButtonClick(e.currentTarget.dataset.optionName, data)
  }
  const _handleDropdownChange = (e, { value: optionName }) => {
    console.log('option clicked')
    e.stopPropagation()

    props.onDropdownChange(optionName, data)
  }

  return (
    <Table.Cell
      onClick={props.onClick}
      textAlign={align}
      width={width}>
      {
        config.options
          .map(({ display_name, name, type, dropdownOptions, size, color, icon, ...rest }, index) => {
            const disabled = 'disable' in rest && rest.disable(data)
            // const icon = rest.icon
            // console.log(rest.icon(data))
            if(type === 'button')
              return (
                <Popup
                  content={data.display_name ? data.display_name : display_name} inverted
                  key={index} position='bottom center'
                  trigger={
                    <Button
                      basic
                      color={data.color ? data.color : color}
                      data-option-name={name}
                      disabled={disabled}
                      icon={data.icon ? data.icon : icon}
                      onClick={_handleButtonClick}
                      size={size}
                      {...rest}/>
                  }/>
              )
            else if(type === 'dropdown')
              return (
                <Dropdown
                  disabled={dropdownOptions.length === 0}
                  icon={null}
                  onChange={_handleDropdownChange}
                  options={getOptions(dropdownOptions)}
                  selectOnBlur={false}
                  trigger={(
                    <Button basic icon='ellipsis vertical'/>
                  )}
                  value={null}/>
              )
          })
      }
    </Table.Cell>
  )
}

export default TableCellActionButton

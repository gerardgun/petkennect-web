import React from 'react'
import { Button, Popup, Table } from 'semantic-ui-react'

const TableCellButton = ({ config, data, ...props }) => {
  const { align = null, width = null } = config

  const _handleButtonClick = e => {
    e.stopPropagation()

    props.onButtonClick(e.currentTarget.dataset.optionName, data)
  }

  return (
    <Table.Cell
      onClick={props.onClick}
      textAlign={align}
      width={width}>
      {
        config.options
          .filter(({ disable }) => {
            return !disable || !disable(data)
          })
          .map(({ display_name, name, ...rest }, index) => {
            return (
              <Popup
                content={display_name} inverted
                key={index} position='bottom center'
                trigger={
                  <Button
                    basic data-option-name={name}
                    onClick={_handleButtonClick}
                    {...rest}/>
                }/>
            )
          })
      }
    </Table.Cell>
  )
}

export default TableCellButton

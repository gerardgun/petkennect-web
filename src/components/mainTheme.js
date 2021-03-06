function ChangeHexClasss(color) {
  switch (color) {
    case '#FF0000': return 'red'
    case '#FFA500': return 'orange'
    case '#FFFF00': return 'yellow'
    case '#808000': return 'olive'
    case '#008000': return 'green'
    case '#008080': return 'teal'
    case '#0000FF': return 'blue'
    case '#7F00FF': return 'violet'
    case '#800080': return 'purple'
    case '#FFC0CB': return 'pink'
    case '#A52A2A': return 'brown'
    case '#808080': return 'grey'
    case '#000000': return 'black'
    case '#FFFFFF': return 'white'
    case '#00000B': return 'black_text'
    case '#FFFFF0': return 'white_text'
    default: return 'teal'
  }
}

function  Theme(palette) {
  const buttonMenuColor = palette.item.branding_config ? palette.item.branding_config.navigation_color : null
  const buttonTextColor  = palette.item.branding_config ? palette.item.branding_config.navigation_text_color : null
  const headingColor = palette.item.branding_config ? palette.item.branding_config.heading_text_color : null

  return ({
    buttonMenuColor: buttonMenuColor ? ChangeHexClasss(buttonMenuColor) : 'teal',
    buttonTextColor: buttonTextColor ? ChangeHexClasss(buttonTextColor) : '#FFFFF0',
    headingColor   : headingColor ? ChangeHexClasss(headingColor) : 'teal'
  })
}

export default Theme

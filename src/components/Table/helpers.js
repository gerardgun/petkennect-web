
const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  ...draggableStyle
  // width          : 500,
  // minWidth       : 500,
  // backgroundColor: 'red'
  // height    : 120,
  // margin    : '0 4px'
})

const getListStyle = () => ({
  // display: 'flex'
  // overflowX: 'auto'
})

export { getItemStyle, getListStyle }

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [ removed ] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  ...draggableStyle,
  width     : 120,
  minWidth  : 120,
  height    : 120,
  margin    : '0 4px'
})

const getListStyle = () => ({
  display  : 'flex',
  overflowX: 'auto'
})

export { reorder, getItemStyle, getListStyle }

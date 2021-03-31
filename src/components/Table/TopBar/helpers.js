export const getFilterColumns = config => {
  return config.columns
    .filter(item => Boolean(item.filter))
}

export const getSelectedFilterColumns = (config, filters) => {
  return getFilterColumns(config)
    .filter(item => {
      const filterNames = [].concat(item.filter.name) // get a flat array of filter names

      return filterNames.every(item => item in filters)
    })
}

export const getFilterColumnSources = (config, state) => {
  return getFilterColumns(config)
    .filter(item => 'options' in item.filter)
    .reduce((a, b) => {
      const source = b.filter.options
      let sourceItems = []

      if(typeof source === 'string' && source in state)  // is a reducer store
        sourceItems = state[source].items
          .map(item => ({
            key  : item.id,
            value: item.id,
            text : item.code || item.name
          }))
      else if(Array.isArray(source)) // is a customize dropdown
        sourceItems = source
          .map((item, index) => ({
            key  : index,
            value: item.value,
            text : item.text
          }))

      return { ...a, [b.filter.name]: sourceItems }
    }, {})
}

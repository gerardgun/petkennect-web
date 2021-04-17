import _mergeWith from 'lodash/mergeWith'

const configCustomizer = (obj, src) => {
  if(Array.isArray(obj) && !Array.isArray(src) && obj.length === 0)
    return src
  else if(Array.isArray(obj))
    return obj.concat(src)
}

export const getConfig = config => {
  return _mergeWith({
    search_placeholder: 'Search',
    search_enabled    : true,
    selector_enabled  : false,
    options           : [],
    columns           : []
  }, config, configCustomizer)
}

export const getChildConfig = config => {
  return config ? (
    _mergeWith({
      columns: []
    }, config, configCustomizer)
  ) : null
}

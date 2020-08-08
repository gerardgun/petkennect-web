import Duck from 'extensible-duck'
import produce from 'immer'

export default {
  initialState: (duck, previousState = {}) => {
    const { filters = {}, ...rest } = previousState

    return {
      filters: {
        search: '',
        ...filters
      },
      items : [],
      config: {},
      ...rest
    }
  },
  consts: {
    statuses: [ 'REMOVED_FILTERS', 'SET_FILTERS','UPDATED' ]
  },
  types  : [ 'REMOVE_FILTERS', 'SET_FILTERS','UPDATE' ],
  reducer: (state, action, { types, statuses }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.GET: {
          const { payload = {} } = action

          // Filter params to apply
          const paramKeys = Object.keys(payload)
            .filter(key => !([ 'page_size', 'page' ].includes(key)))

          const params = paramKeys.reduce((a, b) => ({ ...a, [b]: payload[b] }), {})

          draft.filters = {
            ...state.filters,
            ...params
          }

          return
        }
        case types.REMOVE_FILTERS: {
          let { ...filters } = state.filters

          action.keys.forEach(item => delete filters[item])

          draft.filters = filters

          draft.status = statuses.REMOVED_FILTERS

          return
        }
        case types.SET_FILTERS:
          draft.filters = {
            ...state.filters,
            ...action.payload
          }

          draft.status = statuses.SET_FILTERS

          return
        case types.UPDATE:
          draft.items = action.payload

          draft.status = statuses.UPDATED

          return

        default:
          return
      }
    }),
  creators: ({
    types: {
      REMOVE_FILTERS,
      RESET,
      SET_FILTERS,
      UPDATE,
      // Para redux-sagas
      GET
    }
  }) => ({
    removeFilters: (...keys) => ({ type: REMOVE_FILTERS, keys }),
    reset        : () => ({ type: RESET }),
    setFilters   : payload => ({ type: SET_FILTERS, payload }),
    update       : payload => ({ type: UPDATE, payload }),
    // Creadores para redux-sagas
    get          : (payload = {}) => ({ type: GET, payload })
  }),
  selectors: ({ store }) => ({
    list   : state => state[store],
    filters: state => {
      const {
        filters,
        pagination = {}
      } = state[store]

      return {
        ...filters,
        ...(pagination.params || {})
      }
    },
    // Filters
    filterColumns: new Duck.Selector(selectors => state => {
      return selectors.list(state).config.columns
        .filter(item => Boolean(item.filter))
    }),
    selectedFilterColumns: new Duck.Selector(selectors => state => {
      const filters = selectors.filters(state)

      return selectors.filterColumns(state)
        .filter(item => {
          const filterNames = [].concat(item.filter.name) // get a flat array of filter names

          return filterNames.every(item => item in filters)
        })
    }),
    filterColumnSources: new Duck.Selector(selectors => state => {
      return selectors.filterColumns(state)
        .filter(item => 'source_store' in item.filter)
        .reduce((a, b) => {
          const source = b.filter.source_store
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
    }),
    // Grouping
    groups: new Duck.Selector(selectors => state => {
      const list = selectors.list(state)
      const config = list.config.group_by

      if(!config) return []

      return config.groups
        .map(group => {
          const items = list.items.filter(item => item[config.column_name] === group.value)

          return {
            ...group,
            items
          }
        })
    })
  })
}

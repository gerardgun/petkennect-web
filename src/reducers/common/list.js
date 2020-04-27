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
    statuses: [ 'REMOVED_FILTERS', 'SET_FILTERS' ]
  },
  types  : [ 'REMOVE_FILTERS', 'SET_FILTERS' ],
  reducer: (state, action, { types, statuses }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.GET: {
          const { payload } = action

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
    }
  })
}

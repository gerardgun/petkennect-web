import produce from 'immer'
import _get from 'lodash/get'

const params2filters = (params = {}) => {
  const validParamKeys = Object.keys(params)
    .filter(key => !([ 'page_size', 'page' ].includes(key)))

  return validParamKeys.reduce((a, b) => ({ ...a, [b]: params[b] }), {})
}

export default {
  initialState: (duck, previousState = {}) => {
    const { filters = {}, ...rest } = previousState

    return {
      filters: {
        search: '',
        ...filters
      },
      items: [],
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
        case types.GET:
          draft.filters = {
            ...state.filters,
            ...params2filters(action.payload)
          }

          return
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
            ...params2filters(action.payload)
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
      SET,
      SET_FILTERS,
      // Para redux-sagas
      GET
    }
  }) => ({
    removeFilters: (...keys) => ({ type: REMOVE_FILTERS, keys }),
    reset        : () => ({ type: RESET }),
    set          : payload => ({ type: SET, payload }),
    setFilters   : (payload = {}) => ({ type: SET_FILTERS, payload }),
    // Creadores para redux-sagas
    get          : (payload = {}) => ({ type: GET, payload })
  }),
  selectors: ({ store }) => ({
    list   : state => state[store],
    filters: state => {
      const list = state[store]

      return {
        ...list.filters,
        ..._get(list, 'pagination.params', {})
      }
    }
  })
}

import produce from 'immer'

const params2filters = params => {
  const validParamKeys = Object.keys(params)
    .filter(key => [ 'page_size', 'page' ].includes(key))

  return validParamKeys.reduce((a, b) => ({ ...a, [b]: params[b] }), {})
}

export default {
  initialState: (duck, previousState = {}) => {
    const {
      pagination = {},
      ...rest
    } = previousState

    return {
      pagination: {
        params: {
          page_size: 15,
          page     : 1,
          ...(pagination.params || {})
        },
        meta: {
          from       : null,
          to         : null,
          last_page  : null,
          total_items: null
        }
      },
      ...rest
    }
  },
  reducer: (state, action, { types }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.GET:
          draft.pagination.params = {
            ...state.pagination.params,
            ...params2filters(action.payload)
          }

          return
        case types.SET_FILTERS:
          draft.pagination.params = {
            ...state.pagination.params,
            ...params2filters(action.payload)
          }

          return
        default:
          return
      }
    })
}

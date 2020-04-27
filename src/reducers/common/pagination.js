import produce from 'immer'

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
        case types.GET: {
          const { payload } = action

          // Pagination params to apply
          const paramKeys = Object.keys(payload)
            .filter(key => [ 'page_size', 'page' ].includes(key))

          const params = paramKeys.reduce((a, b) => ({ ...a, [b]: payload[b] }), {})

          draft.pagination.params = {
            ...state.pagination.params,
            ...params
          }

          return
        }
        default:
          return
      }
    })
}

import produce from 'immer'

export default {
  initialState: (duck, previousState) => ({
    selector: {
      default_items : [], // selected items for default
      selected_items: []
    },
    ...previousState
  }),
  consts: {
    statuses: [ 'SET_DEFAULT_ITEMS', 'SET_SELECTED_ITEMS', 'REMOVED_DEFAULT_ITEMS', 'REMOVED_SELECTED_ITEMS' ]
  },
  types  : [ 'SELECT_DEFAULT_IDS', 'SELECT_IDS', 'REMOVE_DEFAULT_IDS', 'REMOVE_IDS' ],
  reducer: (state, action, { types, statuses }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.SELECT_DEFAULT_IDS: {
          const selectedItems = draft.items.filter(item => action.ids.includes(item.id))

          draft.selector.default_items = draft.selector.default_items.concat(selectedItems)

          draft.status = statuses.SET_DEFAULT_ITEMS

          return
        }
        case types.SELECT_IDS: {
          const selectedItems = draft.items.filter(item => action.ids.includes(item.id))

          draft.selector.selected_items = draft.selector.selected_items.concat(selectedItems)

          draft.status = statuses.SET_SELECTED_ITEMS

          return
        }
        case types.REMOVE_DEFAULT_IDS:
          if(action.ids.length) {
            const items = draft.selector.default_items.filter(item => !action.ids.includes(item.id))

            draft.selector.default_items = items
          } else {
            draft.selector.default_items = []
          }

          draft.status = statuses.REMOVED_DEFAULT_ITEMS

          return
        case types.REMOVE_IDS:
          if('ids' in action && action.ids.length) {
            const items = draft.selector.selected_items.filter(item => !action.ids.includes(item.id))

            draft.selector.selected_items = items
          } else {
            draft.selector.selected_items = []
          }

          draft.status = statuses.REMOVED_SELECTED_ITEMS

          return
        default:
          return
      }
    }),
  creators: ({
    types: {
      SELECT_DEFAULT_IDS,
      SELECT_IDS,
      REMOVE_DEFAULT_IDS,
      REMOVE_IDS
    }
  }) => ({
    selectDefaultIds : (...ids) => ({ type: SELECT_DEFAULT_IDS, ids }),
    selectIds        : (...ids) => ({ type: SELECT_IDS, ids }),
    removeDefaultIds : (...ids) => ({ type: REMOVE_DEFAULT_IDS, ids }),
    removeSelectedIds: (...ids) => ({ type: REMOVE_IDS, ids })
  })
}

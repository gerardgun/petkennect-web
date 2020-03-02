import produce from 'immer'
import { ERROR_ACTION, WAIT_FOR_ACTION } from 'redux-wait-for-action'

export default {
  initialState: (duck, previousState = {}) => ({
    item: {},
    mode: null,
    ...previousState
  }),
  consts: {
    statuses: [ 'SET_ITEM', 'RESET_ITEM' ],
    modes   : [ 'CREATE', 'DELETE', 'DISABLE', 'FORCE_PASSWORD', 'READ', 'UPDATE' ]
  },
  types  : [ 'CREATE', 'RESET_ITEM', 'SET_ITEM' ],
  reducer: (state, action, { types, statuses, initialState }) =>
    produce(state, draft => {
      switch (action.type) {
        case types.SET_ITEM:
          draft.item = typeof action.item === 'undefined' || action.item === null ? initialState.item : action.item
          draft.mode = action.mode

          draft.status = statuses.SET_ITEM

          return
        case types.RESET_ITEM:
          for (let key in initialState) draft[key] = initialState[key]

          draft.status = statuses.RESET_ITEM

          return
        default:
          return
      }
    }),
  creators: ({
    types: {
      // Para redux-sagas
      CREATE,
      DELETE, DELETE_FULFILLED, DELETE_FAILURE,
      GET,
      PATCH, PATCH_FULFILLED, PATCH_FAILURE,
      POST, POST_FULFILLED, POST_FAILURE,
      PUT, PUT_FULFILLED, PUT_FAILURE,
      // Propios del reducer
      RESET,
      RESET_ITEM,
      SET_ITEM,
      UPDATE
    },
    modes: { READ }
  }) => ({
    // Sagas creators
    create: () => ({ type: CREATE }),
    delete: (...ids) => ({
      type: DELETE,
      ids,
      [WAIT_FOR_ACTION]: DELETE_FULFILLED,
      [ERROR_ACTION]   : DELETE_FAILURE
    }),
    get       : id => ({ type: GET, id }),
    patch      : payload => ({
      type: PATCH,
      payload,
      [WAIT_FOR_ACTION]: PATCH_FULFILLED,
      [ERROR_ACTION]   : PATCH_FAILURE
    }),
    post      : payload => ({
      type: POST,
      payload,
      [WAIT_FOR_ACTION]: POST_FULFILLED,
      [ERROR_ACTION]   : POST_FAILURE
    }),
    put       : payload => ({
      type: PUT,
      payload,
      [WAIT_FOR_ACTION]: PUT_FULFILLED,
      [ERROR_ACTION]   : PUT_FAILURE
    }),
    // Reducer creators
    reset    : () => ({ type: RESET }),
    resetItem: () => ({ type: RESET_ITEM }),
    setItem  : (item, mode = READ) => ({ type: SET_ITEM, item, mode }),
    update   : payload => ({ type: UPDATE, payload })
  }),
  selectors: ({ store }) => ({
    detail: state => state[store]
  })
}

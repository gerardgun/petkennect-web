import faker from 'faker'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _merge from 'lodash/merge'

import { KennelAreaDefaultConfig } from '@lib/constants/service'
import { Get } from '@lib/utils/http-client'
import * as serviceGroupSaga from '@sagas/service/group'
import * as tenantDetailSaga from '@sagas/tenant/detail'

import kennelAreaDuck from '@reducers/order/service/boarding/kennel/area'
import serviceGroupDuck from '@reducers/service/group'
import tenantDetailDuck from '@reducers/tenant/detail'

const { selectors, types } = kennelAreaDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const results = yield call(Get, '/orders-services-boardings-kennels-areas/', filters)

    // Load Service Groups
    let serviceGroupList = yield select(serviceGroupDuck.selectors.list)

    if(serviceGroupList.items.length === 0) {
      yield* serviceGroupSaga.get()

      serviceGroupList = yield select(serviceGroupDuck.selectors.list)
    }

    // Get payload information from tenant config
    let tenantDetail = yield select(tenantDetailDuck.selectors.detail)

    if(!tenantDetail.item.id) {
      yield* tenantDetailSaga.get()

      tenantDetail = yield select(tenantDetailDuck.selectors.detail)
    }

    const config = tenantDetail.item.service_config.kennel_areas

    const areas = results.map(item => {
      const itemConfig = _merge(
        _cloneDeep(KennelAreaDefaultConfig),
        _get(config, item.id, {})
      )

      return {
        ...item,
        ...itemConfig,
        service_groups: itemConfig.service_group_ids
          .map(serviceGroupId => {
            const serviceGroup = serviceGroupList.items.find(({ id }) => id === serviceGroupId)

            return serviceGroup
          })
          .filter(Boolean),
        capacity: faker.random.number(10)
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: areas
      }
    })
  } catch (e) {
    yield put({
      type : types.GET_FAILURE,
      error: e
    })
  }
}

export default [
  takeEvery(types.GET, get)
]

import { call, put, select, takeEvery } from 'redux-saga/effects'
import faker from 'faker'
import _cloneDeep from 'lodash/cloneDeep'
import _get from 'lodash/get'
import _merge from 'lodash/merge'

import { KennelTypeDefaultConfig } from '@lib/constants/service'
import { Get } from '@lib/utils/http-client'
import * as kennelAreaSaga from '@sagas/order/service/boarding/kennel/area'
import * as tenantDetailSaga from '@sagas/tenant/detail'

import kennelAreaDuck from '@reducers/order/service/boarding/kennel/area'
import kennelTypeDuck from '@reducers/order/service/boarding/kennel/type'
import tenantDetailDuck from '@reducers/tenant/detail'

const { selectors, types } = kennelTypeDuck

function* get() {
  try {
    yield put({ type: types.GET_PENDING })

    const filters = yield select(selectors.filters)

    const results = yield call(Get, 'orders-services-boardings-kennels-types/', filters)

    // Load Kennel Areas
    let kennelAreaList = yield select(kennelAreaDuck.selectors.list)

    if(kennelAreaList.items.length === 0) {
      yield* kennelAreaSaga.get()

      kennelAreaList = yield select(kennelAreaDuck.selectors.list)
    }

    // Get payload information from tenant config
    let tenantDetail = yield select(tenantDetailDuck.selectors.detail)

    if(!tenantDetail.item.id) {
      yield* tenantDetailSaga.get()

      tenantDetail = yield select(tenantDetailDuck.selectors.detail)
    }

    const config = tenantDetail.item.service_config.kennel_types

    const kennelTypes = results.map(item => {
      const itemConfig = _merge(
        _cloneDeep(KennelTypeDefaultConfig),
        _get(config, item.id, {})
      )

      return {
        ...item,
        ...itemConfig,
        kennel_areas: itemConfig.kennel_area_ids
          .map(kennelAreaId => {
            const kennelArea = kennelAreaList.items.find(({ id }) => id === kennelAreaId)

            return kennelArea
          })
          .filter(Boolean),
        image_url: faker.image.animals(400, 400)
      }
    })

    yield put({
      type   : types.GET_FULFILLED,
      payload: {
        items: kennelTypes
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

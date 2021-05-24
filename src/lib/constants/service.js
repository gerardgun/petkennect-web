import { obj2options } from '@lib/utils/functions'

export const ChargeType = {
  no_charge: 'No Charge',
  per_stay : 'Per Stay',
  per_night: 'Per Night'
}

export const ChargeTypeOptions = obj2options(ChargeType)

// Service Config Helpers
export const KennelAreaDefaultConfig = {
  service_group_ids: [],
  is_surcharge     : false,
  charge_type      : 'no_charge',
  price            : 0.00
}

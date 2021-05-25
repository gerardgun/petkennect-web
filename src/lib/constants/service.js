import { obj2options } from '@lib/utils/functions'

export const ChargeType = {
  no_charge: 'No Charge',
  per_stay : 'Per Stay',
  per_night: 'Per Night'
}

export const ChargeTypeOptions = obj2options(ChargeType)

export const GroupType = {
  B: 'Boarding',
  D: 'Day Services',
  G: 'Grooming',
  T: 'Training ',
  C: 'Custom'
}

export const ServiceDefaultConfig = {
  service_group: null,
  is_active    : false,
  is_taxable   : true,
  charge_type  : 'A'
}

// Service Config Helpers
export const KennelAreaDefaultConfig = {
  service_group_ids: [],
  is_surcharge     : false,
  charge_type      : 'no_charge',
  price            : 0.00
}

export const KennelTypeDefaultConfig = {
  kennel_area_ids: [],
  is_surcharge   : false,
  charge_type    : 'no_charge',
  price          : 0.00
}

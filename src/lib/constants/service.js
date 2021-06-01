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

export const ProtectedServiceType = {
  B: 'Boarding Activity',
  G: 'Group Class'
}

export const ServiceType = {
  ...ProtectedServiceType,
  C: 'Custom'
}

export const ServiceDefaultConfig = {
  service_group: null,
  is_active    : false,
  is_taxable   : true,
  charge_type  : 'A'
}

export const VariationCheckoutChargeType = {
  A: 'Before Checkout Time',
  B: 'Applies After Checkout Time'
}

export const VariationCheckoutChargeTypeOptions = obj2options(VariationCheckoutChargeType)

export const VariationType = {
  A: 'Appointment',
  R: 'Reservation'
}

export const VariationTypeOptions = obj2options(VariationType)

export const ServiceReservationDefaultConfig = {
  is_group_play_required: false,
  is_bookable_by_client : false,
  is_scheduled          : false,
  is_active             : false,
  price                 : {
    is_set_additional_pet_price: false
  },
  // Defaults
  duration_minutes: 60, // 1 hour
  capacity        : 1,
  is_main         : false,
  is_bookable     : true
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

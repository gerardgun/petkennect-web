import { obj2options } from '@lib/utils/functions'

export const ChargeType = {
  no_charge: 'No Charge',
  per_stay : 'Per Stay',
  per_night: 'Per Night'
}

export const ChargeTypeOptions = obj2options(ChargeType)

export const FoodTypeChargeType = {
  D: 'Per Day',
  M: 'Per Meal'
}

export const BaseGroupType = {
  B: 'Boarding',
  D: 'Day Services',
  G: 'Grooming',
  T: 'Training ',
  C: 'Custom'
}

export const GroupType = {
  ...BaseGroupType,
  A: 'Add-On',
  S: 'Surcharges '
}

export const ProtectedServiceType = {
  A: 'True Add-on',
  B: 'Boarding Activity',
  G: 'Group Class',
  O: 'Open Line Add-on',
  S: 'Surcharges',
  T: 'Transport Add-on'
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

export const VariationDurationType = {
  S: 'Sessions',
  W: 'Weeks'
}

export const VariationDurationTypeOptions = obj2options(VariationDurationType)

export const VariationReleaseCommissionUnit = {
  P: 'Percentage %',
  A: 'Amount $'
}

export const VariationReleaseCommissionUnitOptions = obj2options(VariationReleaseCommissionUnit)

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

export const ServiceVariationGroupClassDefaultConfig = {
  is_scheduled          : false,
  is_active             : false,
  // Defaults
  type                  : 'R',
  is_main               : false,
  is_group_play_required: true,
  is_bookable           : false,
  is_bookable_by_client : false,
  employee_schedule     : null,
  config                : {
    duration_type: 'S'
  }
}

export const ServiceVariationGroupClassSessionDefaultConfig = {
  is_bookable_by_client: false,
  locations            : [],
  // Defaults
  status               : 'P'
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

export const ServicePackageDefaultConfig = {
  locations               : [],
  service_variation_addons: [],
  is_limited              : false,
  is_hourly_credits       : false,
  is_suscription          : false,
  is_bookable_by_client   : false
}

export const TrueAddonServiceDefaultConfig = {
  service_groups       : [],
  service_types        : [],
  is_scheduled         : false,
  locations            : [],
  is_bookable_by_client: false,
  is_taxable           : false,
  is_active            : false,
  service_true_addon   : {
    service_variations: []
  }
}

export const OpenLineAddonServiceDefaultConfig = {
  locations              : [],
  is_taxable             : false,
  service_open_line_addon: {
    can_be_credit_negative: false,
    is_tip                : false
  }
}

export const TransportAddonServiceDefaultConfig = {
  service_groups         : [],
  service_types          : [],
  locations              : [],
  is_active              : false,
  is_bookable_by_client  : false,
  service_transport_addon: {
    service_variations: []
  }
}

export const Referred = {
  1: 'Veterinarian',
  2: 'Internet Search',
  3: 'Drive By',
  4: 'Event',
  5: 'Advertisement',
  6: 'Referral',
  7: 'Other'
}

export const Status = {
  active  : 'Active',
  caution : 'Caution',
  declined: 'Decline Client',
  vip     : 'VIP Client'
}

export const AddressType = {
  home : 'Home',
  work : 'Work',
  other: 'Other'
}

export const PhoneType = {
  cell : 'Cell Phone',
  home : 'Home Phone',
  work : 'Work Phone',
  other: 'Other Phone'
}

export const ReferredOptions
  = Object.entries(Referred)
    .map(([ value, text ], index) => ({
      key  : index,
      value: parseInt(value),
      text
    }))

export const AddressTypeOptions
  = Object.entries(AddressType)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

export const PhoneTypeOptions
  = Object.entries(PhoneType)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

export const Referred = {
  1: 'Drive-by',
  2: 'Event',
  3: 'Internet Search',
  4: 'Referral',
  5: 'Other'
}

export const ReferredOptions
  = Object.entries(Referred)
    .map(([ value, text ], index) => ({
      key  : index,
      value: parseInt(value),
      text
    }))

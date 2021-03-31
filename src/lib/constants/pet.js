export const NoteType = {
  B: 'Behavioral',
  M: 'Medical',
  G: 'General',
  O: 'Owner'
}

export const Size = {
  S: 'Small',
  M: 'Medium',
  L: 'Large',
  G: 'Giant'
}

export const TemperamentPeoplePreference = {
  M: 'Men',
  W: 'Women',
  N: 'No preference'
}

// This object status keys are in order. Don't reoder the elements.
export const VaccinationStatus = {
  expired: {
    color: 'red',
    text : 'Expired'
  },
  missing: {
    color: 'black',
    text : 'Missing'
  },
  comming_due: {
    color: 'orange',
    text : 'Coming Due'
  },
  requested: {
    color: 'blue',
    text : 'Pending'
  },
  vaccinated: {
    color: 'green',
    text : 'Current'
  }
}

export const NoteTypeOptions
  = Object.entries(NoteType)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

export const SizeOptions
  = Object.entries(Size)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

export const TemperamentPeoplePreferenceOptions
  = Object.entries(TemperamentPeoplePreference)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

export const PeekDaysAndFullDays = {
  peekday: [ new Date(2020, 11, 24),  new Date(2018, 8, 25) ],
  fullDay: [ new Date(2020, 11, 26) ]
}

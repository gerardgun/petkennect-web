export const NoteType = {
  B: 'Behavioral',
  M: 'Medical',
  G: 'General',
  O: 'Owner'
}

export const TemperamentPeoplePreference = {
  M: 'Men',
  W: 'Women',
  N: 'Neither'
}

export const VaccinationStatus = {
  requested: {
    color: 'orange',
    text : 'Verify!'
  },
  missing: {
    color: 'red',
    text : 'Missing'
  },
  expired: {
    color: 'red',
    text : 'Expired'
  },
  comming_due: {
    color: 'orange',
    text : 'Coming Due'
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

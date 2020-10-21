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
    color: 'blue',
    text : 'Verify!'
  },
  missing: {
    color: 'black',
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

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

export const TemperamentPeoplePreferenceOptions
  = Object.entries(TemperamentPeoplePreference)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

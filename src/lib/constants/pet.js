export const TemperamentPeoplePreference = {
  M: 'Men',
  W: 'Women',
  N: 'Neither'
}

export const TemperamentPeoplePreferenceOptions
  = Object.entries(TemperamentPeoplePreference)
    .map(([ value, text ], index) => ({
      key: index,
      value,
      text
    }))

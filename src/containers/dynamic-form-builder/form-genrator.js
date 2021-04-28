
export const formElements = [
  // General
  {
    type: 'header',
    meta: {
      as  : 'h3', // String. Optional. Default: 'h3'. Values: [h1, h2, h3, h4, h5, h6]
      text: 'Training Questionnaire Form' // String. Required.
    }
  },
  // Open Question Types
  {
    id      : 1,
    type    : 'input-text',
    label   : 'Input Text Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : 'Help text will be appear as a question icon.', // String. Optional. Default: null.
    meta    : {
      placeholder: ' Enter Answer' // String. Optional. Default: null.
    }
  },
  {
    id      : 2,
    type    : 'input-email',
    label   : 'Email Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : null, // String. Optional. Default: null.
    meta    : {
      placeholder: 'Lorem ipsum' // String. Optional. Default: sample@sample.com.
    }
  },
  {
    id      : 3,
    type    : 'input-website',
    label   : 'Website Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : 'Enter websit if any', // String. Optional. Default: null.
    meta    : {
      placeholder: 'https://yourwebsite.com' // String. Optional. Default: https://yourwebsite.com.
    }
  },
  {
    id      : 4,
    type    : 'input-number',
    label   : 'Number Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : null, // String. Optional. Default: null.
    meta    : {
      placeholder: 'Lorem ipsum',
      min        : 1, // Integer. Optional. Default: null  //pending
      max        : 4, // Integer. Optional. Default: null
      step       : 1 // Integer. Optional. Default: 1
    }
  },
  {
    id      : 5,
    type    : 'input-date',
    label   : 'Date Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : null // String. Optional. Default: null.
  },
  {
    id      : 6,
    type    : 'input-upload',
    label   : 'Upload Field', // String. Optional. Default: null.
    required: false, // Boolean. Required.
    help    : null, // String. Optional. Default: null.
    meta    : {
      placeholder: 'Lorem ipsum' // String. Optional. Default: 'Choose file...'.
    }
  },
  {
    id      : 7,
    type    : 'textarea',
    label   : 'Text Area Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : 'Help text will be appear as a question icon.', // String. Optional. Default: null.
    meta    : {
      placeholder: 'Lorem ipsum' // String. Optional. Default: null.
    }
  },
  {
    id      : 8,
    type    : 'rating',
    label   : 'Rating Field', // String. Optional. Default: null.
    required: false, // Boolean. Required.
    help    : null, // String. Optional. Default: null.
    meta    : {
      max_rating: 5 // Integer. Optional. Default: 5.
    }
  },
  // Closed Question Types
  {
    id      : 9,
    type    : 'radio',
    label   : 'Radio Field', // String. Optional. Default: null.
    required: false, // Boolean. Required.
    help    : null, // String. Optional. Default: null.
    meta    : {
      inline : false, // Boolean. Optional. Default: false. Display radio group inline.
      options: [
        {
          text : 'Display value 1', // String. Required.
          value: 101
        },
        {
          text : 'Display value 2', // String. Required.
          value: 102
        }
      ]
    }
  },
  {
    id      : 10,
    type    : 'dropdown',
    label   : 'Dropdown Field', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : 'Selct one Value', // String. Optional. Default: null.
    meta    : {
      placeholder: 'Lorem ipsum', // String. Optional. Default: Select one option.
      options    : [
        {
          text : 'Display value 1', // String. Required.
          value: 101
        },
        {
          text : 'Display value 2', // String. Required.
          value: 102
        }
      ]
    }
  },
  // Multiple Selection Question Types
  {
    id      : 11,
    type    : 'tag',
    label   : 'Multiple Tags ', // String. Optional. Default: null.
    required: true, // Boolean. Required.
    help    : 'You can select multiple choices in this field', // String. Optional. Default: null.
    meta    : {
      placeholder: 'Lorem ipsum', // String. Optional. Default: Select options.
      options    : [
        {
          text : 'Display value 1', // String. Required.
          value: 101
        },
        {
          text : 'Display value 2', // String. Required.
          value: 102
        }
      ]
    }
  },
  {
    id      : 12,
    type    : 'checkbox',
    label   : 'Check box Field', // String. Optional. Default: null.
    required: false, // Boolean. Required.
    help    : null, // String. Optional. Default: null.
    meta    : {
      inline : false, // Boolean. Optional. Default: false. Display checkbox group inline.
      options: [
        {
          text : 'Display value 1', // String. Required.
          value: 101
        },
        {
          text : 'Display value 2', // String. Required.
          value: 102
        }
      ]
    }
  }
]

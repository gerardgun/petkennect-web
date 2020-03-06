import * as Yup from 'yup'

export default {
  city: Yup.number().required('City is required'),
  comment: Yup.string().required('Comment is required'),
  date: Yup.string().required('Date is required'),
  file: Yup.mixed().required('File is required'),
  email    : Yup.string().email('Email address is not valid').required('Email is required'),
  first_lastname : Yup.string().required('First lastname is required'),
  lastname : Yup.string().required('Lastnames are required'),
  name     : Yup.string().required('Name is required'),
  nullable: Yup.mixed().nullable(),
  num_required: Yup.number().required('This field is required'),
  password : Yup.string()
    .matches(/^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\d\X]).*$/, 'Password must have characters and numbers')
    .min(6, 'Password must be more than 6 characters')
    .required('The password is required'),
  second_lastname : Yup.string().required('Second lastname is required'),
  state: Yup.number().required('State is required'),
  whenIsUpdating: (then, otherwise) => Yup.mixed().when('id', (id, schema) => (id ? then : otherwise)),
  zip: Yup.number().required('Zip is required'),
}
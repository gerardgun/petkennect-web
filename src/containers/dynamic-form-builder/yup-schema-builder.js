import * as Yup from 'yup'
import  { formElements } from './form-genrator'

export const schemaBuilder = () =>{
  let schema = {}
  formElements && formElements.forEach((item)=>{
    if(item.required != undefined && item.required === true)
      schema[item.id] = Yup.mixed().required('required')
  })

  return schema
}

import { obj2options } from '@lib/utils/functions'

export const ProductAttributeType = {
  C: 'Color',
  D: 'Dropdown',
  R: 'Radio'
}

export const ProductAttributeTypeOptions = obj2options(ProductAttributeType)

export const ProtectedProductFamilyType = {
  A: 'Accesory',
  F: 'Food'
}

export const ProductFamilyType = {
  ...ProtectedProductFamilyType,
  C: 'Custom'
}

export const ProductFamilyTypeOptions = obj2options(ProductFamilyType)

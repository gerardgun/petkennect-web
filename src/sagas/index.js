import { all } from 'redux-saga/effects'

import auth from './auth'
import category from './category'
import categoryDetail from './category/detail'
import client from './client'
import clientDetail from './client/detail'
import clientComment from './client/comment'
import clientCommentDetail from './client/comment/detail'
import clientDocument from './client/document'
import clientDocumentDetail from './client/document/detail'
import clientDocumentType from './client/document/type'
import clientDocumentTypeDetail from './client/document/type/detail'
import clientPet from './client/pet'
import company from './company'
import companyDetail from './company/detail'
import employee from './employee'
import employeeDetail from './employee/detail'
import employeeTitle from './employee/title'
import employeeTitleDetail from './employee/title/detail'
import location from './location'
import locationDetail from './location/detail'
import organization from './organization'
import organizationDetail from './organization/detail'
import pet from './pet'
import petDetail from './pet/detail'
import petBreed from './pet/breed'
import petBreedDetail from './pet/breed/detail'
import petClass from './pet/class'
import petClassDetail from './pet/class/detail'
import petImage from './pet/image'
import petImageDetail from './pet/image/detail'
import product from './product'
import productDetail from './product/detail'
import productImage from './product/image'
import productImageDetail from './product/image/detail'
import rol from './rol'
import rolDetail from './rol/detail'
import rolPermission from './rol/permission'
import transaction from './transaction'
import transactionDetail from './transaction/detail'
import user from './user'
import userDetail from './user/detail'
import zip from './zip'
import zipDetail from './zip/detail'

export default function* rootSaga() {
  yield all([
    ...auth,
    ...category,
    ...categoryDetail,
    ...client,
    ...clientDetail,
    ...clientComment,
    ...clientCommentDetail,
    ...clientDocument,
    ...clientDocumentDetail,
    ...clientDocumentType,
    ...clientDocumentTypeDetail,
    ...clientPet,
    ...company,
    ...companyDetail,
    ...employee,
    ...employeeDetail,
    ...employeeTitle,
    ...employeeTitleDetail,
    ...location,
    ...locationDetail,
    ...organization,
    ...organizationDetail,
    ...pet,
    ...petDetail,
    ...petBreed,
    ...petBreedDetail,
    ...petClass,
    ...petClassDetail,
    ...petImage,
    ...petImageDetail,
    ...product,
    ...productDetail,
    ...productImage,
    ...productImageDetail,
    ...rol,
    ...rolDetail,
    ...rolPermission,
    ...transaction,
    ...transactionDetail,
    ...user,
    ...userDetail,
    ...zip,
    ...zipDetail
  ])
}

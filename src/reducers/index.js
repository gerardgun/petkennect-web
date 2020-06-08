import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from '@reducers/auth'
import category from '@reducers/category'
import categoryDetail from '@reducers/category/detail'
import client from '@reducers/client'
import clientDetail from '@reducers/client/detail'
import clientComment from '@reducers/client/comment'
import clientCommentDetail from '@reducers/client/comment/detail'
import clientDocument from '@reducers/client/document'
import clientDocumentDetail from '@reducers/client/document/detail'
import clientDocumentType from '@reducers/client/document/type'
import clientDocumentTypeDetail from '@reducers/client/document/type/detail'
import clientPet from '@reducers/client/pet'
import company from '@reducers/company'
import companyDetail from '@reducers/company/detail'
import employee from '@reducers/employee'
import employeeDetail from '@reducers/employee/detail'
import employeeTitle from '@reducers/employee/title'
import employeeTitleDetail from '@reducers/employee/title/detail'
import location from '@reducers/location'
import locationDetail from '@reducers/location/detail'
import organization from '@reducers/organization'
import organizationDetail from '@reducers/organization/detail'
import organizationCompany from '@reducers/organization/company'
import pet from '@reducers/pet'
import petDetail from '@reducers/pet/detail'
import petBreed from '@reducers/pet/breed'
import petBreedDetail from '@reducers/pet/breed/detail'
import petClass from '@reducers/pet/class'
import petClassDetail from '@reducers/pet/class/detail'
import petImage from '@reducers/pet/image'
import petImageDetail from '@reducers/pet/image/detail'
import petIncidentType from '@reducers/pet/incident-type'
import petIncidentTypeDetail from '@reducers/pet/incident-type/detail'
import product from '@reducers/product'
import productDetail from '@reducers/product/detail'
import productImage from '@reducers/product/image'
import productImageDetail from '@reducers/product/image/detail'
import productPackage from '@reducers/product/package'
import productPackageDetail from '@reducers/product/package/detail'
import rol from '@reducers/rol'
import rolDetail from '@reducers/rol/detail'
import rolPermission from '@reducers/rol/permission'
import service from '@reducers/service'
import serviceDetail from '@reducers/service/detail'
import serviceAddon from '@reducers/service/addon'
import serviceAddonDetail from '@reducers/service/addon/detail'
import serviceAddonGroup from '@reducers/service/addon/group'
import serviceAddonGroupDetail from '@reducers/service/addon/group/detail'
import transaction from '@reducers/transaction'
import transactionDetail from '@reducers/transaction/detail'
import user from '@reducers/user'
import userDetail from '@reducers/user/detail'
import zip from '@reducers/zip'
import zipDetail from '@reducers/zip/detail'

const createRootReducer = history => combineReducers({
  form                            : formReducer,
  router                          : connectRouter(history),
  [auth.store]                    : auth.reducer,
  [category.store]                : category.reducer,
  [categoryDetail.store]          : categoryDetail.reducer,
  [client.store]                  : client.reducer,
  [clientDetail.store]            : clientDetail.reducer,
  [clientDocument.store]          : clientDocument.reducer,
  [clientDocumentDetail.store]    : clientDocumentDetail.reducer,
  [clientDocumentType.store]      : clientDocumentType.reducer,
  [clientDocumentTypeDetail.store]: clientDocumentTypeDetail.reducer,
  [clientComment.store]           : clientComment.reducer,
  [clientCommentDetail.store]     : clientCommentDetail.reducer,
  [clientPet.store]               : clientPet.reducer,
  [company.store]                 : company.reducer,
  [companyDetail.store]           : companyDetail.reducer,
  [employee.store]                : employee.reducer,
  [employeeDetail.store]          : employeeDetail.reducer,
  [employeeTitle.store]           : employeeTitle.reducer,
  [employeeTitleDetail.store]     : employeeTitleDetail.reducer,
  [location.store]                : location.reducer,
  [locationDetail.store]          : locationDetail.reducer,
  [organization.store]            : organization.reducer,
  [organizationDetail.store]      : organizationDetail.reducer,
  [organizationCompany.store]     : organizationCompany.reducer,
  [pet.store]                     : pet.reducer,
  [petDetail.store]               : petDetail.reducer,
  [petBreed.store]                : petBreed.reducer,
  [petBreedDetail.store]          : petBreedDetail.reducer,
  [petClass.store]                : petClass.reducer,
  [petClassDetail.store]          : petClassDetail.reducer,
  [petImage.store]                : petImage.reducer,
  [petImageDetail.store]          : petImageDetail.reducer,
  [petIncidentType.store]         : petIncidentType.reducer,
  [petIncidentTypeDetail.store]   : petIncidentTypeDetail.reducer,
  [product.store]                 : product.reducer,
  [productDetail.store]           : productDetail.reducer,
  [productImage.store]            : productImage.reducer,
  [productImageDetail.store]      : productImageDetail.reducer,
  [productPackage.store]          : productPackage.reducer,
  [productPackageDetail.store]    : productPackageDetail.reducer,
  [rol.store]                     : rol.reducer,
  [rolDetail.store]               : rolDetail.reducer,
  [rolPermission.store]           : rolPermission.reducer,
  [transaction.store]             : transaction.reducer,
  [service.store]                 : service.reducer,
  [serviceDetail.store]           : serviceDetail.reducer,
  [serviceAddon.store]            : serviceAddon.reducer,
  [serviceAddonDetail.store]      : serviceAddonDetail.reducer,
  [serviceAddonGroup.store]       : serviceAddonGroup.reducer,
  [serviceAddonGroupDetail.store] : serviceAddonGroupDetail.reducer,
  [transactionDetail.store]       : transactionDetail.reducer,
  [user.store]                    : user.reducer,
  [userDetail.store]              : userDetail.reducer,
  [zip.store]                     : zip.reducer,
  [zipDetail.store]               : zipDetail.reducer
})

export default createRootReducer

import { all } from 'redux-saga/effects'

import agreement from './agreement'
import agreementDetail from './agreement/detail'
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
import petIncidentType from './pet/incident-type'
import petIncidentTypeDetail from './pet/incident-type/detail'
import petIncidentAction from './pet/incident-action'
import petIncidentActionDetail from './pet/incident-action/detail'
import petIncidentBehavior from './pet/incident-behavior'
import petIncidentBehaviorDetail from './pet/incident-behavior/detail'
import petIncident from './pet/incident'
import petIncidentDetail from './pet/incident/detail'
import petNote from './pet/note'
import petNoteDetail from './pet/note/detail'
import petReservation from './pet/reservation'
import petReservationDetail from './pet/reservation/detail'
import petVaccination from './pet/vaccination'
import petVaccinationDetail from './pet/vaccination/detail'
import product from './product'
import productDetail from './product/detail'
import productImage from './product/image'
import productImageDetail from './product/image/detail'
import productPackage from './product/package'
import productPackageDetail from './product/package/detail'
import reservation from './reservation'
import reservationDetail from './reservation/detail'
import rol from './rol'
import rolDetail from './rol/detail'
import rolPermission from './rol/permission'
import service from './service'
import serviceDetail from './service/detail'
import serviceAddon from './service/addon'
import serviceAddonDetail from './service/addon/detail'
import serviceAddonGroup from './service/addon/group'
import serviceAddonGroupDetail from './service/addon/group/detail'
import transaction from './transaction'
import transactionDetail from './transaction/detail'
import user from './user'
import userDetail from './user/detail'
import zip from './zip'
import zipDetail from './zip/detail'

export default function* rootSaga() {
  yield all([
    ...agreement,
    ...agreementDetail,
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
    ...petIncidentType,
    ...petIncidentTypeDetail,
    ...petIncidentAction,
    ...petIncidentActionDetail,
    ...petIncidentBehavior,
    ...petIncidentBehaviorDetail,
    ...petIncident,
    ...petIncidentDetail,
    ...petNote,
    ...petNoteDetail,
    ...petReservation,
    ...petReservationDetail,
    ...petVaccination,
    ...petVaccinationDetail,
    ...product,
    ...productDetail,
    ...productImage,
    ...productImageDetail,
    ...productPackage,
    ...productPackageDetail,
    ...reservation,
    ...reservationDetail,
    ...rol,
    ...rolDetail,
    ...rolPermission,
    ...service,
    ...serviceDetail,
    ...serviceAddon,
    ...serviceAddonDetail,
    ...serviceAddonGroup,
    ...serviceAddonGroupDetail,
    ...transaction,
    ...transactionDetail,
    ...user,
    ...userDetail,
    ...zip,
    ...zipDetail
  ])
}

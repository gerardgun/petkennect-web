import { all } from 'redux-saga/effects'
import agreement from './agreement'
import agreementDetail from './agreement/detail'
import auth from './auth'
import application from './application'
import category from './category'
import categoryDetail from './category/detail'
import client from './client'
import clientDetail from './client/detail'
import clientAgreement from './client/agreement'
import clientAgreementDetail from './client/agreement/detail'
import clientComment from './client/comment'
import clientCommentDetail from './client/comment/detail'
import clientDocument from './client/document'
import clientDocumentDetail from './client/document/detail'
import clientDocumentType from './client/document/type'
import clientDocumentTypeDetail from './client/document/type/detail'
import clientPet from './client/pet'
import clientEmailMessage from './client/email-message'
import company from './company'
import companyDetail from './company/detail'
import customReport from './custom-report'
import customized from './customized-field'
import customizedField from './customized-field/field'
import customizedFieldDetail from './customized-field/field/detail'
import customizedFieldGroup from './customized-field/group'
import customizedFieldGroupDetail from './customized-field/group/detail'
import daycampCard from './pet/reservation/daycamp-card'
import daycampCardDetail from './pet/reservation/daycamp-card/detail'
import daycampCardQuestion from './pet/reservation/daycamp-card/daycamp-card-question'
import daycampCardQuestionDetail from './pet/reservation/daycamp-card/daycamp-card-question/detail'
import daycampCardAnswerDetail from './pet/reservation/daycamp-card/daycamp-card-answer/detail'
import employee from './employee'
import employeeDetail from './employee/detail'
import employeeTitle from './employee/title'
import employeeTitleDetail from './employee/title/detail'
import emailMessage from './email-message'
import emailTemplate from './email-template'
import emailLog from './email-log'
import location from './location'
import locationDetail from './location/detail'
import notification from './notification'
import organization from './organization'
import organizationDetail from './organization/detail'
import packagePricing from './package-pricing'
import pet from './pet'
import petDetail from './pet/detail'
import petBreed from './pet/breed'
import petBreedDetail from './pet/breed/detail'
import petKind from './pet/kind'
import petKindDetail from './pet/kind/detail'
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
import petRetireReason from './pet/retire-reason'
import petRetireReasonDetail from './pet/retire-reason/detail'
import petReservation from './pet/reservation'
import petReservationDetail from './pet/reservation/detail'
import petReservationDaycampQuestion from './pet/reservation/daycamp-question'
import petReservationDaycampQuestionDetail from './pet/reservation/daycamp-question/detail'
import petReservationTrainingPackage from './pet/reservation/training/package'
import petReservationTrainingReservation from './pet/reservation/training/reservation'
import petVaccination from './pet/vaccination'
import petVaccinationDetail from './pet/vaccination/detail'
import petVaccinationType from './pet/vaccination-type'
import petVaccinationTypeDetail from './pet/vaccination-type/detail'
import petKennel from './pet/pet-kennel'
import petKennelDetail from './pet/pet-kennel/detail'
import petKennelType from './pet/pet-kennel-type'
import petKennelTypeDetail from './pet/pet-kennel-type/detail'
import petKennelArea from './pet/pet-kennel-area'
import petKennelAreaDetail from './pet/pet-kennel-area/detail'
import petYardType from './pet/pet-yard-type'
import petYardTypeDetail from './pet/pet-yard-type/detail'
import priceMaster from './price-master'
import priceMasterDetail from './price-master/detail'
import product from './product'
import productDetail from './product/detail'
import productAttribute from './product/product-attribute'
import productAttributeDetail from './product/product-attribute/detail'
import productAttributeValue from './product/product-attribute-value'
import productAttributeValueDetail from './product/product-attribute-value/detail'
import productClasses from './product/product-classes'
import productClassesDetail from './product/product-classes/detail'
import productImage from './product/image'
import productImageDetail from './product/image/detail'
import productFamilies from './product/product-families'
import productFamiliesDetail from './product/product-families/detail'
import productPackage from './product/package'
import productPackageDetail from './product/package/detail'
import productVariations from './product/product-variations'
import productVariationsDetail from './product/product-variations/detail'
import productVariationsImageDetail from './product/product-variations/image/detail'
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
import serviceAttribute from './service/service-attribute'
import serviceAttributeDetail from './service/service-attribute/detail'
import serviceAttributeValue from './service/service-attribute-value'
import serviceAttributeValueDetail from './service/service-attribute-value/detail'
import onlineRequestClientSubmission from './online-request/client-submission'
import onlineRequestConfirmReservation from './online-request/confirm-reservation'
import onlineRequestVaccinationUpdate from './online-request/vaccination-update'
import trainingCommand from './training-command'
import trainingCommandDetail from './training-command/detail'
import trainingMethod from './training-method'
import trainingMethodDetail from './training-method/detail'
import trainingReason from './training-reason'
import trainingReasonDetail from './training-reason/detail'
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
    ...application,
    ...auth,
    ...category,
    ...categoryDetail,
    ...client,
    ...clientDetail,
    ...clientComment,
    ...clientAgreement,
    ...clientAgreementDetail,
    ...clientCommentDetail,
    ...clientDocument,
    ...clientDocumentDetail,
    ...clientDocumentType,
    ...clientDocumentTypeDetail,
    ...clientEmailMessage,
    ...clientPet,
    ...company,
    ...companyDetail,
    ...customReport,
    ...customized,
    ...customizedField,
    ...customizedFieldDetail,
    ...customizedFieldGroup,
    ...customizedFieldGroupDetail,
    ...daycampCard,
    ...daycampCardDetail,
    ...daycampCardQuestion,
    ...daycampCardQuestionDetail,
    ...daycampCardAnswerDetail,
    ...emailMessage,
    ...emailTemplate,
    ...emailLog,
    ...employee,
    ...employeeDetail,
    ...employeeTitle,
    ...employeeTitleDetail,
    ...location,
    ...locationDetail,
    ...notification,
    ...organization,
    ...organizationDetail,
    ...packagePricing,
    ...pet,
    ...petDetail,
    ...petBreed,
    ...petBreedDetail,
    ...petKind,
    ...petKindDetail,
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
    ...petRetireReason,
    ...petRetireReasonDetail,
    ...petReservation,
    ...petReservationDetail,
    ...petReservationDaycampQuestion,
    ...petReservationDaycampQuestionDetail,
    ...petReservationTrainingPackage,
    ...petReservationTrainingReservation,
    ...petVaccination,
    ...petVaccinationDetail,
    ...petVaccinationType,
    ...petVaccinationTypeDetail,
    ...petKennel,
    ...petKennelDetail,
    ...petKennelType,
    ...petKennelTypeDetail,
    ...petKennelArea,
    ...petKennelAreaDetail,
    ...petYardType,
    ...petYardTypeDetail,
    ...priceMaster,
    ...priceMasterDetail,
    ...product,
    ...productDetail,
    ...productAttribute,
    ...productAttributeDetail,
    ...productAttributeValue,
    ...productAttributeValueDetail,
    ...productClasses,
    ...productClassesDetail,
    ...productImage,
    ...productImageDetail,
    ...productFamilies,
    ...productFamiliesDetail,
    ...productPackage,
    ...productPackageDetail,
    ...productVariations,
    ...productVariationsDetail,
    ...productVariationsImageDetail,
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
    ...serviceAttribute,
    ...serviceAttributeDetail,
    ...serviceAttributeValue,
    ...serviceAttributeValueDetail,
    ...onlineRequestClientSubmission,
    ...onlineRequestConfirmReservation,
    ...onlineRequestVaccinationUpdate,
    ...trainingCommand,
    ...trainingCommandDetail,
    ...trainingMethod,
    ...trainingMethodDetail,
    ...trainingReason,
    ...trainingReasonDetail,
    ...transaction,
    ...transactionDetail,
    ...user,
    ...userDetail,
    ...zip,
    ...zipDetail
  ])
}

import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import agreement from '@reducers/agreement'
import agreementDetail from '@reducers/agreement/detail'
import application from '@reducers/application'
import auth from '@reducers/auth'
import calendarDetail from '@reducers/calendar/detail'
import category from '@reducers/category'
import categoryDetail from '@reducers/category/detail'
import client from '@reducers/client'
import clientDetail from '@reducers/client/detail'
import clientComment from '@reducers/client/comment'
import clientAgreement from '@reducers/client/agreement'
import clientAgreementDetail from '@reducers/client/agreement/detail'
import clientCommentDetail from '@reducers/client/comment/detail'
import clientDocument from '@reducers/client/document'
import clientDocumentDetail from '@reducers/client/document/detail'
import clientDocumentType from '@reducers/client/document/type'
import clientDocumentTypeDetail from '@reducers/client/document/type/detail'
import clientPet from '@reducers/client/pet'
import company from '@reducers/company'
import companyDetail from '@reducers/company/detail'
import customized from '@reducers/customized-field'
import customizedField from '@reducers/customized-field/field'
import customizedFieldDetail from '@reducers/customized-field/field/detail'
import customizedFieldGroup from '@reducers/customized-field/group'
import customizedFieldGroupDetail from '@reducers/customized-field/group/detail'
import employee from '@reducers/employee'
import employeeDetail from '@reducers/employee/detail'
import employeeTitle from '@reducers/employee/title'
import employeeTitleDetail from '@reducers/employee/title/detail'
import location from '@reducers/location'
import locationDetail from '@reducers/location/detail'
import notification from '@reducers/notification'
import notificationDetail from '@reducers/notification/detail'
import organization from '@reducers/organization'
import organizationDetail from '@reducers/organization/detail'
import organizationCompany from '@reducers/organization/company'
import pet from '@reducers/pet'
import petDetail from '@reducers/pet/detail'
import petBreed from '@reducers/pet/breed'
import petBreedDetail from '@reducers/pet/breed/detail'
import petKind from '@reducers/pet/kind'
import petKindDetail from '@reducers/pet/kind/detail'
import petImage from '@reducers/pet/image'
import petImageDetail from '@reducers/pet/image/detail'
import petIncidentType from '@reducers/pet/incident-type'
import petIncidentTypeDetail from '@reducers/pet/incident-type/detail'
import petIncidentAction from '@reducers/pet/incident-action'
import petIncidentActionDetail from '@reducers/pet/incident-action/detail'
import petIncidentBehavior from '@reducers/pet/incident-behavior'
import petIncidentBehaviorDetail from '@reducers/pet/incident-behavior/detail'
import petIncident from '@reducers/pet/incident'
import petIncidentDetail from '@reducers/pet/incident/detail'
import petRetireReason from '@reducers/pet/retire-reason'
import petRetireReasonDetail from '@reducers/pet/retire-reason/detail'
import petVaccination from '@reducers/pet/vaccination'
import petVaccinationDetail from '@reducers/pet/vaccination/detail'
import petVaccinationType from '@reducers/pet/vaccination-type'
import petVaccinationTypeDetail from '@reducers/pet/vaccination-type/detail'
import petNote from '@reducers/pet/note'
import petNoteDetail from '@reducers/pet/note/detail'
import petReservation from '@reducers/pet/reservation'
import petReservationDetail from '@reducers/pet/reservation/detail'
import petReservationDaycampQuestion from '@reducers/pet/reservation/dacamp-question'
import petReservationDaycampQuestionDetail from '@reducers/pet/reservation/dacamp-question/detail'
import petKennel from '@reducers/pet/pet-kennel'
import petKennelDetail from '@reducers/pet/pet-kennel/detail'
import petKennelType from '@reducers/pet/pet-kennel-type'
import petKennelTypeDetail from '@reducers/pet/pet-kennel-type/detail'
import petKennelArea from '@reducers/pet/pet-kennel-area'
import petKennelAreaDetail from '@reducers/pet/pet-kennel-area/detail'
import petYardType from '@reducers/pet/pet-yard-type'
import petYardTypeDetail from '@reducers/pet/pet-yard-type/detail'
import product from '@reducers/product'
import productDetail from '@reducers/product/detail'
import productAttribute from '@reducers/product/product-attribute'
import productAttributeDetail from '@reducers/product/product-attribute/detail'
import productAttributeValue from '@reducers/product/product-attribute-value'
import productAttributeValueDetail from '@reducers/product/product-attribute-value/detail'
import productClasses from '@reducers/product/product-classes'
import productClassesDetail from '@reducers/product/product-classes/detail'
import priceMaster from '@reducers/price-master'
import priceMasterDetail from '@reducers/price-master/detail'
import productImage from '@reducers/product/image'
import productImageDetail from '@reducers/product/image/detail'
import productFamilies from '@reducers/product/product-families'
import productFamiliesDetail from '@reducers/product/product-families/detail'
import productVariations from '@reducers/product/product-variations'
import productVariationsDetail from '@reducers/product/product-variations/detail'
import productVariationsImageDetail from '@reducers/product/product-variations/image/detail'
import productPackage from '@reducers/product/package'
import productPackageDetail from '@reducers/product/package/detail'
import reservation from '@reducers/reservation'
import reservationDetail from '@reducers/reservation/detail'
import rol from '@reducers/rol'
import rolDetail from '@reducers/rol/detail'
import rolPermission from '@reducers/rol/permission'
import service from '@reducers/service'
import serviceDetail from '@reducers/service/detail'
import serviceAddon from '@reducers/service/addon'
import serviceAddonDetail from '@reducers/service/addon/detail'
import serviceAddonGroup from '@reducers/service/addon/group'
import serviceAddonGroupDetail from '@reducers/service/addon/group/detail'
import serviceAttribute from '@reducers/service/service-attribute'
import serviceAttributeDetail from '@reducers/service/service-attribute/detail'
import serviceAttributeValue from '@reducers/service/service-attribute-value'
import serviceAttributeValueDetail from '@reducers/service/service-attribute-value/detail'
import onlineRequestsClientSubmission from '@reducers/online-request/client-submission'
import onlineRequestsClientSubmissionDetail from '@reducers/online-request/client-submission/detail'
import onlineRequestsConfirmReservation from '@reducers/online-request/confirm-reservation'
import onlineRequestsConfirmReservationDetail from '@reducers/online-request/confirm-reservation/detail'
import onlineRequestsDeclinedClients from '@reducers/online-request/declined-client'
import onlineRequestsDeclinedClientsDetail from '@reducers/online-request/declined-client/detail'
import onlineRequestsClientDocument from '@reducers/online-request/client-submission/client-document'
import onlineRequestsClientDocumentDetail from '@reducers/online-request/client-submission/client-document/detail'
import onlineRequestsVaccinationUpdate from '@reducers/online-request/vaccination-update'
import onlineRequestsVaccinationUpdateDetail from '@reducers/online-request/vaccination-update/detail'
import onlineRequestsCancellationLogs from '@reducers/online-request/cancellation-log'
import onlineRequestsCancellationLogsDetail from '@reducers/online-request/cancellation-log/detail'
import trainingCommand from '@reducers/training-command'
import trainingCommandDetail from '@reducers/training-command/detail'
import trainingMethod from '@reducers/training-method'
import trainingMethodDetail from '@reducers/training-method/detail'
import trainingReason from '@reducers/training-reason'
import trainingReasonDetail from '@reducers/training-reason/detail'
import transaction from '@reducers/transaction'
import transactionDetail from '@reducers/transaction/detail'
import user from '@reducers/user'
import userDetail from '@reducers/user/detail'
import zip from '@reducers/zip'
import zipDetail from '@reducers/zip/detail'

const createRootReducer = history => combineReducers({
  form                                          : formReducer,
  router                                        : connectRouter(history),
  [agreement.store]                             : agreement.reducer,
  [agreementDetail.store]                       : agreementDetail.reducer,
  [auth.store]                                  : auth.reducer,
  [application.store]                           : application.reducer,
  [calendarDetail.store]                        : calendarDetail.reducer,
  [category.store]                              : category.reducer,
  [categoryDetail.store]                        : categoryDetail.reducer,
  [client.store]                                : client.reducer,
  [clientDetail.store]                          : clientDetail.reducer,
  [clientDocument.store]                        : clientDocument.reducer,
  [clientDocumentDetail.store]                  : clientDocumentDetail.reducer,
  [clientDocumentType.store]                    : clientDocumentType.reducer,
  [clientDocumentTypeDetail.store]              : clientDocumentTypeDetail.reducer,
  [clientAgreement.store]                       : clientAgreement.reducer,
  [clientAgreementDetail.store]                 : clientAgreementDetail.reducer,
  [clientComment.store]                         : clientComment.reducer,
  [clientCommentDetail.store]                   : clientCommentDetail.reducer,
  [clientPet.store]                             : clientPet.reducer,
  [company.store]                               : company.reducer,
  [companyDetail.store]                         : companyDetail.reducer,
  [customized.store]                            : customized.reducer,
  [customizedField.store]                       : customizedField.reducer,
  [customizedFieldDetail.store]                 : customizedFieldDetail.reducer,
  [customizedFieldGroup.store]                  : customizedFieldGroup.reducer,
  [customizedFieldGroupDetail.store]            : customizedFieldGroupDetail.reducer,
  [employee.store]                              : employee.reducer,
  [employeeDetail.store]                        : employeeDetail.reducer,
  [employeeTitle.store]                         : employeeTitle.reducer,
  [employeeTitleDetail.store]                   : employeeTitleDetail.reducer,
  [location.store]                              : location.reducer,
  [locationDetail.store]                        : locationDetail.reducer,
  [notification.store]                          : notification.reducer,
  [notificationDetail.store]                    : notificationDetail.reducer,
  [organization.store]                          : organization.reducer,
  [organizationDetail.store]                    : organizationDetail.reducer,
  [organizationCompany.store]                   : organizationCompany.reducer,
  [pet.store]                                   : pet.reducer,
  [petDetail.store]                             : petDetail.reducer,
  [petBreed.store]                              : petBreed.reducer,
  [petBreedDetail.store]                        : petBreedDetail.reducer,
  [petKind.store]                               : petKind.reducer,
  [petKindDetail.store]                         : petKindDetail.reducer,
  [petImage.store]                              : petImage.reducer,
  [petImageDetail.store]                        : petImageDetail.reducer,
  [petIncidentType.store]                       : petIncidentType.reducer,
  [petIncidentTypeDetail.store]                 : petIncidentTypeDetail.reducer,
  [petIncidentAction.store]                     : petIncidentAction.reducer,
  [petIncidentActionDetail.store]               : petIncidentActionDetail.reducer,
  [petIncidentBehavior.store]                   : petIncidentBehavior.reducer,
  [petIncidentBehaviorDetail.store]             : petIncidentBehaviorDetail.reducer,
  [petIncident.store]                           : petIncident.reducer,
  [petIncidentDetail.store]                     : petIncidentDetail.reducer,
  [petRetireReason.store]                       : petRetireReason.reducer,
  [petRetireReasonDetail.store]                 : petRetireReasonDetail.reducer,
  [petVaccination.store]                        : petVaccination.reducer,
  [petVaccinationDetail.store]                  : petVaccinationDetail.reducer,
  [petVaccinationType.store]                    : petVaccinationType.reducer,
  [petVaccinationTypeDetail.store]              : petVaccinationTypeDetail.reducer,
  [petNote.store]                               : petNote.reducer,
  [petNoteDetail.store]                         : petNoteDetail.reducer,
  [petReservation.store]                        : petReservation.reducer,
  [petReservationDetail.store]                  : petReservationDetail.reducer,
  [petReservationDaycampQuestion.store]         : petReservationDaycampQuestion.reducer,
  [petReservationDaycampQuestionDetail.store]   : petReservationDaycampQuestionDetail.reducer,
  [petVaccination.store]                        : petVaccination.reducer,
  [petVaccinationDetail.store]                  : petVaccinationDetail.reducer,
  [petKennel.store]                             : petKennel.reducer,
  [petKennelDetail.store]                       : petKennelDetail.reducer,
  [petKennelType.store]                         : petKennelType.reducer,
  [petKennelTypeDetail.store]                   : petKennelTypeDetail.reducer,
  [petKennelArea.store]                         : petKennelArea.reducer,
  [petKennelAreaDetail.store]                   : petKennelAreaDetail.reducer,
  [petYardType.store]                           : petYardType.reducer,
  [petYardTypeDetail.store]                     : petYardTypeDetail.reducer,
  [priceMaster.store]                           : priceMaster.reducer,
  [priceMasterDetail.store]                     : priceMasterDetail.reducer,
  [product.store]                               : product.reducer,
  [productDetail.store]                         : productDetail.reducer,
  [productAttribute.store]                      : productAttribute.reducer,
  [productAttributeDetail.store]                : productAttributeDetail.reducer,
  [productAttributeValue.store]                 : productAttributeValue.reducer,
  [productAttributeValueDetail.store]           : productAttributeValueDetail.reducer,
  [productClasses.store]                        : productClasses.reducer,
  [productClassesDetail.store]                  : productClassesDetail.reducer,
  [productImage.store]                          : productImage.reducer,
  [productImageDetail.store]                    : productImageDetail.reducer,
  [productFamilies.store]                       : productFamilies.reducer,
  [productFamiliesDetail.store]                 : productFamiliesDetail.reducer,
  [productPackage.store]                        : productPackage.reducer,
  [productPackageDetail.store]                  : productPackageDetail.reducer,
  [productVariations.store]                     : productVariations.reducer,
  [productVariationsDetail.store]               : productVariationsDetail.reducer,
  [productVariationsImageDetail.store]          : productVariationsImageDetail.reducer,
  [reservation.store]                           : reservation.reducer,
  [reservationDetail.store]                     : reservationDetail.reducer,
  [rol.store]                                   : rol.reducer,
  [rolDetail.store]                             : rolDetail.reducer,
  [rolPermission.store]                         : rolPermission.reducer,
  [transaction.store]                           : transaction.reducer,
  [service.store]                               : service.reducer,
  [serviceDetail.store]                         : serviceDetail.reducer,
  [serviceAddon.store]                          : serviceAddon.reducer,
  [serviceAddonDetail.store]                    : serviceAddonDetail.reducer,
  [serviceAddonGroup.store]                     : serviceAddonGroup.reducer,
  [serviceAddonGroupDetail.store]               : serviceAddonGroupDetail.reducer,
  [serviceAttribute.store]                      : serviceAttribute.reducer,
  [serviceAttributeDetail.store]                : serviceAttributeDetail.reducer,
  [serviceAttributeValue.store]                 : serviceAttributeValue.reducer,
  [serviceAttributeValueDetail.store]           : serviceAttributeValueDetail.reducer,
  [onlineRequestsClientSubmission.store]        : onlineRequestsClientSubmission.reducer,
  [onlineRequestsClientSubmissionDetail.store]  : onlineRequestsClientSubmissionDetail.reducer,
  [onlineRequestsConfirmReservation.store]      : onlineRequestsConfirmReservation.reducer,
  [onlineRequestsConfirmReservationDetail.store]: onlineRequestsConfirmReservationDetail.reducer,
  [onlineRequestsClientDocument.store]          : onlineRequestsClientDocument.reducer,
  [onlineRequestsClientDocumentDetail.store]    : onlineRequestsClientDocumentDetail.reducer,
  [onlineRequestsDeclinedClients.store]         : onlineRequestsDeclinedClients.reducer,
  [onlineRequestsDeclinedClientsDetail.store]   : onlineRequestsDeclinedClientsDetail.reducer,
  [onlineRequestsVaccinationUpdate.store]       : onlineRequestsVaccinationUpdate.reducer,
  [onlineRequestsVaccinationUpdateDetail.store] : onlineRequestsVaccinationUpdateDetail.reducer,
  [onlineRequestsCancellationLogs.store]        : onlineRequestsCancellationLogs.reducer,
  [onlineRequestsCancellationLogsDetail.store]  : onlineRequestsCancellationLogsDetail.reducer,
  [trainingCommand.store]                       : trainingCommand.reducer,
  [trainingCommandDetail.store]                 : trainingCommandDetail.reducer,
  [trainingMethod.store]                        : trainingMethod.reducer,
  [trainingMethodDetail.store]                  : trainingMethodDetail.reducer,
  [trainingReason.store]                        : trainingReason.reducer,
  [trainingReasonDetail.store]                  : trainingReasonDetail.reducer,
  [transactionDetail.store]                     : transactionDetail.reducer,
  [transactionDetail.store]                     : transactionDetail.reducer,
  [user.store]                                  : user.reducer,
  [userDetail.store]                            : userDetail.reducer,
  [zip.store]                                   : zip.reducer,
  [zipDetail.store]                             : zipDetail.reducer
})

export default createRootReducer

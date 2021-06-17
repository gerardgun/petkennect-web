import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import agreement from '@reducers/agreement'
import agreementDetail from '@reducers/agreement/detail'
import application from '@reducers/application'
import auth from '@reducers/auth'
import bookingSheetSetting from '@reducers/booking-sheet-setting'
import breedManagerSetting from '@reducers/pet/breed-manager-setting'
import breedManagerSettingDetail from '@reducers/pet/breed-manager-setting/detail'

import clientPetBreed from '@reducers/pet/breed-manager-setting/client-pet-breed'
import clientPetBreedDetail from '@reducers/pet/breed-manager-setting/client-pet-breed/detail'
import couponUsage from '@reducers/coupan-setup/coupan/coupon-usage'
import couponUsageDetail from '@reducers/coupan-setup/coupan/coupon-usage/detail'
import coupanInvoice from '@reducers/coupan-setup/coupan'
import coupanInvoiceDetail from '@reducers/coupan-setup/coupan/detail'

import reservationByDateBreed  from '@reducers/pet/breed-manager-setting/reservation-by-date-breed'
import reservationByDateBreedDetail from '@reducers/pet/breed-manager-setting/reservation-by-date-breed/detail'

import DaycareReservationBreed from '@reducers/pet/breed-manager-setting/day-care-reservation-breed'
import DaycareReservationBreedDetail from '@reducers/pet/breed-manager-setting/day-care-reservation-breed/detail'
import DayServiceReportCardSetup from '@reducers/report-card-setup/day-service-report-card'
import DayServiceReportCardSetupDetail from '@reducers/report-card-setup/day-service-report-card/detail'
import calendarDetail from '@reducers/calendar/detail'
import category from '@reducers/category'
import categoryDetail from '@reducers/category/detail'
import client from '@reducers/client'
import clientDetail from '@reducers/client/detail'
import clientComment from '@reducers/client/comment'
import clientAgreement from '@reducers/client/agreement'
import clientAgreementSignedDuck from '@reducers/client/agreement/signed'
import clientAgreementUnsignedDuck from '@reducers/client/agreement/unsigned'
import clientAgreementDetail from '@reducers/client/agreement/detail'
import clientCommentDetail from '@reducers/client/comment/detail'
import clientDocument from '@reducers/client/document'
import clientDocumentDetail from '@reducers/client/document/detail'
import clientDocumentType from '@reducers/client/document/type'
import clientDocumentTypeDetail from '@reducers/client/document/type/detail'
import clientPet from '@reducers/client/pet'
import clientEmailMessage from '@reducers/client/email-message'
import clientEmailMessageDetail from '@reducers/client/email-message/detail'
import company from '@reducers/company'
import companyDetail from '@reducers/company/detail'
import companyProfileCalendar from '@reducers/company-profile/calendar'
import companyProfileCalendarDetail from '@reducers/company-profile/calendar/detail'
import companyContactBillingDetail from '@reducers/company/contact-billing/detail'
import customReport from '@reducers/custom-report'
import customReportDetail from '@reducers/custom-report/detail'
import customized from '@reducers/customized-field'
import customizedField from '@reducers/customized-field/field'
import customizedFieldDetail from '@reducers/customized-field/field/detail'
import customizedFieldGroup from '@reducers/customized-field/group'
import customizedFieldGroupDetail from '@reducers/customized-field/group/detail'

import boardingReservationBookDetail from '@reducers/client/reservation/boarding-reservation-book/detail'

import dashboard from '@reducers/dashboard'
import dashboardDetail from '@reducers/dashboard/detail'
import dashboardModal from '@reducers/dashboard/dashboard-modal'
import dashboardModalDetail from '@reducers/dashboard/dashboard-modal/detail'
import dashboardExpressCheckIn from '@reducers/dashboard/express-check-in'
import dashboardExpressCheckInDetail from '@reducers/dashboard/express-check-in/detail'
import dashboardNotification from '@reducers/dashboard/notification'
import dashboardNotificationDetail from '@reducers/dashboard/notification/detail'
import dashboardTasklist from '@reducers/dashboard/tasklist'
import dashboardTasklistDetail from '@reducers/dashboard/tasklist/detail'
import dashboardCalendar from '@reducers/dashboard/calendar'
import dashboardCalendarDetail from '@reducers/dashboard/calendar/detail'
import dashboardCalendarFacility from '@reducers/dashboard/calendar/facility'
import dashboardCalendarFacilityDetail from '@reducers/dashboard/calendar/facility/detail'
import dashboardCalendarStaffing from '@reducers/dashboard/calendar/staffing'
import dashboardCalendarStaffingDetail from '@reducers/dashboard/calendar/staffing/detail'
import dashboardVaccination from '@reducers/dashboard/vaccination'
import dashboardVaccinationDetail from '@reducers/dashboard/vaccination/detail'
import dashboardCard from '@reducers/dashboard-card'
import dashboardCardDetail from '@reducers/dashboard-card/detail'
import dashboardCardModal from '@reducers/dashboard-card/dashboard-card-modal'
import dashboardCardModalDetail from '@reducers/dashboard-card/dashboard-card-modal/detail'

import daycampCard from '@reducers/pet/reservation/daycamp-card'
import daycampCardDetail from '@reducers/pet/reservation/daycamp-card/detail'
import daycampCardQuestion from '@reducers/pet/reservation/daycamp-card/daycamp-card-question'
import daycampCardQuestionDetail from '@reducers/pet/reservation/daycamp-card/daycamp-card-question/detail'
import daycampCardAnswerDetail from '@reducers/pet/reservation/daycamp-card/daycamp-card-answer/detail'
import daycampReservation from '@reducers/pet/reservation/daycamp-reservation'
import exampleOne from '@reducers/example/one'
import exampleTwo from '@reducers/example/two'
import boardingReservation from '@reducers/pet/reservation/boarding'
import boardingReservationDetail from '@reducers/pet/reservation/boarding/detail'
import boardingReservationAddon from '@reducers/pet/reservation/boarding/add-on'
import boardingReservationAddonFeeding from '@reducers/pet/reservation/boarding/add-on/feeding-addon'
import boardingPackage from '@reducers/pet/reservation/boarding/package'
import boardingPackageDetail from '@reducers/pet/reservation/boarding/package/detail'
import boardingPrepaidUsage from '@reducers/pet/reservation/usage/boarding/prepaid'
import boardingReservationUsage from '@reducers/pet/reservation/usage/boarding/reservation'
import groomingReservation from '@reducers/pet/reservation/grooming'
import groomingReservationDetail from '@reducers/pet/reservation/grooming/detail'
import groomingReservationAddon from '@reducers/pet/reservation/grooming/add-on'
import groomingPackage from '@reducers/pet/reservation/grooming/package'
import groomingPackageDetail from '@reducers/pet/reservation/grooming/package/detail'
import groomingPrepaidUsage from '@reducers/pet/reservation/usage/grooming/prepaid'
import groomingReservationUsage from '@reducers/pet/reservation/usage/grooming/reservation'
import daycampReservationDetail from '@reducers/pet/reservation/daycamp-reservation/detail'
import emailMessage from '@reducers/email-message'
import emailMessageDetail from '@reducers/email-message/detail'
import emailLog from '@reducers/email-log'
import emailLogDetail from '@reducers/email-log/detail'
import emailTemplate from '@reducers/email-template'
import emailTemplateDetail from '@reducers/email-template/detail'
import employee from '@reducers/employee'
import employeeDetail from '@reducers/employee/detail'
import employeeSchedule from '@reducers/employee/schedule'
import employeeScheduleDetail from '@reducers/employee/schedule/detail'
import employeeRole from '@reducers/employee/role'
import employeeRoleDetail from '@reducers/employee/role/detail'
import employeeTimeOff from '@reducers/staff-management/employee-time-off'
import employeeTimeOffRequestHistory from '@reducers/staff-management/employee-time-off/requests/history'
import employeeTimeOffRequestUpcoming from '@reducers/staff-management/employee-time-off/requests/upcoming'
import employeeTimeOffRequestOtherDetail from '@reducers/staff-management/employee-time-off/requests/other/detail'
import employeeTimeOffRequestUpcomingDetail from '@reducers/staff-management/employee-time-off/requests/upcoming/detail'
import employeeTimeOffRequestOther from '@reducers/staff-management/employee-time-off/requests/other'
import employeeTitle from '@reducers/employee/title'
import employeeTitleDetail from '@reducers/employee/title/detail'
import feedingTime from '@reducers/pet/feeding-setting/feeding-time'   // feeding setting start
import feedingTimeDetail from '@reducers/pet/feeding-setting/feeding-time/detail'
import feedingMeasurement from '@reducers/pet/feeding-setting/feeding-measurement'
import feedingMeasurementDetail from '@reducers/pet/feeding-setting/feeding-measurement/detail'
import feedingMethod from '@reducers/pet/feeding-setting/feeding-method'
import feedingMethodDetail from '@reducers/pet/feeding-setting/feeding-method/detail'
import feedingUnit from '@reducers/pet/feeding-setting/feeding-unit'
import feedingUnitDetail from '@reducers/pet/feeding-setting/feeding-unit/detail'
import foodType from '@reducers/pet/feeding-setting/food-type'
import foodTypeDetail from '@reducers/pet/feeding-setting/food-type/detail'
import mealStatus from '@reducers/pet/feeding-setting/meal-status'
import mealStatusDetail from '@reducers/pet/feeding-setting/meal-status/detail'    // feeding setting end
import location from '@reducers/location'
import locationDetail from '@reducers/location/detail'
import managerDashboardDepartmentRole from '@reducers/manager-dashboard/department-role'
import managerDashboardDepartmentRoleDetail from '@reducers/manager-dashboard/department-role/detail'
import managerDashboardEmployeeDirectory from '@reducers/manager-dashboard/employee/employee-directory'
import managerDashboardEmployeeDirectoryDetail from '@reducers/manager-dashboard/employee/employee-directory/detail'
import managerDashboardEmployeeDocument from '@reducers/manager-dashboard/employee/employee-document'
import managerDashboardEmployeeDocumentDetail from '@reducers/manager-dashboard/employee/employee-document/detail'
import managerDashboardEmployeeNote from '@reducers/manager-dashboard/employee/employee-note'
import managerDashboardEmployeeNoteDetail from '@reducers/manager-dashboard/employee/employee-note/detail'
import managerDashboardEmployeeWageHistory from '@reducers/manager-dashboard/employee/employee-wage-history'
import managerDashboardEmployeeWageHistoryDetail from '@reducers/manager-dashboard/employee/employee-wage-history/detail'
import MedicationType from '@reducers/pet/medication-setting/medication-type'
import MedicationTypeDetail from '@reducers/pet/medication-setting/medication-type/detail'
import medication from '@reducers/pet/medication-setting/medication'
import medicationDetail from '@reducers/pet/medication-setting/medication/detail'
import medicationTime from '@reducers/pet/medication-setting/medication-time'
import medicationTimeDetail from '@reducers/pet/medication-setting/medication-time/detail'
import medicationUnit from '@reducers/pet/medication-setting/medication-unit'
import medicationUnitDetail from '@reducers/pet/medication-setting/medication-unit/detail'
import medicationMeasurement from '@reducers/pet/medication-setting/medication-measurement'
import medicationMeasurementDetail from '@reducers/pet/medication-setting/medication-measurement/detail'
import medicationReportStatus from '@reducers/pet/medication-setting/medication-report-status'
import medicationReportStatusDetail from '@reducers/pet/medication-setting/medication-report-status/detail'
import notification from '@reducers/notification'
import notificationDetail from '@reducers/notification/detail'
import organization from '@reducers/organization'
import organizationDetail from '@reducers/organization/detail'
import organizationCompany from '@reducers/organization/company'
import packagePricing from '@reducers/package-pricing'
import packagePricingDetail from '@reducers/package-pricing/detail'
import paymentMethod from '@reducers/payment-method'
import paymentMethodDetail from '@reducers/payment-method/detail'
import pet from '@reducers/pet'
import petDetail from '@reducers/pet/detail'
import petBreed from '@reducers/pet/breed'
import petBreedDetail from '@reducers/pet/breed/detail'
import petReservationExpressCheckInDetail from '@reducers/pet/reservation/express-check-in/detail'
import petKind from '@reducers/pet/kind'
import petKindDetail from '@reducers/pet/kind/detail'
import petKindSize from '@reducers/pet/kind/size'
import petKindSizeDetail from '@reducers/pet/kind/size/detail'
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
import petInteractionType from '@reducers/pet/interaction-type'
import petInteractionTypeDetail from '@reducers/pet/interaction-type/detail'
import petRetireReason from '@reducers/pet/retire-reason'
import petRetireReasonDetail from '@reducers/pet/retire-reason/detail'
import petVaccination from '@reducers/pet/vaccination'
import petVaccinationDetail from '@reducers/pet/vaccination/detail'
import petVaccinationType from '@reducers/pet/vaccination-type'
import petVaccinationTypeDetail from '@reducers/pet/vaccination-type/detail'
import petVeterinarian from '@reducers/pet/veterinarian-list'
import petVeterinarianDetail from '@reducers/pet/veterinarian-list/detail'
import petNote from '@reducers/pet/note'
import petNoteDetail from '@reducers/pet/note/detail'
import petReservation from '@reducers/pet/reservation'
import petReservationDetail from '@reducers/pet/reservation/detail'
import petReservationDaycampQuestion from '@reducers/pet/reservation/dacamp-question'
import petReservationDaycampQuestionDetail from '@reducers/pet/reservation/dacamp-question/detail'
import petReservationDayServicePackage from '@reducers/pet/reservation/day-service-package'
import petReservationDayServicePackageDetail from '@reducers/pet/reservation/day-service-package/detail'
import petReservationTrainingPackage from '@reducers/pet/reservation/training/package'
import petReservationTrainingPackageDetail from '@reducers/pet/reservation/training/package/detail'
import petReservationTrainingReservation from '@reducers/pet/reservation/training/reservation'
import petReservationTrainingReservationDetail from '@reducers/pet/reservation/training/reservation/detail'
import petReservationTrainingReservationGroupClass from '@reducers/pet/reservation/training/reservation/group-class'
import petReservationTrainingReservationGroupClassDetail from '@reducers/pet/reservation/training/reservation/group-class/detail'
import petKennel from '@reducers/pet/pet-kennel'
import petKennelDetail from '@reducers/pet/pet-kennel/detail'
import petKennelType from '@reducers/pet/pet-kennel-type'
import petKennelTypeDetail from '@reducers/pet/pet-kennel-type/detail'
import petKennelArea from '@reducers/pet/pet-kennel-area'
import petKennelAreaDetail from '@reducers/pet/pet-kennel-area/detail'
import petYardType from '@reducers/pet/pet-yard-type'
import petYardTypeDetail from '@reducers/pet/pet-yard-type/detail'
import daycampPrepaidUsage from '@reducers/pet/reservation/usage/daycamp/prepaid'
import daycampReservationUsage from '@reducers/pet/reservation/usage/daycamp/reservation'
import product from '@reducers/product'
import productDetail from '@reducers/product/detail'
import productAttribute from '@reducers/product/product-attribute'
import productAttributeDetail from '@reducers/product/product-attribute/detail'
import productAttributeValue from '@reducers/product/product-attribute-value'
import productAttributeValueDetail from '@reducers/product/product-attribute-value/detail'
import priceMaster from '@reducers/price-master'
import priceMasterDetail from '@reducers/price-master/detail'
import productImage from '@reducers/product/image'
import productImageDetail from '@reducers/product/image/detail'
import productFamily from '@reducers/product/family'
import productFamilyDetail from '@reducers/product/family/detail'
import productOption from '@reducers/product/option'
import productOptionDetail from '@reducers/product/option/detail'
import productVariations from '@reducers/product/product-variations'
import productVariationsDetail from '@reducers/product/product-variations/detail'
import productVariationsImageDetail from '@reducers/product/product-variations/image/detail'
import productPackage from '@reducers/product/package'
import productPackageDetail from '@reducers/product/package/detail'
import ratingKey from '@reducers/rating-key'
import ratingKeyDetail from '@reducers/rating-key/detail'
import reservation from '@reducers/reservation'
import reportCardSetting from '@reducers/pet/report-card-setting'
import reportCardSettingDetail from '@reducers/pet/report-card-setting/detail'
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
import serviceGroup from '@reducers/service/group'
import serviceGroupDetail from '@reducers/service/group/detail'
import serviceGroupPetKind from '@reducers/service/group/pet/kind'
import servicePetKind from '@reducers/service/pet/kind'
import serviceVariation from '@reducers/service/variation'
import serviceVariationDetail from '@reducers/service/variation/detail'
import servicePackage from '@reducers/service/package'
import servicePackageDetail from '@reducers/service/package/detail'
import serviceVariationRelease from '@reducers/service/variation/release'
import serviceVariationReleaseDetail from '@reducers/service/variation/release/detail'
import setupCapacityServiceCustom from '@reducers/setup/capacity/service/custom'
import setupCapacityServiceCustomDetail from '@reducers/setup/capacity/service/custom/detail'
import servicePrice from '@reducers/service-price'
import servicePriceDetail from '@reducers/service-price/detail'
import staffManagementInfoAvailability from '@reducers/staff-management/information/availability'
import staffManagementInfoAvailabilityDetail from '@reducers/staff-management/information/availability/detail'
import staffManagementInfoPersonal from '@reducers/staff-management/information/personal-detail'
import staffManagementInfoPersonalDetail from '@reducers/staff-management/information/personal-detail/detail'
import staffManagementInfoWages from '@reducers/staff-management/information/wages'
import staffManagementInfoWagesDetail from '@reducers/staff-management/information/wages/detail'
import staffManagementNotification from '@reducers/staff-management/notification/employee-notice'
import staffManagementNotificationDetail from '@reducers/staff-management/notification/employee-notice/detail'
import staffManagementNotificationSettingEmployee from '@reducers/staff-management/notification/notification-setting/employee-notification'
import staffManagementNotificationSettingEmployeeDetail from '@reducers/staff-management/notification/notification-setting/employee-notification/detail'
import staffManagementNotificationSettingManager from '@reducers/staff-management/notification/notification-setting/manager-notification'
import staffManagementNotificationSettingManagerDetail from '@reducers/staff-management/notification/notification-setting/manager-notification/detail'
import staffManagementPerformanceNotice from '@reducers/staff-management/performance/notice'
import staffManagementPerformanceReview from '@reducers/staff-management/performance/review'
import tenantDetail from '@reducers/tenant/detail'
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
import onlineRequestNote from '@reducers/online-request/note'
import onlineRequestNoteDetail from '@reducers/online-request/note/detail'
import orderServiceBoardingKennel from '@reducers/order/service/boarding/kennel'
import orderServiceBoardingKennelDetail from '@reducers/order/service/boarding/kennel/detail'
import orderServiceBoardingKennelArea from '@reducers/order/service/boarding/kennel/area'
import orderServiceBoardingKennelAreaDetail from '@reducers/order/service/boarding/kennel/area/detail'
import orderServiceBoardingKennelType from '@reducers/order/service/boarding/kennel/type'
import orderServiceBoardingKennelTypeDetail from '@reducers/order/service/boarding/kennel/type/detail'
import trainingCommand from '@reducers/training-command'
import trainingCommandDetail from '@reducers/training-command/detail'
import trainingMethod from '@reducers/training-method'
import trainingMethodDetail from '@reducers/training-method/detail'
import trainingPackage from '@reducers/training-package'
import trainingReason from '@reducers/training-reason'
import trainingReasonDetail from '@reducers/training-reason/detail'
import transaction from '@reducers/transaction'
import transactionDetail from '@reducers/transaction/detail'
import user from '@reducers/user'
import userDetail from '@reducers/user/detail'
import zip from '@reducers/zip'
import zipDetail from '@reducers/zip/detail'
const createRootReducer = history => combineReducers({
  form                                                     : formReducer,
  router                                                   : connectRouter(history),
  [agreement.store]                                        : agreement.reducer,
  [agreementDetail.store]                                  : agreementDetail.reducer,
  [auth.store]                                             : auth.reducer,
  [application.store]                                      : application.reducer,
  [bookingSheetSetting.store]                              : bookingSheetSetting.reducer,
  [breedManagerSetting.store]                              : breedManagerSetting.reducer,
  [breedManagerSettingDetail.store]                        : breedManagerSettingDetail.reducer,
  [reservationByDateBreed.store]                           : reservationByDateBreed.reducer,
  [reservationByDateBreedDetail.store]                     : reservationByDateBreedDetail.reducer,
  [DaycareReservationBreed.store]                          : DaycareReservationBreed .reducer,
  [DaycareReservationBreedDetail.store]                    : DaycareReservationBreedDetail.reducer,
  [DayServiceReportCardSetupDetail.store]                  : DayServiceReportCardSetupDetail.reducer,
  [DayServiceReportCardSetup.store]                        : DayServiceReportCardSetup.reducer,
  [clientPetBreed.store]                                   : clientPetBreed.reducer,
  [clientPetBreedDetail.store]                             : clientPetBreedDetail.reducer,
  [calendarDetail.store]                                   : calendarDetail.reducer,
  [category.store]                                         : category.reducer,
  [categoryDetail.store]                                   : categoryDetail.reducer,
  [client.store]                                           : client.reducer,
  [clientDetail.store]                                     : clientDetail.reducer,
  [clientDocument.store]                                   : clientDocument.reducer,
  [clientDocumentDetail.store]                             : clientDocumentDetail.reducer,
  [clientDocumentType.store]                               : clientDocumentType.reducer,
  [clientDocumentTypeDetail.store]                         : clientDocumentTypeDetail.reducer,
  [clientAgreement.store]                                  : clientAgreement.reducer,
  [clientAgreementSignedDuck.store]                        : clientAgreementSignedDuck.reducer,
  [clientAgreementUnsignedDuck.store]                      : clientAgreementUnsignedDuck.reducer,
  [clientAgreementDetail.store]                            : clientAgreementDetail.reducer,
  [clientComment.store]                                    : clientComment.reducer,
  [clientCommentDetail.store]                              : clientCommentDetail.reducer,
  [clientPet.store]                                        : clientPet.reducer,
  [clientEmailMessage.store]                               : clientEmailMessage.reducer,
  [clientEmailMessageDetail.store]                         : clientEmailMessageDetail.reducer,
  [company.store]                                          : company.reducer,
  [companyDetail.store]                                    : companyDetail.reducer,
  [companyProfileCalendar.store]                           : companyProfileCalendar.reducer,
  [companyProfileCalendarDetail.store]                     : companyProfileCalendarDetail.reducer,
  [companyContactBillingDetail.store]                      : companyContactBillingDetail.reducer,
  [customReport.store]                                     : customReport.reducer,
  [customReportDetail.store]                               : customReportDetail.reducer                ,
  [customized.store]                                       : customized.reducer,
  [customizedField.store]                                  : customizedField.reducer,
  [customizedFieldDetail.store]                            : customizedFieldDetail.reducer,
  [customizedFieldGroup.store]                             : customizedFieldGroup.reducer,
  [customizedFieldGroupDetail.store]                       : customizedFieldGroupDetail.reducer,
  [coupanInvoice.store]                                    : coupanInvoice.reducer,
  [coupanInvoiceDetail.store]                              : coupanInvoiceDetail.reducer,
  [couponUsage.store]                                      : couponUsage.reducer,
  [couponUsageDetail.store]                                : couponUsageDetail.reducer,
  [daycampCard.store]                                      : daycampCard.reducer,
  [daycampCardDetail.store]                                : daycampCardDetail.reducer,
  [daycampPrepaidUsage.store]                              : daycampPrepaidUsage.reducer,
  [daycampReservationUsage.store]                          : daycampReservationUsage.reducer,
  [boardingReservation.store]                              : boardingReservation.reducer,
  [boardingReservationDetail.store]                        : boardingReservationDetail.reducer,
  [boardingPackage.store]                                  : boardingPackage.reducer,
  [boardingPackageDetail.store]                            : boardingPackageDetail.reducer,
  [boardingReservationAddon.store]                         : boardingReservationAddon.reducer,
  [boardingReservationAddonFeeding.store]                  : boardingReservationAddonFeeding.reducer,
  [boardingPrepaidUsage.store]                             : boardingPrepaidUsage.reducer,
  [boardingReservationUsage.store]                         : boardingReservationUsage.reducer,
  [dashboard.store]                                        : dashboard.reducer,
  [boardingReservationBookDetail.store]                    : boardingReservationBookDetail.reducer,
  [dashboardDetail.store]                                  : dashboardDetail.reducer,
  [dashboardModal.store]                                   : dashboardModal.reducer,
  [dashboardModalDetail.store]                             : dashboardModalDetail.reducer,
  [dashboardExpressCheckIn.store]                          : dashboardExpressCheckIn.reducer,
  [dashboardExpressCheckInDetail.store]                    : dashboardExpressCheckInDetail.reducer,
  [dashboardNotification.store]                            : dashboardNotification.reducer,
  [dashboardNotificationDetail.store]                      : dashboardNotificationDetail.reducer,
  [dashboardTasklist.store]                                : dashboardTasklist.reducer,
  [dashboardTasklistDetail.store]                          : dashboardTasklistDetail.reducer,
  [dashboardCalendar.store]                                : dashboardCalendar.reducer,
  [dashboardCalendarDetail.store]                          : dashboardCalendarDetail.reducer,
  [dashboardCalendarFacility.store]                        : dashboardCalendarFacility.reducer,
  [dashboardCalendarFacilityDetail.store]                  : dashboardCalendarFacilityDetail.reducer,
  [dashboardCalendarStaffing.store]                        : dashboardCalendarStaffing.reducer,
  [dashboardCalendarStaffingDetail.store]                  : dashboardCalendarStaffingDetail.reducer,
  [dashboardVaccination.store]                             : dashboardVaccination.reducer,
  [dashboardVaccinationDetail.store]                       : dashboardVaccinationDetail.reducer,
  [dashboardCard.store]                                    : dashboardCard.reducer,
  [dashboardCardDetail.store]                              : dashboardCardDetail.reducer,
  [dashboardCardModal.store]                               : dashboardCardModal.reducer,
  [dashboardCardModalDetail.store]                         : dashboardCardModalDetail.reducer,
  [groomingReservation.store]                              : groomingReservation.reducer,
  [groomingReservationDetail.store]                        : groomingReservationDetail.reducer,
  [groomingPackage.store]                                  : groomingPackage.reducer,
  [groomingPackageDetail.store]                            : groomingPackageDetail.reducer,
  [groomingReservationAddon.store]                         : groomingReservationAddon.reducer,
  [daycampReservation.store]                               : daycampReservation.reducer,
  [groomingPrepaidUsage.store]                             : groomingPrepaidUsage.reducer,
  [groomingReservationUsage.store]                         : groomingReservationUsage.reducer,
  [exampleOne.store]                                       : exampleOne.reducer,
  [exampleTwo.store]                                       : exampleTwo.reducer,
  [daycampReservationDetail.store]                         : daycampReservationDetail.reducer,
  [daycampCardQuestion.store]                              : daycampCardQuestion.reducer,
  [daycampCardQuestionDetail.store]                        : daycampCardQuestionDetail.reducer,
  [daycampCardAnswerDetail.store]                          : daycampCardAnswerDetail.reducer,
  [emailMessage.store]                                     : emailMessage.reducer,
  [emailMessageDetail.store]                               : emailMessageDetail.reducer,
  [emailTemplate.store]                                    : emailTemplate.reducer,
  [emailTemplateDetail.store]                              : emailTemplateDetail.reducer,
  [emailLog.store]                                         : emailLog.reducer,
  [emailLogDetail.store]                                   : emailLogDetail.reducer,
  [employee.store]                                         : employee.reducer,
  [employeeDetail.store]                                   : employeeDetail.reducer,
  [employeeSchedule.store]                                 : employeeSchedule.reducer,
  [employeeScheduleDetail.store]                           : employeeScheduleDetail.reducer,
  [employeeRole.store]                                     : employeeRole.reducer,
  [employeeRoleDetail.store]                               : employeeRoleDetail.reducer,
  [employeeTimeOff.store]                                  : employeeTimeOff.reducer,
  [employeeTimeOffRequestUpcoming.store]                   : employeeTimeOffRequestUpcoming.reducer,
  [employeeTimeOffRequestHistory.store]                    : employeeTimeOffRequestHistory.reducer,
  [employeeTimeOffRequestOther.store]                      : employeeTimeOffRequestOther.reducer,
  [employeeTimeOffRequestOtherDetail.store]                : employeeTimeOffRequestOtherDetail.reducer,
  [employeeTimeOffRequestUpcomingDetail.store]             : employeeTimeOffRequestUpcomingDetail.reducer,
  [employeeDetail.store]                                   : employeeDetail.reducer,
  [employeeTitle.store]                                    : employeeTitle.reducer,
  [employeeTitleDetail.store]                              : employeeTitleDetail.reducer,
  [feedingTime.store]                                      : feedingTime.reducer,
  [feedingTimeDetail.store]                                : feedingTimeDetail.reducer,
  [feedingMeasurement.store]                               : feedingMeasurement.reducer,
  [feedingMeasurementDetail.store]                         : feedingMeasurementDetail.reducer,
  [feedingMethod.store]                                    : feedingMethod.reducer,
  [feedingMethodDetail.store]                              : feedingMethodDetail.reducer,
  [feedingUnit.store]                                      : feedingUnit.reducer,
  [feedingUnitDetail.store]                                : feedingUnitDetail.reducer,
  [foodType.store]                                         : foodType.reducer,
  [foodTypeDetail.store]                                   : foodTypeDetail.reducer,
  [mealStatus.store]                                       : mealStatus.reducer,
  [mealStatusDetail.store]                                 : mealStatusDetail.reducer,
  [location.store]                                         : location.reducer,
  [locationDetail.store]                                   : locationDetail.reducer,
  [managerDashboardDepartmentRole.store]                   : managerDashboardDepartmentRole.reducer,
  [managerDashboardDepartmentRoleDetail.store]             : managerDashboardDepartmentRoleDetail.reducer,
  [managerDashboardEmployeeDirectory.store]                : managerDashboardEmployeeDirectory.reducer,
  [managerDashboardEmployeeDirectoryDetail.store]          : managerDashboardEmployeeDirectoryDetail.reducer,
  [managerDashboardEmployeeDocument.store]                 : managerDashboardEmployeeDocument.reducer,
  [managerDashboardEmployeeDocumentDetail.store]           : managerDashboardEmployeeDocumentDetail.reducer,
  [managerDashboardEmployeeNote.store]                     : managerDashboardEmployeeNote.reducer,
  [managerDashboardEmployeeNoteDetail.store]               : managerDashboardEmployeeNoteDetail.reducer,
  [managerDashboardEmployeeWageHistory.store]              : managerDashboardEmployeeWageHistory.reducer,
  [managerDashboardEmployeeWageHistoryDetail.store]        : managerDashboardEmployeeWageHistoryDetail.reducer,
  [MedicationType.store]                                   : MedicationType.reducer,
  [MedicationTypeDetail.store]                             : MedicationTypeDetail.reducer,
  [medication.store]                                       : medication.reducer,
  [medicationDetail.store]                                 : medicationDetail.reducer,
  [medicationMeasurement.store]                            : medicationMeasurement.reducer,
  [medicationMeasurementDetail.store]                      : medicationMeasurementDetail.reducer,
  [medicationReportStatus.store]                           : medicationReportStatus.reducer,
  [medicationReportStatusDetail.store]                     : medicationReportStatusDetail.reducer,
  [medicationTime.store]                                   : medicationTime.reducer,
  [medicationTimeDetail.store]                             : medicationTimeDetail.reducer,
  [medicationUnit.store]                                   : medicationUnit.reducer,
  [medicationUnitDetail.store]                             : medicationUnitDetail.reducer,
  [notification.store]                                     : notification.reducer,
  [notificationDetail.store]                               : notificationDetail.reducer,
  [organization.store]                                     : organization.reducer,
  [organizationDetail.store]                               : organizationDetail.reducer,
  [organizationCompany.store]                              : organizationCompany.reducer,
  [packagePricing.store]                                   : packagePricing.reducer,
  [packagePricingDetail.store]                             : packagePricingDetail.reducer,
  [paymentMethod.store]                                    : paymentMethod.reducer,
  [paymentMethodDetail.store]                              : paymentMethodDetail.reducer,
  [pet.store]                                              : pet.reducer,
  [petDetail.store]                                        : petDetail.reducer,
  [petReservationExpressCheckInDetail.store]               : petReservationExpressCheckInDetail.reducer,
  [petBreed.store]                                         : petBreed.reducer,
  [petBreedDetail.store]                                   : petBreedDetail.reducer,
  [petKind.store]                                          : petKind.reducer,
  [petKindDetail.store]                                    : petKindDetail.reducer,
  [petKindSize.store]                                      : petKindSize.reducer,
  [petKindSizeDetail.store]                                : petKindSizeDetail.reducer,
  [petImage.store]                                         : petImage.reducer,
  [petImageDetail.store]                                   : petImageDetail.reducer,
  [petIncidentType.store]                                  : petIncidentType.reducer,
  [petIncidentTypeDetail.store]                            : petIncidentTypeDetail.reducer,
  [petIncidentAction.store]                                : petIncidentAction.reducer,
  [petIncidentActionDetail.store]                          : petIncidentActionDetail.reducer,
  [petIncidentBehavior.store]                              : petIncidentBehavior.reducer,
  [petIncidentBehaviorDetail.store]                        : petIncidentBehaviorDetail.reducer,
  [petIncident.store]                                      : petIncident.reducer,
  [petIncidentDetail.store]                                : petIncidentDetail.reducer,
  [petInteractionType.store]                               : petInteractionType.reducer,
  [petInteractionTypeDetail.store]                         : petInteractionTypeDetail.reducer,
  [petRetireReason.store]                                  : petRetireReason.reducer,
  [petRetireReasonDetail.store]                            : petRetireReasonDetail.reducer,
  [petVaccination.store]                                   : petVaccination.reducer,
  [petVaccinationDetail.store]                             : petVaccinationDetail.reducer,
  [petVaccinationType.store]                               : petVaccinationType.reducer,
  [petVaccinationTypeDetail.store]                         : petVaccinationTypeDetail.reducer,
  [petVeterinarian.store]                                  : petVeterinarian.reducer,
  [petVeterinarianDetail.store]                            : petVeterinarianDetail.reducer,
  [petNote.store]                                          : petNote.reducer,
  [petNoteDetail.store]                                    : petNoteDetail.reducer,
  [petReservation.store]                                   : petReservation.reducer,
  [petReservationDetail.store]                             : petReservationDetail.reducer,
  [petReservationDaycampQuestion.store]                    : petReservationDaycampQuestion.reducer,
  [petReservationDaycampQuestionDetail.store]              : petReservationDaycampQuestionDetail.reducer,
  [petReservationDayServicePackage.store]                  : petReservationDayServicePackage.reducer,
  [petReservationDayServicePackageDetail.store]            : petReservationDayServicePackageDetail.reducer,
  [petReservationTrainingPackage.store]                    : petReservationTrainingPackage.reducer,
  [petReservationTrainingPackageDetail.store]              : petReservationTrainingPackageDetail.reducer,
  [petReservationTrainingReservation.store]                : petReservationTrainingReservation.reducer,
  [petReservationTrainingReservationDetail.store]          : petReservationTrainingReservationDetail.reducer,
  [petReservationTrainingReservationGroupClass.store]      : petReservationTrainingReservationGroupClass.reducer,
  [petReservationTrainingReservationGroupClassDetail.store]: petReservationTrainingReservationGroupClassDetail.reducer,
  [petVaccination.store]                                   : petVaccination.reducer,
  [petVaccinationDetail.store]                             : petVaccinationDetail.reducer,
  [petKennel.store]                                        : petKennel.reducer,
  [petKennelDetail.store]                                  : petKennelDetail.reducer,
  [petKennelType.store]                                    : petKennelType.reducer,
  [petKennelTypeDetail.store]                              : petKennelTypeDetail.reducer,
  [petKennelArea.store]                                    : petKennelArea.reducer,
  [petKennelAreaDetail.store]                              : petKennelAreaDetail.reducer,
  [petYardType.store]                                      : petYardType.reducer,
  [petYardTypeDetail.store]                                : petYardTypeDetail.reducer,
  [priceMaster.store]                                      : priceMaster.reducer,
  [priceMasterDetail.store]                                : priceMasterDetail.reducer,
  [product.store]                                          : product.reducer,
  [productDetail.store]                                    : productDetail.reducer,
  [productAttribute.store]                                 : productAttribute.reducer,
  [productAttributeDetail.store]                           : productAttributeDetail.reducer,
  [productAttributeValue.store]                            : productAttributeValue.reducer,
  [productAttributeValueDetail.store]                      : productAttributeValueDetail.reducer,
  [productImage.store]                                     : productImage.reducer,
  [productImageDetail.store]                               : productImageDetail.reducer,
  [productFamily.store]                                    : productFamily.reducer,
  [productFamilyDetail.store]                              : productFamilyDetail.reducer,
  [productPackage.store]                                   : productPackage.reducer,
  [productPackageDetail.store]                             : productPackageDetail.reducer,
  [productOption.store]                                    : productOption.reducer,
  [productOptionDetail.store]                              : productOptionDetail.reducer,
  [productVariations.store]                                : productVariations.reducer,
  [productVariationsDetail.store]                          : productVariationsDetail.reducer,
  [productVariationsImageDetail.store]                     : productVariationsImageDetail.reducer,
  [ratingKey.store]                                        : ratingKey.reducer,
  [ratingKeyDetail.store]                                  : ratingKeyDetail.reducer,
  [reportCardSetting.store]                                : reportCardSetting.reducer,
  [reportCardSettingDetail.store]                          : reportCardSettingDetail.reducer,
  [reservation.store]                                      : reservation.reducer,
  [reservationDetail.store]                                : reservationDetail.reducer,
  [rol.store]                                              : rol.reducer,
  [rolDetail.store]                                        : rolDetail.reducer,
  [rolPermission.store]                                    : rolPermission.reducer,
  [transaction.store]                                      : transaction.reducer,
  [service.store]                                          : service.reducer,
  [serviceDetail.store]                                    : serviceDetail.reducer,
  [serviceAddon.store]                                     : serviceAddon.reducer,
  [serviceAddonDetail.store]                               : serviceAddonDetail.reducer,
  [serviceAddonGroup.store]                                : serviceAddonGroup.reducer,
  [serviceAddonGroupDetail.store]                          : serviceAddonGroupDetail.reducer,
  [serviceAttribute.store]                                 : serviceAttribute.reducer,
  [serviceAttributeDetail.store]                           : serviceAttributeDetail.reducer,
  [serviceAttributeValue.store]                            : serviceAttributeValue.reducer,
  [serviceAttributeValueDetail.store]                      : serviceAttributeValueDetail.reducer,
  [serviceGroup.store]                                     : serviceGroup.reducer,
  [serviceGroupDetail.store]                               : serviceGroupDetail.reducer,
  [serviceGroupPetKind.store]                              : serviceGroupPetKind.reducer,
  [servicePetKind.store]                                   : servicePetKind.reducer,
  [serviceVariation.store]                                 : serviceVariation.reducer,
  [serviceVariationDetail.store]                           : serviceVariationDetail.reducer,
  [servicePackage.store]                                   : servicePackage.reducer,
  [servicePackageDetail.store]                             : servicePackageDetail.reducer,
  [serviceVariationRelease.store]                          : serviceVariationRelease.reducer,
  [serviceVariationReleaseDetail.store]                    : serviceVariationReleaseDetail.reducer,
  [setupCapacityServiceCustom.store]                       : setupCapacityServiceCustom.reducer,
  [setupCapacityServiceCustomDetail.store]                 : setupCapacityServiceCustomDetail.reducer,
  [servicePrice.store]                                     : servicePrice.reducer,
  [servicePriceDetail.store]                               : servicePriceDetail.reducer,
  [staffManagementInfoAvailability.store]                  : staffManagementInfoAvailability.reducer,
  [staffManagementInfoAvailabilityDetail.store]            : staffManagementInfoAvailabilityDetail.reducer,
  [staffManagementInfoPersonal.store]                      : staffManagementInfoPersonal.reducer,
  [staffManagementInfoPersonalDetail.store]                : staffManagementInfoPersonalDetail.reducer,
  [staffManagementInfoWages.store]                         : staffManagementInfoWages.reducer,
  [staffManagementInfoWagesDetail.store]                   : staffManagementInfoWagesDetail.reducer,
  [staffManagementNotification.store]                      : staffManagementNotification.reducer,
  [staffManagementNotificationDetail.store]                : staffManagementNotificationDetail.reducer,
  [staffManagementNotificationSettingEmployee.store]       : staffManagementNotificationSettingEmployee.reducer,
  [staffManagementNotificationSettingEmployeeDetail.store] : staffManagementNotificationSettingEmployeeDetail.reducer,
  [staffManagementNotificationSettingManager.store]        : staffManagementNotificationSettingManager.reducer,
  [staffManagementNotificationSettingManagerDetail.store]  : staffManagementNotificationSettingManagerDetail.reducer,
  [staffManagementPerformanceNotice.store]                 : staffManagementPerformanceNotice.reducer,
  [staffManagementPerformanceReview.store]                 : staffManagementPerformanceReview.reducer,
  [tenantDetail.store]                                     : tenantDetail.reducer,
  [onlineRequestsClientSubmission.store]                   : onlineRequestsClientSubmission.reducer,
  [onlineRequestsClientSubmissionDetail.store]             : onlineRequestsClientSubmissionDetail.reducer,
  [onlineRequestsConfirmReservation.store]                 : onlineRequestsConfirmReservation.reducer,
  [onlineRequestsConfirmReservationDetail.store]           : onlineRequestsConfirmReservationDetail.reducer,
  [onlineRequestsClientDocument.store]                     : onlineRequestsClientDocument.reducer,
  [onlineRequestsClientDocumentDetail.store]               : onlineRequestsClientDocumentDetail.reducer,
  [onlineRequestsDeclinedClients.store]                    : onlineRequestsDeclinedClients.reducer,
  [onlineRequestsDeclinedClientsDetail.store]              : onlineRequestsDeclinedClientsDetail.reducer,
  [onlineRequestsVaccinationUpdate.store]                  : onlineRequestsVaccinationUpdate.reducer,
  [onlineRequestsVaccinationUpdateDetail.store]            : onlineRequestsVaccinationUpdateDetail.reducer,
  [onlineRequestsCancellationLogs.store]                   : onlineRequestsCancellationLogs.reducer,
  [onlineRequestsCancellationLogsDetail.store]             : onlineRequestsCancellationLogsDetail.reducer,
  [onlineRequestNote.store]                                : onlineRequestNote.reducer,
  [onlineRequestNoteDetail.store]                          : onlineRequestNoteDetail.reducer,
  [orderServiceBoardingKennel.store]                       : orderServiceBoardingKennel.reducer,
  [orderServiceBoardingKennelDetail.store]                 : orderServiceBoardingKennelDetail.reducer,
  [orderServiceBoardingKennelArea.store]                   : orderServiceBoardingKennelArea.reducer,
  [orderServiceBoardingKennelAreaDetail.store]             : orderServiceBoardingKennelAreaDetail.reducer,
  [orderServiceBoardingKennelType.store]                   : orderServiceBoardingKennelType.reducer,
  [orderServiceBoardingKennelTypeDetail.store]             : orderServiceBoardingKennelTypeDetail.reducer,
  [trainingCommand.store]                                  : trainingCommand.reducer,
  [trainingCommandDetail.store]                            : trainingCommandDetail.reducer,
  [trainingMethod.store]                                   : trainingMethod.reducer,
  [trainingMethodDetail.store]                             : trainingMethodDetail.reducer,
  [trainingPackage.store]                                  : trainingPackage.reducer,
  [trainingReason.store]                                   : trainingReason.reducer,
  [trainingReasonDetail.store]                             : trainingReasonDetail.reducer,
  [transactionDetail.store]                                : transactionDetail.reducer,
  [transactionDetail.store]                                : transactionDetail.reducer,
  [user.store]                                             : user.reducer,
  [userDetail.store]                                       : userDetail.reducer,
  [zip.store]                                              : zip.reducer,
  [zipDetail.store]                                        : zipDetail.reducer
})

export default createRootReducer

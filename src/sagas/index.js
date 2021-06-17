
import { all } from 'redux-saga/effects'
import agreement from './agreement'
import agreementDetail from './agreement/detail'
import auth from './auth'
import application from './application'
import breedManagerSetting from './pet/breed-manager-setting'
import boardingPrepaidUsage from './pet/reservation/usage/boarding/prepaid'
import boardingReservationUsage from './pet/reservation/usage/boarding/reservation'
import boardingReservationBook from './client/reservation/boarding-reservation/detail'
import category from './category'
import categoryDetail from './category/detail'
import client from './client'
import coupanSetup from './coupan-setup/coupan'
import couponUsage from './coupan-setup/coupan/coupon-usage'
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
import companyProfileCalendar from './company-profile/calendar'
import companyProfileCalendarDetail from './company-profile/calendar/detail'
import companyContactBilling from './company/contact-billing/detail'
import customReport from './custom-report'
import customized from './customized-field'
import customizedField from './customized-field/field'
import customizedFieldDetail from './customized-field/field/detail'
import customizedFieldGroup from './customized-field/group'
import customizedFieldGroupDetail from './customized-field/group/detail'
import clientPetBreed from    './pet/breed-manager-setting/client-pet-breed'
import dashboard from './dashboard'
import dashboardModal from './dashboard/dashboard-modal'
import dashboardExpressCheckIn from './dashboard/express-check-in'
import dashboardNotification from './dashboard/notification'
import dashboardTasklist from './dashboard/tasklist'
import dashboardCalendarFacility from './dashboard/calendar/facility'
import dashboardCalendarStaffing from './dashboard/calendar/staffing'
import dashboardCard from './dashboard/dashboard-card/index'
import dashboardCardModal from './dashboard/dashboard-card/dashboard-card-modal'
import dashboardVaccination from './dashboard/vaccination'
import daycampCard from './pet/reservation/daycamp-card'
import dayCareReservationBreed from    './pet/breed-manager-setting/day-care-reservation-breed'
import daycampCardDetail from './pet/reservation/daycamp-card/detail'
import daycampCardQuestion from './pet/reservation/daycamp-card/daycamp-card-question'
import daycampCardQuestionDetail from './pet/reservation/daycamp-card/daycamp-card-question/detail'
import daycampCardAnswerDetail from './pet/reservation/daycamp-card/daycamp-card-answer/detail'
import daycampPrepaidUsage from './pet/reservation/usage/daycamp/prepaid'
import daycampReservationUsage from './pet/reservation/usage/daycamp/reservation'
import employee from './employee'
import employeeDetail from './employee/detail'
import employeeRole from './employee/role'
import employeeRoleDetail from './employee/role/detail'
import employeeSchedule from './employee/schedule'
import employeeScheduleDetail from './employee/schedule/detail'
import employeeTitle from './employee/title'
import employeeTitleDetail from './employee/title/detail'
import emailMessage from './email-message'
import emailTemplate from './email-template'
import emailLog from './email-log'
import employeeTimeOff from './staff-management/employee-time-off'
import employeeTimeOffRequestUpcoming from './staff-management/employee-time-off/requests/upcoming'
import employeeTimeOffRequestHistory from './staff-management/employee-time-off/requests/history'
import employeeTimeOffRequestOther from './staff-management/employee-time-off/requests/other'
import exampleOne from './example/one'
import exampleTwo from './example/two'
import feedingMeasurement from './pet/feeding-setting/feeding-measurement'
import feedingMethod from './pet/feeding-setting/feeding-method'
import feedingTime from './pet/feeding-setting/feeding-time'
import feedingUnit from './pet/feeding-setting/feeding-unit'
import foodType from './pet/feeding-setting/food-type'
import mealStatus from './pet/feeding-setting/meal-status'
import location from './location'
import locationDetail from './location/detail'
import managerDashboardDepartmentRole from './manager-dashboard/department-role'
import managerDashboardEmployeeDirectory from './manager-dashboard/employee/employee-directory'
import managerDashboardEmployeeDocument from './manager-dashboard/employee/employee-document'
import managerDashboardEmployeeWageHistory from './manager-dashboard/employee/employee-wage-history'
import medication from './pet/medication-setting/medication'
import medicationMeasurement from './pet/medication-setting/medication-measurement'
import medicationTime from './pet/medication-setting/medication-time'
import medicationUnit from './pet/medication-setting/medication-unit'
import medicationReportStatus from './pet/medication-setting/medication-report-status'
import medicationType from './pet/medication-setting/medication-type'
import notification from './notification'
import organization from './organization'
import organizationDetail from './organization/detail'
import groomingPrepaidUsage from './pet/reservation/usage/grooming/prepaid'
import groomingReservationUsage from './pet/reservation/usage/grooming/reservation'
import orderServiceBoardingKennel from './order/service/boarding/kennel'
import orderServiceBoardingKennelDetail from './order/service/boarding/kennel/detail'
import orderServiceBoardingKennelArea from './order/service/boarding/kennel/area'
import orderServiceBoardingKennelAreaDetail from './order/service/boarding/kennel/area/detail'
import orderServiceBoardingKennelType from './order/service/boarding/kennel/type'
import orderServiceBoardingKennelTypeDetail from './order/service/boarding/kennel/type/detail'
import packagePricing from './package-pricing'
import paymentMethod from './payment-method'
import pet from './pet'
import petDetail from './pet/detail'
import petBreed from './pet/breed'
import petBreedDetail from './pet/breed/detail'
import petKind from './pet/kind'
import petKindDetail from './pet/kind/detail'
import petKindSize from './pet/kind/size'
import petKindSizeDetail from './pet/kind/size/detail'
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
import petInteractionType from './pet/interaction-type'
import petVeterinarianList from './pet/veterinarian-list'
import petNote from './pet/note'
import petNoteDetail from './pet/note/detail'
import petRetireReason from './pet/retire-reason'
import petRetireReasonDetail from './pet/retire-reason/detail'
import petReservation from './pet/reservation'
import petReservationDetail from './pet/reservation/detail'
import petReservationDaycampQuestion from './pet/reservation/daycamp-question'
import petReservationDaycampQuestionDetail from './pet/reservation/daycamp-question/detail'
import petReservationDayServicePackage from './pet/reservation/day-service-package'
import petReservationCheckInDetail from './pet/reservation/express-check-in/detail'
import petReservationTrainingPackage from './pet/reservation/training/package'
import petReservationGroomingPackage from './pet/reservation/grooming/package'
import petReservationTrainingReservationGroupClass from './pet/reservation/training/reservation/group-class'
import petReservationTrainingReservation from './pet/reservation/training/reservation'
import petReservationBoarding from './pet/reservation/boarding'
import petReservationBoardingPackage from './pet/reservation/boarding/package'
import petReservationBoardingAddon from './pet/reservation/boarding/addon'
import petReservationBoardingAddonFeeding from './pet/reservation/boarding/addon/feeding-addon'
import petReservationGrooming from './pet/reservation/grooming'
import petReservationGroomingAddon from './pet/reservation/grooming/addon'
import petDaycampReservation from './pet/reservation/daycamp-reservation'
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
import productImage from './product/image'
import productImageDetail from './product/image/detail'
import productFamily from './product/family'
import productFamilyDetail from './product/family/detail'
import productOption from './product/option'
import productOptionDetail from './product/option/detail'
import productPackage from './product/package'
import productPackageDetail from './product/package/detail'
import productVariations from './product/product-variations'
import productVariationsDetail from './product/product-variations/detail'
import productVariationsImageDetail from './product/product-variations/image/detail'
import reservation from './reservation'
import reservationDetail from './reservation/detail'
import reservationByDateBreed from    './pet/breed-manager-setting/reservation-by-date-breed'
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
import serviceGroup from './service/group'
import serviceGroupDetail from './service/group/detail'
import serviceGroupPetKind from './service/group/pet/kind'
import servicePetKind from './service/pet/kind'
import serviceVariation from './service/variation'
import serviceVariationDetail from './service/variation/detail'
import servicePackage from './service/package'
import servicePackageDetail from './service/package/detail'
import serviceVariationRelease from './service/variation/release'
import serviceVariationReleaseDetail from './service/variation/release/detail'
import setupCapacityServiceCustom from './setup/capacity/service/custom'
import setupCapacityServiceCustomDetail from './setup/capacity/service/custom/detail'
import staffManagementInfoAvailability from './staff-management/information/availability'
import staffManagementInfoWages from './staff-management/information/wages'
import staffManagementNotificationEmployeeNotice from './staff-management/notification/employee-notice'
import staffManagementNotificationSettingEmployee from './staff-management/notification/notification-setting/employee-notification'
import staffManagementNotificationSettingManager from './staff-management/notification/notification-setting/manager-notification'
import staffManagementNotice from './staff-management/performance/notice'
import staffManagementReview from './staff-management/performance/review'
import tenantDetail from './tenant/detail'
import onlineRequestClientSubmission from './online-request/client-submission'
import onlineRequestClientSubmissionDetail from './online-request/client-submission/detail'
import onlineRequestConfirmReservation from './online-request/confirm-reservation'
import onlineRequestVaccinationUpdate from './online-request/vaccination-update'
import onlineRequestVaccinationUpdateDetail from './online-request/vaccination-update/detail'
import onlineRequestNote from './online-request/note'
import onlineRequestNoteDetail from './online-request/note/detail'
import ratingKey from './rating-key'
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
    ...breedManagerSetting,
    ...boardingPrepaidUsage,
    ...boardingReservationUsage,
    ...boardingReservationBook,
    ...category,
    ...categoryDetail,
    ...client,
    ...coupanSetup,
    ...couponUsage,
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
    ...clientPetBreed,
    ...company,
    ...companyDetail,
    ...companyProfileCalendar,
    ...companyProfileCalendarDetail,
    ...companyContactBilling,
    ...customReport,
    ...customized,
    ...customizedField,
    ...customizedFieldDetail,
    ...customizedFieldGroup,
    ...customizedFieldGroupDetail,
    ...dayCareReservationBreed,
    ...daycampCard,
    ...dashboardVaccination,
    ...dashboard,
    ...dashboardModal,
    ...dashboardExpressCheckIn,
    ...dashboardNotification,
    ...dashboardTasklist,
    ...dashboardCalendarFacility,
    ...dashboardCalendarStaffing,
    ...dashboardCard,
    ...dashboardCardModal,
    ...exampleOne,
    ...exampleTwo,
    ...petDaycampReservation,
    ...daycampCardDetail,
    ...daycampCardQuestion,
    ...daycampCardQuestionDetail,
    ...daycampCardAnswerDetail,
    ...daycampPrepaidUsage,
    ...daycampReservationUsage,
    ...emailMessage,
    ...emailTemplate,
    ...emailLog,
    ...employee,
    ...employeeDetail,
    ...employeeRole,
    ...employeeRoleDetail,
    ...employeeSchedule,
    ...employeeScheduleDetail,
    ...employeeTimeOff,
    ...employeeTimeOffRequestUpcoming,
    ...employeeTimeOffRequestHistory,
    ...employeeTimeOffRequestOther,
    ...employeeTitle,
    ...employeeTitleDetail,
    ...feedingMeasurement,
    ...feedingMethod,
    ...feedingTime,
    ...feedingUnit,
    ...foodType,
    ...mealStatus,
    ...location,
    ...locationDetail,
    ...managerDashboardDepartmentRole,
    ...managerDashboardEmployeeDirectory,
    ...managerDashboardEmployeeDocument,
    ...managerDashboardEmployeeWageHistory,
    ...medication,
    ...medicationMeasurement,
    ...medicationReportStatus,
    ...medicationTime,
    ...medicationType,
    ...medicationUnit,
    ...notification,
    ...organization,
    ...organizationDetail,
    ...groomingPrepaidUsage,
    ...groomingReservationUsage,
    ...orderServiceBoardingKennel,
    ...orderServiceBoardingKennelDetail,
    ...orderServiceBoardingKennelArea,
    ...orderServiceBoardingKennelAreaDetail,
    ...orderServiceBoardingKennelType,
    ...orderServiceBoardingKennelTypeDetail,
    ...packagePricing,
    ...paymentMethod,
    ...pet,
    ...petDetail,
    ...petBreed,
    ...petBreedDetail,
    ...petKind,
    ...petKindDetail,
    ...petKindSize,
    ...petKindSizeDetail,
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
    ...petInteractionType,
    ...petVeterinarianList,
    ...petNote,
    ...petNoteDetail,
    ...petRetireReason,
    ...petRetireReasonDetail,
    ...petReservationGroomingPackage,
    ...petReservation,
    ...petReservationDetail,
    ...petReservationCheckInDetail,
    ...petReservationDaycampQuestion,
    ...petReservationDaycampQuestionDetail,
    ...petReservationDayServicePackage,
    ...petReservationTrainingPackage,
    ...petReservationTrainingReservation,
    ...petReservationTrainingReservationGroupClass,
    ...petReservationBoarding,
    ...petReservationBoardingPackage,
    ...petReservationBoardingAddon,
    ...petReservationBoardingAddonFeeding,
    ...petReservationGrooming,
    ...petReservationGroomingAddon,
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
    ...productImage,
    ...productImageDetail,
    ...productFamily,
    ...productFamilyDetail,
    ...productOption,
    ...productOptionDetail,
    ...productPackage,
    ...productPackageDetail,
    ...productVariations,
    ...productVariationsDetail,
    ...productVariationsImageDetail,
    ...reservationByDateBreed,
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
    ...serviceGroup,
    ...serviceGroupDetail,
    ...serviceGroupPetKind,
    ...servicePetKind,
    ...serviceVariation,
    ...serviceVariationDetail,
    ...servicePackage,
    ...servicePackageDetail,
    ...serviceVariationRelease,
    ...serviceVariationReleaseDetail,
    ...setupCapacityServiceCustom,
    ...setupCapacityServiceCustomDetail,
    ...staffManagementInfoAvailability,
    ...staffManagementInfoWages,
    ...staffManagementNotificationEmployeeNotice,
    ...staffManagementNotificationSettingEmployee,
    ...staffManagementNotificationSettingManager,
    ...staffManagementNotice,
    ...staffManagementReview,
    ...tenantDetail,
    ...onlineRequestClientSubmission,
    ...onlineRequestClientSubmissionDetail,
    ...onlineRequestConfirmReservation,
    ...onlineRequestVaccinationUpdate,
    ...onlineRequestVaccinationUpdateDetail,
    ...onlineRequestNote,
    ...onlineRequestNoteDetail,
    ...ratingKey,
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

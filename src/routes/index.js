// Public Containers
import AuthRecoverAccount from '@containers/auth/recover-account'
import AuthForgotPassword from '@containers/auth/forgot-password'
import AuthSignIn from '@containers/auth/sign-in'
import AuthSignUp from '@containers/auth/sign-up'
import AuthSSO from '@containers/auth/sso'
import Error404 from '@containers/page/error-404'

// Private Containers

import Agreement from '@containers/agreement'
import AgreementCreate from '@containers/agreement/create'
import AnimalSetting from '@containers/animal-setting'
import AdminItem from '@containers/admin-item'
import FeedingSetting from '@containers/feeding-setting'
import MedicationSetting from '@containers/medication-setting'
import VaccinationSetting from '@containers/vaccination-setting'
import AuthMe from '@containers/auth/me'
import Category from '@containers/category'
import ColorCode from '@containers/color-code'
import BehaviorTagSetting from '@containers/behavior-tag-setting'
import BookingSheetSetting from '@containers/booking-sheet-setting'
import BreedManagerSetting from '@containers/breed-manager-setting'
import Dashboard from '@containers/dashboard'
import DayCampForm from '@containers/day-camp-form'
import Client from '@containers/client'
import ClientShow from '@containers/client/show'
import ClientBook from '@containers/client/reservation'
import CoupanInvoiceSetup from '@containers/coupan-setup/invoice-setting'
import PetBook from '@containers/client/reservation'
import CustomizedField from '@containers/customized-field'
import Calendar from '@containers/calendar'
import EmailMessage from '@containers/email-message'
import ServiceSetting from '@containers/service-setting'
import SystemSetting from '@containers/system-setting'
import EmailTemplate from '@containers/email-template'
import Notification from '@containers/notification'
import Location from '@containers/location'
import DocumentType from '@containers/document-type'
import PaymentMethod from '@containers/payment-method'
import PaymentInstruction from '@containers/payment-instruction'
import Pet from '@containers/pet'
import PetCreate from '@containers/pet/create'
import PetSetting from '@containers/pet-setting'
import DynamicForm from '@containers/dynamic-form-builder'
import PetVaccinationType from '@containers/pet-vaccination-type'
import PetKennel from '@containers/pet-kennel'
import PetKennelType from '@containers/pet-kennel-type'
import PetKennelArea from '@containers/pet-kennel-area'
import PetYardType from '@containers/pet-yard-type'
import PriceMaster from '@containers/price-master'
import PriceMasterCreate from '@containers/price-master/create'
import PackagePricing from '@containers/package-pricing'
import ProductAttribute from '@containers/product-attribute'
import ProductAttributeValue from '@containers/product-attribute-value'
import ProductFamily from '@containers/product/family'
import Product from '@containers/product'
import ProductEdit from '@containers/product/edit'
import RatingKey from '@containers/rating-key'
import DayServiceReportCardSetup from '@containers/report-card-setup/day-service'
import BoardingReportCardSetup from '@containers/report-card-setup/boarding'
import GroomingReportCardSetup from '@containers/report-card-setup/grooming'
import TrainingReportCardSetup from '@containers/report-card-setup/training'
import CustomReport from '@containers/custom-report'
import EmployeeTitle from '@containers/employee-title'
import Employee from '@containers/employee'
import EmployeeShow from '@containers/employee/show'
import EmployeeEdit from '@containers/employee/edit'
import Service from '@containers/service'
import ServiceCreate from '@containers/service/create'
import ServiceAttribute from '@containers/service-attribute'
import ServiceAttributeValue from '@containers/service-attribute-value'
import OnlineRequests from '@containers/online-request'
import ClientSubmission from '@containers/online-request/clientSubmission'
import ConfirmReservations from '@containers/online-request/confirmReservation'
import CancellationsLogs from '@containers/online-request/cancellationLog'
import DeclinedClients from '@containers/online-request/declinedClient'
import VaccinationsUpdate from '@containers/online-request/vaccinationsUpdate'
import Company from '@containers/company'
import CompanyEdit from '@containers/company/edit'
import CompanyShow from '@containers/company/show'
import Organization from '@containers/organization'
import OrganizationEdit from '@containers/organization/edit'
import OrganizationShow from '@containers/organization/show'
import ReportSheetSetting from '@containers/report-sheet-setting'
import SetupIndex from '@containers/setup'
import SetupPetBreedIndex from '@containers/setup/pet/breed'
import SetupPetBehaviorTagsIndex from '@containers/setup/pet/behavior-tag'

// Settings / Add-on / General Settings
import SetupAddOnGeneralAddOnIndex from '@containers/setup/add-on/general/add-on-section'
import SetupAddOnGeneralOpenLineIndex from '@containers/setup/add-on/general/open-line-section'
import SetupAddOnGeneralSettingIndex from '@containers/setup/add-on/general/setting-section'
import SetupAddOnGeneralTransportIndex from '@containers/setup/add-on/general/transport-section'

// Settings / Animal / Feeding
import SetupPetFeedingMealStatusIndex from '@containers/setup/pet/feeding/meal-status-section'
import SetupPetFeedingMeasurementIndex from '@containers/setup/pet/feeding/measurement-section'
import SetupPetFeedingMethodIndex from '@containers/setup/pet/feeding/method-section'
import SetupPetFeedingSettingIndex from '@containers/setup/pet/feeding/setting-section'
import SetupPetFeedingTimeIndex from '@containers/setup/pet/feeding/time-section'
import SetupPetFeedingTypeIndex from '@containers/setup/pet/feeding/type-section'
import SetupPetFeedingUnitIndex from '@containers/setup/pet/feeding/unit-section'

// Settings / Animal / General
import SetupPetGeneralIncidentActionIndex from '@containers/setup/pet/general/incident/action-section'
import SetupPetGeneralIncidentBehaviorIndex from '@containers/setup/pet/general/incident/behavior-section'
import SetupPetGeneralIncidentTypeIndex from '@containers/setup/pet/general/incident/type-section'
import SetupPetGeneralInteractionTypeIndex from '@containers/setup/pet/general/interaction-type-section'
import SetupPetGeneralRetireReasonIndex from '@containers/setup/pet/general/retire-reason-section'
import SetupPetGeneralVeterinaryIndex from '@containers/setup/pet/general/veterinary-section'

// Settings / Animal / Species
import SetupPetKindIndex from '@containers/setup/pet/kind'

// Settings / Animal / Medication
import SetupPetMedicationIndex from '@containers/setup/pet/medication'
import SetupPetMedicationMeasurementIndex from '@containers/setup/pet/medication/measurement-section'
import SetupPetMedicationReportStatusIndex from '@containers/setup/pet/medication/report-status-section'
import SetupPetMedicationSettingIndex from '@containers/setup/pet/medication/setting-section'
import SetupPetMedicationTimeIndex from '@containers/setup/pet/medication/time-section'
import SetupPetMedicationTypeIndex from '@containers/setup/pet/medication/type-section'
import SetupPetMedicationUnitIndex from '@containers/setup/pet/medication/unit-section'

// Settings / Animal / Vaccinations
import SetupPetVaccinationSettingIndex from '@containers/setup/pet/vaccination/setting-section'
import SetupPetVaccinationTypeIndex from '@containers/setup/pet/vaccination/type-section'

// Settings / Boarding
import SetupBoardingPricingIndex from '@containers/setup/boarding/pricing'

// Settings / Boarding / General Settings
import SetupBoardingGeneralActivityIndex from '@containers/setup/boarding/general/activity-section'
import SetupBoardingGeneralBelongingIndex from '@containers/setup/boarding/general/belonging-section'
import SetupBoardingGeneralReservationIndex from '@containers/setup/boarding/general/reservation-section'
import SetupBoardingGeneralServiceTypeIndex from '@containers/setup/boarding/general/service-type-section'
import SetupBoardingGeneralSettingIndex from '@containers/setup/boarding/general/setting-section'

// Settings / Capacity / Lodging Area Managment
import SetupCapacityBoardingAreaIndex from '@containers/setup/capacity/boarding/area-section'
import SetupCapacityBoardingKennelIndex from '@containers/setup/capacity/boarding/kennel-section'
import SetupCapacityBoardingSettingIndex from '@containers/setup/capacity/boarding/setting-section'
import SetupCapacityBoardingTypeIndex from '@containers/setup/capacity/boarding/type-section'

// Settings / Capacity / Appointment Capacity
import SetupCapacityAppointmentRoleIndex from '@containers/setup/capacity/appointment/role-section'
import SetupCapacityAppointmentSettingIndex from '@containers/setup/capacity/appointment/setting-section'
import SetupCapacityAppointmentSpecialistIndex from '@containers/setup/capacity/appointment/specialist-section'

// Settings / Services Capacity
import SetupCapacityCustomCapacityIndex from '@containers/setup/capacity/service/custom-capacity-section'
import SetupCapacityServiceReservationIndex from '@containers/setup/capacity/service/reservation-section'
import SetupCapacityServiceServiceGroupIndex from '@containers/setup/capacity/service/service-group-section'
import SetupCapacityServiceSettingIndex from '@containers/setup/capacity/service/setting-section'
import SetupCapacityServiceServiceTypeIndex from '@containers/setup/capacity/service/service-type-section'
import SetupCapacityServiceTotalFacilityIndex from '@containers/setup/capacity/service/total-facility-section'
import SetupCapacityServiceYardCapacityIndex from '@containers/setup/capacity/service/yard-capacity-section'

// Settings / Day Services / General Settings
import SetupDayServiceGeneralReservationIndex from '@containers/setup/day-service/general/reservation-section'
import SetupDayServiceGeneralServiceTypeIndex from '@containers/setup/day-service/general/service-type-section'
import SetupDayServiceGeneralSettingIndex from '@containers/setup/day-service/general/setting-section'

// Settings / Grooming / General Settings
import SetupGroomingGeneralReservationIndex from '@containers/setup/grooming/general/reservation-section'
import SetupGroomingGeneralServiceOptionIndex from '@containers/setup/grooming/general/service-option-section'
import SetupGroomingGeneralServiceTypeIndex from '@containers/setup/grooming/general/service-type-section'
import SetupGroomingGeneralSettingIndex from '@containers/setup/grooming/general/setting-section'

// Settings / Services
import SetupServiceGroupIndex from '@containers/setup/service/group'
import SetupServiceTypeIndex from '@containers/setup/service/type'
import SettingsServiceIndex from '@containers/settings/type'
import SetupServiceReservationIndex from '@containers/setup/service/reservation'
import SetupServiceReservationBoardingActivityIndex from '@containers/setup/service/reservation/boarding-activity'
import SetupServiceReservationGroupClassIndex from '@containers/setup/service/reservation/group-class'
import SetupServiceReservationGroupClassSessionIndex from '@containers/setup/service/reservation/group-class/session'
import SetupServicePackageDayServices from '@containers/setup/service/package/day-services-section'

// Settings / Training
// import SetupTrainingIndex from '@containers/setup/training'
import SetupTrainingCommandIndex from '@containers/setup/training/command'
import SetupTrainingMethodIndex from '@containers/setup/training/method'
import SetupTrainingRatingKeyIndex from '@containers/setup/training/rating-key'
import SetupTrainingReasonIndex from '@containers/setup/training/reason'
import TrainingCommand from '@containers/training-command'
import TrainingMethod from '@containers/training-method'
import TrainingReason from '@containers/training-reason'

// Settings / Financial / Invoice
import SetupFinancialInvoiceServicesIndex from '@containers/setup/financial-setting/invoice/services-activities'
import SetupFinancialInvoiceAddOnsIndex from '@containers/setup/financial-setting/invoice/add-ons'
import SetupFinancialInvoicePackagesIndex from '@containers/setup/financial-setting/invoice/packages'
import SetupFinancialInvoiceFeedingIndex from '@containers/setup/financial-setting/invoice/feeding-meds'
import SetupFinancialInvoiceSurchargesIndex from '@containers/setup/financial-setting/invoice/surcharges'

// import TrainingQuestionnaire from '@containers/training-questionnaire'

// Settings / Training / General Settings
import SetupTrainingGeneralGroupClassIndex from '@containers/setup/training/general/group-class-section'
import SetupTrainingGeneralGroupClassSessionIndex from '@containers/setup/training/general/group-class-session-section'
import SetupTrainingGeneralReservationIndex from '@containers/setup/training/general/reservation-section'
import SetupTrainingGeneralServiceTypeIndex from '@containers/setup/training/general/service-type-section'
import SetupTrainingGeneralSettingIndex from '@containers/setup/training/general/setting-section'

import Transaction from '@containers/transaction'
import User from '@containers/user'

const publicRoutes = [
  {
    path     : '/',
    component: AuthSignIn
  },
  {
    path     : '/auth/forgot-password',
    component: AuthForgotPassword
  },
  {
    path     : '/auth/recover-account/:token',
    component: AuthRecoverAccount
  },
  {
    path     : '/auth/sign-in',
    component: AuthSignIn
  },
  {
    path     : '/auth/sign-up/:id',
    component: AuthSignUp
  }
]

const privateRoutes = [
  {
    path     : '/auth/me',
    component: AuthMe
  },
  {
    path     : '/auth/sso',
    component: AuthSSO
  },
  {
    path     : '/setup/questionnaire-form',
    component: DynamicForm
  },
  {
    path     : '/setup/animal-setting',
    component: AnimalSetting
  },
  {
    path     : '/setup/admin-item',
    component: AdminItem
  },
  {
    path     : '/setup/animal-setting/feeding',
    component: FeedingSetting
  },
  {
    path     : '/setup/animal-setting/medication',
    component: MedicationSetting
  },
  {
    path     : '/setup/animal-setting/vaccination',
    component: VaccinationSetting
  },
  {
    path     : '/setup/animal-setting/behavior-tag',
    component: BehaviorTagSetting
  },
  {
    path     : '/setup/animal-setting/breed-manager',
    component: BreedManagerSetting
  },
  {
    path     : '/setup/day-camp-form',
    component: DayCampForm
  },
  {
    path     : '/setup/color-codes',
    component: ColorCode
  },
  {
    path     : '/setup/coupan-setup/invoice-setting',
    component: CoupanInvoiceSetup
  },
  {
    path     : '/setup/booking-sheet-setting',
    component: BookingSheetSetting
  },
  {
    path     : '/setup/notifications',
    component: Notification
  },
  {
    path     : '/client',
    component: Client
  },
  {
    path     : '/client/:client',
    component: ClientShow
  },
  {
    path     : '/client/:client/book',
    component: ClientBook
  },
  {
    path     : '/pet/:pet/book',
    component: PetBook

  },
  {
    path     : '/company',
    component: Company
  },
  {
    path     : '/company/:id',
    component: CompanyShow
  },
  {
    path     : '/company/:id/edit',
    component: CompanyEdit
  },
  {
    path     : '/setup/email-template',
    component: EmailTemplate
  },
  {
    path     : '/setup/system-setting',
    component: SystemSetting

  },
  {
    path     : '/email-message',
    component: EmailMessage
  },
  {
    path     : '/setup/customized-field',
    component: CustomizedField
  },
  {
    path     : '/dashboard',
    component: Dashboard
  },
  {
    path     : '/setup/payment-method',
    component: PaymentMethod
  },
  {
    path     : '/setup/payment-instruction',
    component: PaymentInstruction
  },
  {
    path     : '/setup/pet-setting',
    component: PetSetting
  },
  {
    path     : '/pet/vaccination-type',
    component: PetVaccinationType
  },
  {
    path     : '/pet',
    component: Pet
  },
  {
    path     : '/pet/:pet',
    component: PetCreate
  },
  {
    path     : '/setup/pet-kennel',
    component: PetKennel
  },
  {
    path     : '/setup/pet-kennel-type',
    component: PetKennelType
  },
  {
    path     : '/setup/pet-kennel-area',
    component: PetKennelArea
  },
  {
    path     : '/setup/pet-yard-type',
    component: PetYardType
  },
  {
    path     : '/setup/price-master',
    component: PriceMaster
  },
  {
    path     : '/setup/price-master/create',
    component: PriceMasterCreate
  },
  {
    path     : '/setup/package-pricing',
    component: PackagePricing
  },
  {
    path     : '/products',
    component: Product
  },
  {
    path     : '/products/:id(\\d+)',
    component: ProductEdit
  },
  {
    path     : '/products/attributes',
    component: ProductAttribute
  },
  {
    path     : '/products/attributes/:id/values',
    component: ProductAttributeValue
  },
  {
    path     : '/products/categories',
    component: Category
  },
  {
    path     : '/products/families',
    component: ProductFamily
  },
  {
    path     : '/services',
    component: Service
  },
  {
    path     : '/services/create',
    component: ServiceCreate
  },
  {
    path     : '/services/:id',
    component: ServiceCreate
  },
  {
    path     : '/services/attributes',
    component: ServiceAttribute
  },
  {
    path     : '/services/attributes/values/:id',
    component: ServiceAttributeValue
  },
  {
    path     : '/setup',
    component: SetupIndex
  },
  {
    path     : '/setup/pet/breed',
    component: SetupPetBreedIndex
  },
  {
    path     : '/setup/pet/behavior-tags',
    component: SetupPetBehaviorTagsIndex
  },
  {
    path     : '/setup/add-on/general/add-on',
    component: SetupAddOnGeneralAddOnIndex
  },
  {
    path     : '/setup/add-on/general/open-line',
    component: SetupAddOnGeneralOpenLineIndex
  },
  {
    path     : '/setup/add-on/general/setting',
    component: SetupAddOnGeneralSettingIndex
  },
  {
    path     : '/setup/add-on/general/transport',
    component: SetupAddOnGeneralTransportIndex
  },
  {
    path     : '/setup/pet/feeding/meal-status',
    component: SetupPetFeedingMealStatusIndex
  },
  {
    path     : '/setup/pet/feeding/measurement',
    component: SetupPetFeedingMeasurementIndex
  },
  {
    path     : '/setup/pet/feeding/method',
    component: SetupPetFeedingMethodIndex
  },
  {
    path     : '/setup/pet/feeding/setting',
    component: SetupPetFeedingSettingIndex
  },
  {
    path     : '/setup/pet/feeding/time',
    component: SetupPetFeedingTimeIndex
  },
  {
    path     : '/setup/pet/feeding/type',
    component: SetupPetFeedingTypeIndex
  },
  {
    path     : '/setup/pet/feeding/unit',
    component: SetupPetFeedingUnitIndex
  },
  {
    path     : '/setup/pet/general/incident/action',
    component: SetupPetGeneralIncidentActionIndex
  },
  {
    path     : '/setup/pet/general/incident/behavior',
    component: SetupPetGeneralIncidentBehaviorIndex
  },
  {
    path     : '/setup/pet/general/incident/type',
    component: SetupPetGeneralIncidentTypeIndex
  },
  {
    path     : '/setup/pet/general/interaction-type',
    component: SetupPetGeneralInteractionTypeIndex
  },
  {
    path     : '/setup/pet/general/retire-reason',
    component: SetupPetGeneralRetireReasonIndex
  },
  {
    path     : '/setup/pet/general/veterinary',
    component: SetupPetGeneralVeterinaryIndex
  },
  {
    path     : '/setup/pet/kind',
    component: SetupPetKindIndex
  },
  {
    path     : '/setup/pet/medication',
    component: SetupPetMedicationIndex
  },
  {
    path     : '/setup/pet/medication/measurement',
    component: SetupPetMedicationMeasurementIndex
  },
  {
    path     : '/setup/pet/medication/report-status',
    component: SetupPetMedicationReportStatusIndex
  },
  {
    path     : '/setup/report-card-setup/day-service',
    component: DayServiceReportCardSetup
  },

  {
    path     : '/setup/report-card-setup/boarding',
    component: BoardingReportCardSetup
  },
  {
    path     : '/setup/report-card-setup/training',
    component: TrainingReportCardSetup
  },
  {
    path     : '/setup/report-card-setup/grooming',
    component: GroomingReportCardSetup
  },
  {
    path     : '/setup/pet/medication/setting',
    component: SetupPetMedicationSettingIndex
  },
  {
    path     : '/setup/pet/medication/time',
    component: SetupPetMedicationTimeIndex
  },
  {
    path     : '/setup/pet/medication/type',
    component: SetupPetMedicationTypeIndex
  },
  {
    path     : '/setup/pet/medication/unit',
    component: SetupPetMedicationUnitIndex
  },
  {
    path     : '/setup/pet/vaccination/setting',
    component: SetupPetVaccinationSettingIndex
  },
  {
    path     : '/setup/pet/vaccination/type',
    component: SetupPetVaccinationTypeIndex
  },
  {
    path     : '/setup/settings/booarding-pricing',
    component: SetupBoardingPricingIndex
  },
  {
    path     : '/setup/settings/booarding-settings/activity',
    component: SetupBoardingGeneralActivityIndex
  },
  {
    path     : '/setup/settings/booarding-settings/belonging',
    component: SetupBoardingGeneralBelongingIndex
  },
  {
    path     : '/setup/settings/booarding-settings/reservation',
    component: SetupBoardingGeneralReservationIndex
  },
  {
    path     : '/setup/settings/booarding-settings/service-type',
    component: SetupBoardingGeneralServiceTypeIndex
  },
  {
    path     : '/setup/settings/booarding-settings',
    component: SetupBoardingGeneralSettingIndex
  },
  {
    path     : '/setup/capacity/boarding/area',
    component: SetupCapacityBoardingAreaIndex
  },
  {
    path     : '/setup/capacity/boarding/kennel',
    component: SetupCapacityBoardingKennelIndex
  },
  {
    path     : '/setup/capacity/boarding/setting',
    component: SetupCapacityBoardingSettingIndex
  },
  {
    path     : '/setup/capacity/boarding/type',
    component: SetupCapacityBoardingTypeIndex
  },
  {
    path     : '/setup/capacity/appointment/role',
    component: SetupCapacityAppointmentRoleIndex
  },
  {
    path     : '/setup/capacity/appointment/setting',
    component: SetupCapacityAppointmentSettingIndex
  },
  {
    path     : '/setup/capacity/appointment/specialist',
    component: SetupCapacityAppointmentSpecialistIndex
  },
  {
    path     : '/setup/capacity/service/custom',
    component: SetupCapacityCustomCapacityIndex
  },
  {
    path     : '/setup/capacity/service/reservation',
    component: SetupCapacityServiceReservationIndex
  },
  {
    path     : '/setup/capacity/service/service-group',
    component: SetupCapacityServiceServiceGroupIndex
  },
  {
    path     : '/setup/capacity/service/service-type',
    component: SetupCapacityServiceServiceTypeIndex
  },
  {
    path     : '/setup/capacity/service/setting',
    component: SetupCapacityServiceSettingIndex
  },
  {
    path     : '/setup/capacity/service/total-facility',
    component: SetupCapacityServiceTotalFacilityIndex
  },
  {
    path     : '/setup/capacity/service/yard-capacity',
    component: SetupCapacityServiceYardCapacityIndex
  },
  {
    path     : '/setup/settings/day-service/reservation',
    component: SetupDayServiceGeneralReservationIndex
  },
  {
    path     : '/setup/settings/day-service/service-type',
    component: SetupDayServiceGeneralServiceTypeIndex
  },
  {
    path     : '/setup/settings/day-service',
    component: SetupDayServiceGeneralSettingIndex
  },
  {
    path     : '/setup/settings/grooming/reservation',
    component: SetupGroomingGeneralReservationIndex
  },
  {
    path     : '/setup/settings/grooming/service-option',
    component: SetupGroomingGeneralServiceOptionIndex
  },
  {
    path     : '/setup/settings/grooming/service-type',
    component: SetupGroomingGeneralServiceTypeIndex
  },
  {
    path     : '/setup/settings/grooming',
    component: SetupGroomingGeneralSettingIndex
  },
  {
    path     : '/setup/service/reservation/boarding-activity',
    component: SetupServiceReservationBoardingActivityIndex
  },
  {
    path     : '/setup/service/reservation/group-class',
    component: SetupServiceReservationGroupClassIndex
  },
  {
    path     : '/setup/service/reservation/group-class/session',
    component: SetupServiceReservationGroupClassSessionIndex
  },
  {
    path     : '/setup/service/group',
    component: SetupServiceGroupIndex
  },
  {
    path     : '/setup/service/type',
    component: SetupServiceTypeIndex
  },
  {
    path     : '/setup/service/package/day-services',
    component: SetupServicePackageDayServices
  },
  {
    path     : '/setup/add-on/general/add-on',
    component: SetupAddOnGeneralAddOnIndex
  },
  {
    path     : '/setup/settings',
    component: SettingsServiceIndex
  },
  {
    path     : '/setup/service/reservation',
    component: SetupServiceReservationIndex
  },
  {
    path     : '/setup/training/command',
    component: SetupTrainingCommandIndex
  },
  {
    path     : '/setup/settings/training/group-class',
    component: SetupTrainingGeneralGroupClassIndex
  },
  {
    path     : '/setup/settings/training/session',
    component: SetupTrainingGeneralGroupClassSessionIndex
  },
  {
    path     : '/setup/settings/training/reservation',
    component: SetupTrainingGeneralReservationIndex
  },
  {
    path     : '/setup/settings/training/service-type',
    component: SetupTrainingGeneralServiceTypeIndex
  },
  {
    path     : '/setup/settings/training',
    component: SetupTrainingGeneralSettingIndex
  },
  {
    path     : '/setup/training/method',
    component: SetupTrainingMethodIndex
  },
  {
    path     : '/setup/training/rating-key',
    component: SetupTrainingRatingKeyIndex
  },
  {
    path     : '/setup/training/reason',
    component: SetupTrainingReasonIndex
  },
  {
    path     : '/setup/report-sheet-setting',
    component: ReportSheetSetting
  },
  {
    path     : '/setup/service-setting',
    component: ServiceSetting
  },
  {
    path     : '/setup/financial/invoice/services-activities',
    component: SetupFinancialInvoiceServicesIndex
  },
  {
    path     : '/setup/financial/invoice/add-ons',
    component: SetupFinancialInvoiceAddOnsIndex
  },
  {
    path     : '/setup/financial/invoice/packages',
    component: SetupFinancialInvoicePackagesIndex
  },
  {
    path     : '/setup/financial/invoice/feeding-meds',
    component: SetupFinancialInvoiceFeedingIndex
  },
  {
    path     : '/setup/financial/invoice/surcharges',
    component: SetupFinancialInvoiceSurchargesIndex
  },
  {
    path     : '/online-request',
    component: OnlineRequests
  },
  {
    path     : '/online-request/client-submission',
    component: ClientSubmission
  },
  {
    path     : '/online-request/confirm-reservation',
    component: ConfirmReservations
  },
  {
    path     : '/online-request/cancellation-log',
    component: CancellationsLogs
  },
  {
    path     : '/online-request/declined-client',
    component: DeclinedClients
  },
  {
    path     : '/online-request/vaccination-update',
    component: VaccinationsUpdate
  },
  {
    path     : '/custom-report',
    component: CustomReport
  },

  {
    path     : '/employee',
    component: Employee
  },
  {
    path     : '/employee/show/:id',
    component: EmployeeShow
  },
  {
    path     : '/employee/edit/:id',
    component: EmployeeEdit
  },
  {
    path     : '/employee-title',
    component: EmployeeTitle
  },
  {
    path     : '/setup/agreement',
    component: Agreement
  },
  {
    path     : '/setup/agreement/create',
    component: AgreementCreate
  },
  {
    path     : '/setup/agreement/:id',
    component: AgreementCreate
  },
  {
    path     : '/setup/location',
    component: Location
  },
  {
    path     : '/setup/document-type',
    component: DocumentType
  },
  {
    path     : '/setup/calendar',
    component: Calendar
  },
  {
    path     : '/organization',
    component: Organization
  },
  {
    path     : '/organization/:organization',
    component: OrganizationShow
  },
  {
    path     : '/organization/:organization/edit',
    component: OrganizationEdit
  },
  {
    path     : '/setup/rating-key',
    component: RatingKey
  },
  {
    path     : '/setup/training-command',
    component: TrainingCommand
  },
  {
    path     : '/setup/training-method',
    component: TrainingMethod
  },
  // {
  //   path     : '/training-questionnaire/client/:clientId/pet/:petId',
  //   component: TrainingQuestionnaire
  // },
  {
    path     : '/setup/training-reason',
    component: TrainingReason
  },
  {
    path     : '/transaction',
    component: Transaction
  },
  // {
  //   path     : '/program-evaluation',
  //   component: ProgramEvaluation
  // },
  // {
  //   path     : '/program-evaluation/add',
  //   component: ProgramEvaluationAdd
  // },
  // {
  //   path     : '/program-evaluation/:programevaluation',
  //   component: ProgramEvaluationDetail
  // },
  // {
  //   path     : '/proposal',
  //   component: Proposal
  // },
  // {
  //   path     : '/proposal/add',
  //   component: ProposalAdd
  // },
  // {
  //   path     : '/proposal/:proposal',
  //   component: ProposalDetail
  // },
  // {
  //   path     : '/served-area/:servedarea',
  //   component: ServedAreaDetail
  // },
  {
    path     : '/user',
    component: User
  }
]

const routes = [
  ...publicRoutes.map(route => ({ ...route, auth: false, exact: true })),
  ...privateRoutes.map(route => ({ ...route, auth: true, exact: true })),
  // Error Handler
  {
    path     : '',
    auth     : false,
    component: Error404,
    exact    : true
  }
]

export default routes

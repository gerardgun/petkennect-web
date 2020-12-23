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
import AuthMe from '@containers/auth/me'
import Dashboard from '@containers/dashboard'
import DayCampForm from '@containers/day-camp-form'
import ColorCode from '@containers/color-code'
import Client from '@containers/client'
import ClientShow from '@containers/client/show'
import ClientBook from '@containers/client/reservation'
import CustomizedField from '@containers/customized-field'
import Calendar from '@containers/calendar'
import EmailMessage from '@containers/email-message'
import SystemSetting from '@containers/system-setting'
import EmailTemplate from '@containers/email-template'
import Notification from '@containers/notification'
import Location from '@containers/location'
import DocumentType from '@containers/document-type'
import Pet from '@containers/pet'
import PetCreate from '@containers/pet/create'
import PetKind from '@containers/pet-kind'
import PetBreed from '@containers/pet-breed'
import PetIncidentType from '@containers/pet-incident-type'
import PetIncidentAction from '@containers/pet-incident-action'
import PetIncidentBehavior from '@containers/pet-incident-behavior'
import PetRetireReason from '@containers/pet-retire-reason'
import PetVaccinationType from '@containers/pet-vaccination-type'
import PetKennel from '@containers/pet-kennel'
import PetKennelType from '@containers/pet-kennel-type'
import PetKennelArea from '@containers/pet-kennel-area'
import PetYardType from '@containers/pet-yard-type'
import PriceMaster from '@containers/price-master'
import PriceMasterCreate from '@containers/price-master/create'
import Product from '@containers/product'
import ProductCreate from '@containers/product/create/RootProvider'
import ProductAttribute from '@containers/product-attribute'
import ProductAttributeValue from '@containers/product-attribute-value'
import ProductClasses from '@containers/product-classes'
import ProductFamilies from '@containers/product-families'
import ProductFamiliesShow from '@containers/product-families/show'
import Category from '@containers/category'
// import PetBreed from '@containers/product/create'
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
// import FoundationDetail from '@containers/foundation/detail'
import Company from '@containers/company'
import CompanyEdit from '@containers/company/edit'
import CompanyShow from '@containers/company/show'
import Organization from '@containers/organization'
import OrganizationEdit from '@containers/organization/edit'
import OrganizationShow from '@containers/organization/show'
import TrainingCommand from '@containers/training-command'
import TrainingMethod from '@containers/training-method'
import TrainingReason from '@containers/training-reason'
import Transaction from '@containers/transaction'
// import Grant from '@containers/grant'
// import GrantAdd from '@containers/grant/add'
// import GrantDetail from '@containers/grant/detail'
// import Grantee from '@containers/grantee'
// import GranteeAdd from '@containers/grantee/add'
// import GranteeDetail from '@containers/grantee/detail'
// import GranteeFocusAreaDetail from '@containers/grantee/focus_area/detail'
// import ProgramEvaluation from '@containers/program_evaluation'
// import ProgramEvaluationAdd from '@containers/program_evaluation/add'
// import ProgramEvaluationDetail from '@containers/program_evaluation/detail'
// import Proposal from '@containers/proposal'
// import ProposalAdd from '@containers/proposal/add'
// import ProposalDetail from '@containers/proposal/detail'
// import ServedAreaDetail from '@containers/served_area/detail'
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
    path     : '/setup/day-camp-form',
    component: DayCampForm
  },
  {
    path     : '/setup/color-codes',
    component: ColorCode
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
    path     : '/pet/kind',
    component: PetKind
  },
  {
    path     : '/pet/breed',
    component: PetBreed
  },
  {
    path     : '/pet/incident-type',
    component: PetIncidentType
  },
  {
    path     : '/pet/incident-action',
    component: PetIncidentAction
  },
  {
    path     : '/pet/incident-behavior',
    component: PetIncidentBehavior
  },
  {
    path     : '/pet/vaccination-type',
    component: PetVaccinationType
  },
  {
    path     : '/pet/retire-reason',
    component: PetRetireReason
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
    path     : '/product',
    component: Product
  },
  {
    path     : '/product/create',
    component: ProductCreate
  },
  {
    path     : '/product/:id',
    component: ProductCreate
  },
  {
    path     : '/product-attribute',
    component: ProductAttribute
  },
  {
    path     : '/product-attribute-value/:id',
    component: ProductAttributeValue
  },
  {
    path     : '/product-classes',
    component: ProductClasses
  },
  {
    path     : '/product-families',
    component: ProductFamilies
  },
  {
    path     : '/product-families/show/:id',
    component: ProductFamiliesShow
  },
  {
    path     : '/category',
    component: Category
  },
  {
    path     : '/service',
    component: Service
  },
  {
    path     : '/service/create',
    component: ServiceCreate
  },
  {
    path     : '/service/:id',
    component: ServiceCreate
  },
  {
    path     : '/service-attribute',
    component: ServiceAttribute
  },
  {
    path     : '/service-attribute-value/:id',
    component: ServiceAttributeValue
  },
  {
    path     : '/online-request',
    component: OnlineRequests
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
    path     : '/setup/training-command',
    component: TrainingCommand
  },
  {
    path     : '/setup/training-method',
    component: TrainingMethod
  },
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

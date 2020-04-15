// Public Containers
import AuthRecoverAccount from '@containers/auth/recover-account'
import AuthForgotPassword from '@containers/auth/forgot-password'
import AuthSignIn from '@containers/auth/sign-in'
import AuthSignUp from '@containers/auth/sign-up'
import Error404 from '@containers/page/error-404'

// Private Containers
import Me from '@containers/auth/me'
import Dashboard from '@containers/dashboard'
import Client from '@containers/client'
import ClientCreate from '@containers/client/create'
import Company from '@containers/company'
import Organization from '@containers/organization'
import OrganizationCreate from '@containers/organization/create'
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
  // {
  // 	path        : '/about',
  // 	component   : About,
  // },
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
    path     : '/client',
    component: Client
  },
  {
    path     : '/client/create',
    component: ClientCreate
  },
  {
    path     : '/client/:client',
    component: ClientCreate
  },
  {
    path     : '/company',
    component: Company
  },
  {
    path     : '/dashboard',
    component: Dashboard
  },
  {
    path     : '/organization',
    component: Organization
  },
  {
    path     : '/organization/create',
    component: OrganizationCreate
  },
  {
    path     : '/organization/:organization',
    component: OrganizationCreate
  },
  {
    path     : '/transaction',
    component: Transaction
  },
  // {
  //   path     : '/grantee',
  //   component: Grantee
  // },
  // {
  //   path     : '/grantee/add',
  //   component: GranteeAdd
  // },
  // {
  //   path     : '/grantee/:grantee',
  //   component: GranteeDetail
  // },
  // {
  //   path     : '/grantee/focus-area/:focusarea',
  //   component: GranteeFocusAreaDetail
  // },
  {
    path     : '/me',
    component: Me
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

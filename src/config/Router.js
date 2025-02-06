import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useContext } from 'react';

import Dashboard from '../dashboard/Dashboard';
import EmployeeAndAgentDashboard from '../dashboard/EmployeeAndAgentDashboard';

import Login from '../login/Login'

import AddProject from '../addProject/AddProject';
import ViewProject from '../addProject/ViewProject';
import ProjectDetail from '../addProject/ProjectDetail';

import AddRequirment from '../requirment/AddRequirment';
import ViewRequirment from '../requirment/ViewRequirment';
import RequirmentDetail from '../requirment/RequirmentDetail';

import AddUser from '../users/AddUser';
import ViewUser from '../users/ViewUser';

import ViewAvability from '../view_avability/ViewAvability';

import DeveloperAvability from '../developer_avability/DeveloperAvability'
import ViewDeveloperAvability from '../view_avability/ViewDeveloperAvability';
import ViewDescriptionPage from '../view_avability/ViewDescriptionPage';

import OfficeAvability from '../office_avability/OfficeAvability';
import ViewOfficeAvability from '../view_avability/ViewOfficeAvability';
import ViewOfficeAvabilityDescription from '../view_avability/ViewOfficeAvabilityDescription';

import AddTask from '../addTask/AddTask';
import ViewTask from '../addTask/ViewTask';

import Report from '../report/Report';
import RequirementReport from '../AllReports/RequirementReport';
import ProjectReport from '../AllReports/ProjectReport';
import AvaibilityReport from '../AllReports/AvaibilityReport';
import OfficeReport from '../AllReports/OfficeReport';
import ExpenseReport from '../AllReports/ExpenseReport';
import VoucherReport from '../AllReports/VoucherReport';
import BalanceSheet from '../AllReports/BalanceSheet';
import BankBalanceSheet from '../AllReports/BankBalanceSheet';


import ViewExpense from '../expense/ViewExpense';
import AddExpenseModal from '../expense/AddExpenseModal';
import ExpenseDescription from '../expense/ExpenseDescription';
import ViewAssets from '../expense/ViewAssets';
import AssetsDescription from '../expense/AssetsDescription';
import ViewReceivable from '../expense/ViewReceivable';
import ReceivableDescription from '../expense/ReceivableDescription';
import ViewPayable from '../expense/ViewPayable';
import PayableDescription from '../expense/PayableDescription';

import AddSellProperty from '../AddSellProperty';
import ViewSellItem from '../ViewSellItem';

import Liabilities from '../account/Liabilities';
import LiabilitiesDetail from '../account/LiabilitiesDetail';
import AddVoucher from '../account/AddVoucher';
import AddBalance from '../account/AddBalance';
import ViewBalance from '../account/ViewBalance';

import AddOwnRequiremnt from '../own_work/AddOwnRequiremnt';
import AddOwnTask from '../own_work/AddOwnTask';
import AddOwnAvaibility from '../own_work/AddOwnAvaibility';
import ViewOwnRequirment from '../own_work/ViewOwnRequirment';
import ViewOwnAvaibilty from '../own_work/ViewOwnAvaibilty';

import Setting from '../SettingPage/Setting';

import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import { UserContext } from '../components/UserContext'; // Import UserContext

const Router = () => {
  const { user } = useContext(UserContext); // Access user from context

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <Dashboard />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: '/EmployeeAndAgentDashboard',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <EmployeeAndAgentDashboard />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/Login',
      element: <Login />,
    },

    {
      path: '/AddProject',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <AddProject />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/ViewProject',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewProject />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/ProjectDetail/:id',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ProjectDetail />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/AddRequirment',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <AddRequirment />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/ViewRequirment',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewRequirment />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/RequirmentDetail/:id',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <RequirmentDetail />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: '/AddUser',
      element: (
        <>
          <Header />
          {/* <ProtectedRoute user={user}> */}
            <AddUser />
          {/* </ProtectedRoute> */}
        </>
      ),
    },

    {
      path: '/ViewUser',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewUser />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/ViewAvability',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewAvability />
          </ProtectedRoute>
        </>
      ),
    },
  
  

    {
      path: '/DeveloperAvability',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <DeveloperAvability />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/ViewDeveloperAvability',
      element: (
        <>
          {/* <Header /> */}
          {/* <ProtectedRoute user={user}> */}
            <ViewDeveloperAvability />
          {/* </ProtectedRoute> */}
        </>
      ),
    },
    {
      path: '/ViewDescriptionPage/:id',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewDescriptionPage />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/OfficeAvability',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <OfficeAvability />
          </ProtectedRoute>
        </>
      ),
    },

    
    {
      path: '/ViewOfficeAvability',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewOfficeAvability />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/ViewOfficeAvabilityDescription/:id',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewOfficeAvabilityDescription />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: '/AddTask',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <AddTask />
          </ProtectedRoute>
        </>
      ),
    },
    {
      path: '/ViewTask',
      element: (
        <>
          <Header />
          <ProtectedRoute user={user}>
            <ViewTask />
          </ProtectedRoute>
        </>
      ),
    },

    {
      path: '/Report',
      element: (
        <>
          {/* <Header /> */}
            <Report />
        </>
      ),
    },

    {
      path: '/RequirementReport',
      element: (
        <>
          {/* <Header /> */}
            <RequirementReport />
        </>
      ),
    },
    {
      path: '/ProjectReport',
      element: (
        <>
          {/* <Header /> */}
            <ProjectReport />
        </>
      ),
    },

    {
      path: '/AvaibilityReport',
      element: (
        <>
          {/* <Header /> */}
            <AvaibilityReport />
        </>
      ),
    },
    {
      path: '/OfficeReport',
      element: (
        <>
          {/* <Header /> */}
            <OfficeReport />
        </>
      ),
    },
    {
      path: '/ExpenseReport',
      element: (
        <>
          {/* <Header /> */}
            <ExpenseReport />
        </>
      ),
    },
    {
      path: '/BalanceSheet',
      element: (
        <>
          {/* <Header /> */}
            <BalanceSheet />
        </>
      ),
    },

    {
      path: '/BankBalanceSheet',
      element: (
        <>
          {/* <Header /> */}
            <BankBalanceSheet />
        </>
      ),
    },

    {
      path: '/VoucherReport',
      element: (
        <>
          {/* <Header /> */}
            <VoucherReport />
        </>
      ),
    },

    {
      path: '/ViewExpense',
      element: (
        <>
          {/* <Header /> */}
            <ViewExpense />
        </>
      ),
    },

    {
      path: '/ExpenseDescription/:id',
      element: (
        <>
          {/* <Header /> */}
            <ExpenseDescription />
        </>
      ),
    },

    {
      path: '/ViewAssets',
      element: (
        <>
          {/* <Header /> */}
            <ViewAssets />
        </>
      ),
    },

    {
      path: '/AssetsDescription/:id',
      element: (
        <>
          {/* <Header /> */}
            <AssetsDescription />
        </>
      ),
    },

    {
      path: '/ViewReceivable',
      element: (
        <>
          {/* <Header /> */}
            <ViewReceivable />
        </>
      ),
    },

    {
      path: '/ReceivableDescription/:id',
      element: (
        <>
          {/* <Header /> */}
            <ReceivableDescription />
        </>
      ),
    },

    {
      path: '/ViewPayable',
      element: (
        <>
          {/* <Header /> */}
            <ViewPayable />
        </>
      ),
    },

    {
      path: '/PayableDescription/:id',
      element: (
        <>
          {/* <Header /> */}
            <PayableDescription />
        </>
      ),
    },



    {
      path: '/AddExpenseModal',
      element: (
        <>
          {/* <Header /> */}
            <AddExpenseModal />
        </>
      ),
    },

    {
      path: '/AddSellProperty',
      element: (
        <>
          {/* <Header /> */}
            <AddSellProperty />
        </>
      ),
    },

    {
      path: '/ViewSellItem',
      element: (
        <>
          {/* <Header /> */}
            <ViewSellItem />
        </>
      ),
    },

    {
      path: '/Liabilities',
      element: (
        <>
          {/* <Header /> */}
            <Liabilities />
        </>
      ),
    },

    {
      path: '/LiabilitiesDetail/:employeeId',
      element: (
        <>
          {/* <Header /> */}
            <LiabilitiesDetail />
        </>
      ),
    },

    {
      path: '/AddVoucher',
      element: (
        <>
          {/* <Header /> */}
            <AddVoucher />
        </>
      ),
    },

    {
      path: '/AddBalance',
      element: (
        <>
          {/* <Header /> */}
            <AddBalance />
        </>
      ),
    },
    {
      path: '/ViewBalance',
      element: (
        <>
          {/* <Header /> */}
            <ViewBalance />
        </>
      ),
    },

    {
      path: '/ViewOwnRequirment',
      element: (
        <>
          {/* <Header /> */}
            <ViewOwnRequirment />
        </>
      ),
    },
    {
      path: '/ViewOwnAvaibilty',
      element: (
        <>
          {/* <Header /> */}
            <ViewOwnAvaibilty />
        </>
      ),
    },
    {
      path: '/AddOwnRequiremnt',
      element: (
        <>
          {/* <Header /> */}
            <AddOwnRequiremnt />
        </>
      ),
    },
    {
      path: '/AddOwnTask',
      element: (
        <>
          {/* <Header /> */}
            <AddOwnTask />
        </>
      ),
    },
    {
      path: '/AddOwnAvaibility',
      element: (
        <>
          {/* <Header /> */}
            <AddOwnAvaibility />
        </>
      ),
    },

    {
      path: '/Setting',
      element: (
        <>
          {/* <Header /> */}
            <Setting />
        </>
      ),
    },
  ]);

  
  return <RouterProvider router={router} />;
};

export default Router;

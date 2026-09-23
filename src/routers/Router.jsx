import { createBrowserRouter } from 'react-router';
import Root from './../layout/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AllJobs from './../pages/AllJobs';
import JobDetails from '../pages/JobDetails';
import MyApplyed from '../pages/MyApplyed';
import Apply from '../pages/Apply';
import UserProfile from '../pages/UserProfile';
import ChangePassword from '../pages/ChangePassword';
import AdminLayout from '../layout/AdminLayout';
import CreateJob from '../pages/admin/CreateJob';
import ManageJobs from '../pages/admin/ManageJobs';
import EditJob from '../pages/admin/EditJob';
import Applications from '../pages/admin/Applications';
import PrivateRoutes from './PrivateRoutes';
import HrProtected from './HrProtected';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:"/login",
        element:<Login></Login>
      },
      {
        path:"/signup",
        element:<SignUp></SignUp>
      },
      {
        path:"/alljobs",
        element:<AllJobs></AllJobs>
      },
      {
        path:"/jobdetails/:id",
        element:<PrivateRoutes><JobDetails></JobDetails></PrivateRoutes>
      },
      {
        path:"/apply",
        element:<PrivateRoutes><MyApplyed></MyApplyed></PrivateRoutes>
      },
      {
        path:"/apply/:id",
        element:<PrivateRoutes><Apply></Apply></PrivateRoutes>
      },
      {
        path:"/profile",
        element:<PrivateRoutes><UserProfile></UserProfile></PrivateRoutes>
      },
      {
        path:"/change-password",
        element:<PrivateRoutes><ChangePassword></ChangePassword></PrivateRoutes>
      }
    ]
  },
  {
    path:"/hr",
    element:<HrProtected><AdminLayout></AdminLayout></HrProtected>,
    children:[
      {
        path:'create-job',
        element:<CreateJob/>
      },
      {
        path:'manage-jobs',
        element:<ManageJobs/>
      },
      {
        path:'edit-job/:id',
        element:<EditJob/>
      },
      {
        path:'applications',
        element:<Applications/>
      }
    ]
  }
]);

export default router
import { createBrowserRouter } from 'react-router';
import Root from './../layout/Root';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import BrowseBook from '../pages/BrowseBook';
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
        path:"/browsebook",
        element:<BrowseBook></BrowseBook>
      }
    ]
  },
]);

export default router
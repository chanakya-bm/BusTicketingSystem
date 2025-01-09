import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "../Pages/Auth/Auth";
import Home from "../Pages/Home/Home";
import Create from "../Pages/Create/Create";
import View from "../Pages/ViewDetails/View";
import MyBookings from "../Pages/MyBookings";
// eslint-disable-next-line react/prop-types
const RoutesComponent = ({ isAuthenticated }) => {
  const role = localStorage.getItem("role");
  const routesConfig = [
    {
      path: "/",
      component: <Home />,
      roles:["A","U"],
    },
    {
      path:"/create",
      component: <Create />,
      roles:["A"],
    },
    {
      path:"/bookings",
      component:<MyBookings />,
      roles:["U"]
    },
    {
      path:"/view/:id",
      component: <View />,
      roles:["A","U"]
    },
  ];
  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }
  return (
    <Routes>
      {routesConfig.map((route, index) =>
        route.roles?.includes(role) ? (
          <Route key={index} path={route.path} element={route.component} />
        ) : null
      )}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default RoutesComponent;
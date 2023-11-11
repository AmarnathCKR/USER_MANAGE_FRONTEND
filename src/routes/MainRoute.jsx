import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { subscribeAdminToken, subscribeAllData, subscribeToken, subscribeUser } from "../store";
import SignUp from "../pages/user/SignUp";
import Login from "../pages/user/Login";
import Home from "../pages/user/Home";
import Profile from "../pages/user/Profile";
import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MyFeed from "../pages/user/MyFeed";

function MainRoute() {
    const dispatch = useDispatch();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    const localUser = JSON.parse(localStorage.getItem("userData"));
    const localAdmin = localStorage.getItem("admin-token");
    const allUser = JSON.parse(localStorage.getItem("all-user"));
    if (localToken) {
      
      dispatch(subscribeToken(localToken));
      dispatch(subscribeUser(localUser));
    }
    if (localAdmin) {
      dispatch(subscribeAdminToken(localAdmin));
      dispatch(subscribeAllData(allUser));
    }
  }, []);

  const user = useSelector((state) => state.token);
  const admin = useSelector((state) => state.adminToken);
  return (
    <>
      <Routes>
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/myfeed"
          element={user ? <MyFeed /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin-login"
          element={!admin ? <AdminLogin /> : <Navigate to="/admin-home" />}
        />
        <Route
          path="/admin-home"
          element={admin ? <AdminDashboard /> : <Navigate to="/admin-login" />}
        />
      </Routes>
    </>
  );
}

export default MainRoute;

// // src/routes/Protectedroute.jsx


// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = ({ role }) => {
//   const { isAuthenticated, token, user } = useSelector(
//     (state) => state.instructorAuth // adjust if you later merge auth slices
//   );

//   if (!isAuthenticated || !token) {
//     return <Navigate to="/instructor-signin" replace />;
//   }

//   // Role-based protection (future-proofing)
//   if (role && user?.role !== role) {
//     return <Navigate to="/" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;



















// import { Navigate, Outlet } from "react-router-dom";
// import { useSelector } from "react-redux";

// const ProtectedRoute = () => {
//   const { isAuthenticated, token } = useSelector((state) => state.instructorAuth);
  

//   if (!isAuthenticated || !token) return <Navigate to="/instructor-signin" replace />;


  // return <Outlet />; // <-- renders nested routes
// };

// export default ProtectedRoute;


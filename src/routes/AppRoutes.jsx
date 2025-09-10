import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../pages/Auth/Signup';
import Signin from '../pages/Auth/Signin';
import Home from '../pages/Common/Home';
import InstructorSignin from '../pages/Auth/InstructorSignin';
import InstructorSignup from '../pages/Auth/InstructorSignup';
import InstructorhomePage from '../pages/Instructor/InstructorhomePage';
import AddCourse from '../pages/Instructor/AddCourse';
import UserManagement from '../pages/Instructor/UserManagement/UserManagement';
import InstructorProtectedRoute from "./InstructorProtectedRoute";
import StudentProtectedRoute from "./StudentProtectedRoute";
import StudentDetails from '../pages/Instructor/UserManagement/StudentDetails';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/student-signin" element={<Signin />} />
      <Route path="/student-signup" element={<Signup />} />
      <Route path="/instructor-signin" element={<InstructorSignin />} />
      <Route path="/instructor-signup" element={<InstructorSignup />} />

      {/* Student Protected Routes */}
      <Route element={<StudentProtectedRoute />}>
        <Route path="/student/home" element={<h1>Student Home</h1>} />
        {/* later add student pages */}
      </Route>


      

      {/* Instructor Protected Routes */}
      <Route element={<InstructorProtectedRoute />}>
        <Route path="/instructor/home" element={<InstructorhomePage />} />
        <Route path="/instructor/add-course" element={<AddCourse />} />
        <Route path="/instructor/user-management" element={<UserManagement />} />
        <Route
          path="/instructor/user-management/:studentId"
          element={<StudentDetails />}
        />
      </Route>

      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;

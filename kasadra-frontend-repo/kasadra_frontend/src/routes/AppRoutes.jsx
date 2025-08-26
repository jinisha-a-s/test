import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from '../pages/Auth/Signup';
import Signin from '../pages/Auth/Signin';
import Home from '../pages/Common/Home';
import InstructorSignin from '../pages/Auth/InstructorSignin';
import InstructorSignup from '../pages/Auth/InstructorSignup';
const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/student-signin" element={<Signin />} />
            <Route path="/student-signup" element={<Signup />} />
            <Route path="/instructor-signin" element={<InstructorSignin />} />
            <Route path="/instructor-signup" element={<InstructorSignup />} />

        </Routes>
    );
};

export default AppRoutes;

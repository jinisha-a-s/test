import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
import instructorAuthReducer from '../features/auth/instructorAuthSlice.js';
import instructorProfileReducer from '../features/auth/instructorProfileslice.js';
import usersReducer from '../features/Instructor/UserManagement/allUserSlice.js';
import studentReducer from '../features/Instructor/UserManagement/studentDetailsSlice.js';


export const store = configureStore({
    reducer: {

        auth: authReducer,
        users: usersReducer,
        instructorAuth: instructorAuthReducer,
        instructorProfile: instructorProfileReducer,
        student: studentReducer,

    },
});

export default store;
// src/features/auth/instructorAuthSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerInstructorAPI } from '../../api/auth.js';

// Async thunk for instructor registration
export const registerInstructor = createAsyncThunk(
    'instructor/registerInstructor',
    async (formData, thunkAPI) => {
        try {
            const response = await registerInstructorAPI(formData);
            return response; // expected API response data
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail?.message || 'Registration failed'
            );
        }
    }
);

// Instructor auth slice

const instructorAuthSlice = createSlice({
    name: 'instructorAuth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearInstructorRegistrationState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerInstructor.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerInstructor.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(registerInstructor.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            });
    },
});

export const { clearInstructorRegistrationState } = instructorAuthSlice.actions;
export default instructorAuthSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { registerStudentAPI,loginStudentAPI } from '../../api/auth.js';

// Async thunk for student registration

export const registerStudent = createAsyncThunk(
    'auth/registerStudent',
    async (formData, thunkAPI) => {
        try {
            const response = await registerStudentAPI(formData);
            return response; // Expected to be response.data from API
        } catch (error) {
            // Return a readable error message
            return thunkAPI.rejectWithValue(
                error.response?.data?.detail?.message || 'Registration failed'
            );

        }
    }
)
// Async thunk for student login

export const loginStudent = createAsyncThunk(
    'auth/loginStudent',
    async (formData, thunkAPI) => {
    try {
      const response = await loginStudentAPI(formData);
      
      // ✅ Save token to localStorage
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail?.message || 'Login failed'
      );
    }
  }
    
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        clearAuthState: (state) => {
            state.user = null;
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(registerStudent.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = true;
            })
            .addCase(registerStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.success = false;
            })
            
            // LOGIN
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.success = true;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
    },

});


export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
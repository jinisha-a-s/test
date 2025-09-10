// src/features/student/studentSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getStudentDetailsAPI } from "../../../api/Instructor/UserManagement/studentDetailsAPI.js";

// Thunk
export const fetchStudentDetails = createAsyncThunk(
    "student/fetchDetails",
    async (studentId, { rejectWithValue }) => {
        try {
            return await getStudentDetailsAPI(studentId);
        } catch (err) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const studentSlice = createSlice({
    name: "student",
    initialState: {
        details: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStudentDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchStudentDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
            })
            .addCase(fetchStudentDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default studentSlice.reducer;

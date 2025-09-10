import React, { useEffect } from "react";
import "../../../styles/Instructor/UserManagement/StudentDetails.css";
import Instructornavbar from "../../../components/Instructornavbar";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentDetails } from "../../../features/Instructor/UserManagement/studentDetailsSlice.js";
import Spinner from "../../../components/Spinner";


const StudentDetails = () => {
  const { studentId } = useParams();
  const dispatch = useDispatch();
  const { details, loading, error } = useSelector((state) => state.student);

  useEffect(() => {
    if (studentId) {
      dispatch(fetchStudentDetails(studentId));
    }
  }, [studentId, dispatch]);

  if (loading) return <Spinner />;

  // ✅ Fix: error might be an object, so show message safely
  if (error) return <p className="error-text">Error: {error.message || error}</p>;


  // ✅ Guard: if no details yet
  if (!details) return <p>No student details found</p>;

  return (
    <div className="student-details-container">
      <Instructornavbar />
      <div className="student-details-body">
        <div className="student-details-header">
          <h2 className="student-details-title">Student Details</h2>
        </div>
        <div className="student-details-card">
          <div className="student-details-card-body">
            <div className="student-details-row">
              <span className="student-details-label">ID:</span>
              <span className="student-details-value">{details.id}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Name:</span>
              <span className="student-details-value">{details.name}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Email:</span>
              <span className="student-details-value">{details.email}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Phone:</span>
              <span className="student-details-value">{details.phone_no || "N/A"}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Registered on:</span>
              <span className="student-details-value">{details.created_at || "N/A"}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Status:</span>
              <span className="student-details-value">{details.status|| "N/A"}</span>
            </div>

            <div className="student-details-row">
              <span className="student-details-label">Assigned Course:</span>
              <span className="student-details-value">{details.course || "N/A"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;

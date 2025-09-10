// import React from "react";
// import { useEffect } from "react";
// import Instructornavbar from "../../components/Instructornavbar";
// import { FaUsers, FaBook, FaChalkboardTeacher, FaBroadcastTower } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { getInstructorProfileAPI } from "../../api/auth.js"; // your API call
// import { useDispatch,useSelector } from "react-redux";
// import { fetchInstructorProfile } from "../../features/auth/instructorProfileSlice";
// import "../../styles/Instructor/Instructorhome.css"; // optional CSS

// const InstructorhomePage = () => {
//   const [instructor, setInstructor] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await getInstructorProfileAPI(); // API returns all instructors
//         const instructorId = parseInt(localStorage.getItem("instructorId"));
//         const loggedInInstructor = response.detail.data.find(
//           (inst) => inst.id === instructorId
//         );
//         setInstructor(loggedInInstructor);
//       } catch (error) {
//         console.error("Failed to fetch profile:", error);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (!instructor) return <p>Loading...</p>;



 
//     return (
        
//         <div>
//             <Instructornavbar />
//             <div className="container">
//                 <h3>Welcome !</h3>
//                  <p><strong>Name:</strong> {profile?.Name}</p>  

//                 <div className="card-grid">
//                     <Link to="/user-management" className="card">
//                         <FaUsers className="card-icon" />
//                         <span>User Management</span>
//                     </Link>

//                     <Link to="/add-course" className="card">
//                         <FaBook className="card-icon" />
//                         <span>Add Course</span>
//                     </Link>

//                     <Link to="/assign-batch" className="card">
//                         <FaChalkboardTeacher className="card-icon" />
//                         <span>Assign Batch</span>
//                     </Link>

//                     <Link to="/live-class-update" className="card">
//                         <FaBroadcastTower className="card-icon" />
//                         <span>Live Class Update</span>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default InstructorhomePage;   


import React, { useEffect } from "react";
import Instructornavbar from "../../components/Instructornavbar";
import { FaUsers, FaBook, FaChalkboardTeacher, FaBroadcastTower } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchInstructorProfile } from "../../features/auth/instructorProfileslice";
import "../../styles/Instructor/Instructorhome.css";

const InstructorhomePage = () => {
  const dispatch = useDispatch();

  // ✅ Get instructor from Redux store
  const { profile: instructor, loading, error } = useSelector(
    (state) => state.instructorProfile
  );

  useEffect(() => {
    dispatch(fetchInstructorProfile());
  }, [dispatch]);

//   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  console.log(instructor);


  return (
    <div>
      <Instructornavbar />
      <div className="containers">
        <h3>Welcome!</h3>
        <p className="instructor-profile-name" style={{color: "black" }}> {instructor?.name}</p>  

        <div className="card-grid">
          <Link to="/instructor/user-management" className="card">
            <FaUsers className="card-icon" />
            <span>User Management</span>
          </Link>

          <Link to="/instructor/add-course" className="card">
            <FaBook className="card-icon" />
            <span>Add Course</span>
          </Link>

          <Link to="/assign-batch" className="card">
            <FaChalkboardTeacher className="card-icon" />
            <span>Assign Batch</span>
          </Link>

          <Link to="/live-class-update" className="card">
            <FaBroadcastTower className="card-icon" />
            <span>Live Class Update</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InstructorhomePage;


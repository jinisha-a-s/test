// src/pages/Auth/InstructorSignin.jsx

import React, { useState } from 'react';
import '../../styles/Student/Signin.css';  // Create a separate CSS for instructor if needed
import loginImage from '../../assets/signup.jpg'; // You can use same image or another
import SigninToggle from '../../components/SigninToggle';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { loginInstructor } from '../../features/auth/instructorAuthSlice'; // Instructor login slice
import PasswordInput from '../../components/PasswordInput'; // Same PasswordInput component

const InstructorSignin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Instructor Login submitted with data:", formData);

    const { email, password } = formData;

    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      setSuccessMessage('');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address');
      setSuccessMessage('');
      return;
    }
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError('Password must be strong');
      return;
    }

    // Dispatch the instructor login action
    dispatch(loginInstructor(formData))
      .unwrap()
      .then((res) => {
        setSuccessMessage('Login successful!');
        console.log('Instructor Login Data:', res);
        setError('');
      })
      .catch((err) => {
        setError(err || 'Login failed');
        console.error('Login error:', err);
        setTimeout(() => setError(''), 5000);
      });
  };

  return (
    <div className="login-container-signin">
      <div className="login-mainbox">

        {/* Image Section */}
        <div className="login-right-image">
          <img src={loginImage} alt="Instructor Login" className="login-image" />
        </div>

        {/* Form Section */}
        <div className="login-right">
          <div className="login-right-header">
            <SigninToggle />
          </div>
          <div className="login-right-body-box">
            <p className="login-title">Instructor Login</p>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="login-form-input">
                <input
                  type="email"
                  data-testid="input-email"
                  placeholder="Enter Email"
                  className="login-input-field"
                  name="email"
                  onChange={handleChange}
                  value={formData.email}
                />
                <PasswordInput
                  name="password"
                  dataTestId="input-password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
              <div className="login-forgot-password">
                <Link to="/instructor-forgot-password">Forgot password</Link>
              </div>
              <button className="login-btn-submit" data-testid="submit-button" type="submit">
                Sign in
              </button>
              <hr className="login-line" />
            </form>

            {error && (
              <p className="login-error-message">⚠️ {error}</p>
            )}
            {successMessage && (
              <p className="login-success-message">🎉 {successMessage}</p>
            )}

            <p className="login-footer-text">
              New here?{" "}
              <Link to="/instructor-signup" className="login-signin-link">
                <b>Register now.</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSignin;

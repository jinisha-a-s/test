import React, { useState } from 'react';
import '../../styles/Student/Signin.css'; // Use your Login CSS file
import loginImage from '../../assets/signup.jpg'; // Use your login illustration
import SigninToggle from '../../components/SigninToggle';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginStudent } from '../../features/auth/authSlice';
import PasswordInput from '../../components/PasswordInput'; // Import the PasswordInput component

const Signin = () => {
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
      setError('Password must be strong ');
      return;
    }
    // Dispatch the login action here
    dispatch(loginStudent(formData))
      .unwrap()
      .then((res) => {
        setSuccessMessage('Login successful!');
        console.log('Login Data:', res);
        setError('');
      })
      .catch((err) => {
        setError(err || 'Login failed');
        console.error('Login error:', err);
        setTimeout(() => setError(''), 5000);
      });


    // setError('');
    // setSuccessMessage('Login successful!');
    // console.log('Login Data:',formData);
  };

  return (
    <div className="login-container-signin">
      <div className="login-mainbox">

        {/* Image Section */}
        <div className="login-right-image">
          <img src={loginImage} alt="Login" className="login-image" />
        </div>

        {/* Form Section */}
        <div className="login-right">
          <div className="login-right-header">
            <SigninToggle />
            {/* Or use static buttons:
            <button className="signup-btn-student">Student</button>
            <button className="signup-btn-instructor">Instructor</button>
            */}
          </div>
          <div className="login-right-body-box">
            <p className="login-title">Login</p>
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
                {/* <input
                  type="password"
                  placeholder="Enter Password"
                  className="login-input-field"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                /> */}
              </div>
              <div className="login-forgot-password">
                <Link to="/forgot-password">Forgot password</Link>
              </div>
              <button className="login-btn-submit" data-testid="submit-button" type="submit">
                Sign in
              </button>
              <p></p>
              <hr className='login-line' />
            </form>

            {error && (
              <p className="login-error-message">⚠️ {error}</p>
            )}
            {successMessage && (
              <p className="login-success-message">🎉 {successMessage}</p>
            )}

            <p className="login-footer-text">
              New here?{" "}
              <Link to="/student-signup" className="login-signin-link">
                <b>Register now.</b>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;

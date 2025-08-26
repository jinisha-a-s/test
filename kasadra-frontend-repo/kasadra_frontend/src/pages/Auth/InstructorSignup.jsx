import React, { useState } from 'react';
import ToggleButton from '../../components/ToggleButton';
import signupImage from '../../assets/signup.jpg';
import '../../styles/Student/Signup.css';
import { useDispatch } from 'react-redux';
import { registerInstructor } from '../../features/auth/instructorAuthSlice';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/PasswordInput'; // Import the PasswordInput component`

const InstructorSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_no: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, phone_no, password, confirm_password } = formData;

    if (!name || !email || !phone_no || !password || !confirm_password) {
      setError('Please fill all the fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Enter a valid email address');
      return;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone_no)) {
      setError('Enter a valid 10-digit phone number');
      return;
    }

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!strongPasswordRegex.test(password)) {
      setError(
        'Password must be at least 8 characters, include uppercase, lowercase, number & special character'
      );
      return;
    }

    if (password !== confirm_password) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    setSuccessMessage('Registration successful!');

    dispatch(registerInstructor(formData))
      .unwrap()
      .then((res) => {
        console.log('Registration success:', res);
        setSuccessMessage('Registration successful!');
        setError('');
        // navigate('/instructor/dashboard');
      })
      .catch((err) => {
        // setError(err || 'Registration failed. Please try again.');
        console.error('Registration error:', err);
        setError(err || 'Please try again.');
        setTimeout(() => setError(''), 5000);
      });
  };

  return (
    <div className='signup-container'>
      <div className='signup-mainbox'>
        <div className='signup-left'>
          <img src={signupImage} alt="Signup" className='signup-image' />
        </div>

        <div className='signup-right'>
          <div className='signup-right-header'>
            <ToggleButton />
          </div>

          <div className='signup-right-body'>
            <div className='signup-right-body-box'>
              <p className='signup-right-body-register-text'>Instructor Registration</p>

              <form className='signup-form' onSubmit={handleSubmit}>
                <input type="text" data-testid="input-name" placeholder='Enter Name' className='signup-input-field' name='name' onChange={handleChange} value={formData.name} />
                <input type="tel"  data-testid="input-phone" placeholder='Enter Phone Number' className='signup-input-field' name='phone_no' onChange={handleChange} value={formData.phone_no} minLength="10" maxLength="10" required />
                <input type="email"  data-testid="input-email"placeholder='Enter Email' className='signup-input-field' name='email' onChange={handleChange} value={formData.email} />
                {/* <input type="password" placeholder='Enter Password' className='signup-input-field' name='password' onChange={handleChange} value={formData.password} />
                <input type="password" placeholder='Confirm Password' className='signup-input-field' name='confirm_password' onChange={handleChange} value={formData.confirm_password} onPaste={(e) => e.preventDefault()} /> */}
                
                  <PasswordInput
                    name="password"
                    dataTestId="input-password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Enter Password"
                  />

                  <PasswordInput
                    name="confirm_password"
                    dataTestId="input-confirm-password"
                    value={formData.confirm_password}
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    placeholder="Confirm Password"
                    onPaste={(e) => e.preventDefault()} // disable paste
                  />
                <br />
                
                <button className='signup-btn-submit'data-testid="submit-button" type='submit'>Sign Up</button>
                <hr className='signup-line' />
              </form>

              {error && <p className="error-message">⚠️ {error}</p>}
              {successMessage && !error && <p className="success-message">🎉 {successMessage}</p>}

              <p className="signup-right-body-login-text">
                Returning User?{' '}
                <a href="/instructor-signin" className="signup-signin-link">
                  <b>Login Now</b>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructorSignup;

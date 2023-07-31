import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signInUser } from '../../../redux/authSlice';
import { toast } from 'react-toastify';
import '../../../css/signIn-signUp.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignIn = async (event) => {
    event.preventDefault();

    const { email, password } = formData;
    if (!email || !password) {
      toast.error('All fields are required.');
      return;
    }
    if (password.length < 3 || password.length > 20) {
      toast.error("Password must be between 3 and 20 characters.");
      return;
    }
    try {
      await dispatch(signInUser(formData));
      toast.success('You have successfully signed in.');
      navigate('/');
    } catch (error) {
      toast.error('Invalid credentials. Please try again.');
    }
  };

  return (
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="input">
          <span className="input__heading">Email</span>
          <input
            data-test-id="auth-email"
            name="email"
            type="email"
            required=""
            value={formData.email}
            onChange={handleInputChange}/>
        </label>
        <label className="input">
          <span className="input__heading">Password</span>
          <input
            data-test-id="auth-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required=""
            value={formData.password}
            onChange={handleInputChange}/>
        </label>
        <button
          data-test-id="auth-submit"
          className="button"
          onClick={handleSignIn}
          type="submit"
          disabled={loading}>
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
      <span>
        Don't have an account?
        <Link to="/auth/sign-up"
              data-test-id="auth-sign-up-link"
              className="sign-in-form__link">
              Sign Up
        </Link>
      </span>
    </main>
  );
};

export default SignIn;

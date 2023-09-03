import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpUser } from '../../../redux/authSlice';
import { toast } from 'react-toastify';
import '../../../css/signIn-signUp.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
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

  const handleSignUp = async (event) => {
    event.preventDefault();

    const { fullName, email, password } = formData;
    if (!fullName || !email || !password) {
      toast.error('All fields are required.');
      return;
    }
    if (password.length < 3 || password.length > 20) {
      toast.error("Password must be between 3 and 20 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(signUpUser(formData));

      if (response.error) {
        toast.error('User with this email already exists');
      } else {
        toast.success('You have successfully signed up.');
        navigate('/');
      }
    } catch (error) {
      toast.error('Error during sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="input">
          <span className="input__heading">Full name</span>
          <input
            data-test-id="auth-full-name"
            name="fullName"
            type="text"
            required=""
            value={formData.fullName}
            onChange={handleInputChange}/>
        </label>
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
          onClick={handleSignUp}
          className="button"
          type="submit"
          disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/auth/sign-in"
              data-test-id="auth-sign-in-link"
              className="sign-up-form__link">
              Sign In
        </Link>
      </span>
    </main>
  );
};

export default SignUp;

import { Link, useNavigate } from 'react-router-dom';
import '../../../css/signIn-signUp.scss';

const SignIn = () => {
  const navigate = useNavigate();
  const handleSignIn = (event) => {
    event.preventDefault();
    const form = event.target.form;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;

    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    if (password.length < 3 || password.length > 20) {
      alert("Password must be between 3 and 20 characters.");
      return;
    }

    navigate("/");
  };

  return(
    <main className="sign-in-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-in-form" autoComplete="off">
        <h2 className="sign-in-form__title">Sign In</h2>
        <label className="input">
          <span className="input__heading">Email</span>
          <input data-test-id="auth-email"
                 name="email"
                 type="email"
                 required=""/>
        </label>
        <label className="input">
          <span className="input__heading">Password</span>
          <input data-test-id="auth-password"
                 name="password" type="password"
                 autoComplete="new-password"
                 required=""/>
        </label>
        <button data-test-id="auth-submit"
                className="button"
                onClick={handleSignIn}
                type="submit">
                Sign In
        </button>
      </form>
      <span>
        Don't have an account?
        <Link to="/sign-up"
              data-test-id="auth-sign-up-link"
              className="sign-in-form__link">
              Sign Up
        </Link>
      </span>
    </main>
  );
}

export default SignIn;

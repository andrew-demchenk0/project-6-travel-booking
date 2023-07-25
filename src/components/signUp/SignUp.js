import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target.form;
    const fullName = form.elements["full-name"].value;
    const email = form.elements["email"].value;
    const password = form.elements["password"].value;


    if (!fullName || !email || !password) {
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
    <main className="sign-up-page">
      <h1 className="visually-hidden">Travel App</h1>
      <form className="sign-up-form" autoComplete="off">
        <h2 className="sign-up-form__title">Sign Up</h2>
        <label className="input">
          <span className="input__heading">Full name</span>
          <input data-test-id="auth-full-name" name="full-name" type="text" required=""/>
        </label>
        <label className="input">
          <span className="input__heading">Email</span>
          <input data-test-id="auth-email" name="email" type="email" required=""/>
        </label>
        <label className="input">
          <span className="input__heading">Password</span>
          <input data-test-id="auth-password" name="password" type="password" autoComplete="new-password" required=""/>
        </label>
        <button data-test-id="auth-submit"
                onClick={handleSignUp}
                className="button"
                type="submit">
          Sign Up
        </button>
      </form>
      <span>
        Already have an account?
        <Link to="/sign-in" data-test-id="auth-sign-in-link" className="sign-up-form__link">Sign In</Link>
      </span>
    </main>
  );
}

export default SignUp;
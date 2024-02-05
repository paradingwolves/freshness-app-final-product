import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFirebaseEmailLogin from '../../hooks/useLogin';
import useFirebaseLogout from '../../hooks/useLogout';
import { emailValidate, passwordValidate } from '../../util/form-validation';
import { HOME, REGISTER } from '../../lib/routes';
import { useNavigate, Link } from 'react-router-dom';
import RegisterStore from './RegisterStore';

function LoginForm() {
  const { user, error, login } = useFirebaseEmailLogin();
  const { logout } = useFirebaseLogout();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

    if (errors.email || errors.password) {
      // Validation failed, handle accordingly (e.g., show error messages)
      return;
    }

    // Validation passed, attempt to log in
    login(email, password);
  };

  useEffect(() => {
    // Check for a successful login after a user state change
    if (user) {
      navigate(HOME); // Redirect to PROJECTS_ADMIN after successful login
    }

    // Check for errors and handle accordingly
    if (error) {
      console.error('Login failed. Please check your credentials and try again.', error);
    }
  }, [user, error, navigate]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center pt-5">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              {user ? (
                <div>
                  <p>Welcome, {user.email}!</p>
                  <button onClick={() => logout()}>Logout</button>
                </div>
              ) : (
                <div>
                  <h2>Login</h2>
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-group">
                      <label htmlFor="email">Email:</label>
                      <input
                        type="email"
                        name="email"
                        {...register('email', emailValidate)}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <div className="invalid-feedback">{errors.email.message}</div>
                      )}
                    </div>
                    <div className="form-group">
                      <label htmlFor="password">Password:</label>
                      <input
                        type="password"
                        name="password"
                        {...register('password', passwordValidate)}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="Enter your password"
                      />
                      {errors.password && (
                        <div className="invalid-feedback">{errors.password.message}</div>
                      )}
                    </div>
                    <button type="submit" className="btn btn-primary my-2">
                      Login
                    </button>
                  </form>
                  {/* Link to Register Page */}
                  <p className="mt-3 text-center">
                    Don't have an account? <Link to={REGISTER}>Register Here</Link>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;

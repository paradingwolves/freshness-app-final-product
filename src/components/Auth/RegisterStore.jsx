import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import useRegisterStore from '../../hooks/useRegisterStore';
import { LOGIN } from '../../lib/routes';

const RegisterStore = () => {
  const { registerStore, error } = useRegisterStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [storeNumber, setStoreNumber] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Call the registerStore function
    await registerStore(email, password, storeNumber);
    
    // Check for errors and show success message
    if (!error) {
      setSuccess(true);
      // Clear the form
      setEmail('');
      setPassword('');
      setStoreNumber('');
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title text-center mb-4">Register Store</h3>
              {success && (
                <div className="alert alert-success" role="alert">
                  Registration successful!
                </div>
              )}
              <form onSubmit={handleRegister}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="storeNumber" className="form-label">
                    Store Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="storeNumber"
                    value={storeNumber}
                    onChange={(e) => setStoreNumber(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Register
                </button>
                {error && <div className="text-danger mt-3">{error}</div>}
              </form>
              {/* "Already have an account?" link */}
              <p className="mt-3 text-center">
                Already have an account? <Link to={LOGIN}>Login here</Link>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterStore;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="shadow card">
            <div className="bg-primary text-white card-header">Register</div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" className="form-control" id="username" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                  />
                </div>
                <button
                  onClick={() => setLoggedIn(true)}
                  type="submit"
                  className="btn btn-primary mt-3"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
          <button onClick={handleGoBack} className="btn btn-secondary mt-5">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;

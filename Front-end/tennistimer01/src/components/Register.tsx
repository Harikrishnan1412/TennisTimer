// components/RegisterForm.tsx
import React, { useState } from 'react';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';




type RegisterFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage(''); // Clear error message when the user types

    //Pass previous data in function and update the necessary value "Name" and keep the "Password" and "Conform password" same
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const checkPassword = () => {
    const { password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
    }
  };



  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const { username, password, confirmPassword } = formData;

    const userobj = {
      "Username":username,
      "Password":password
    };

    // Check password match before submitting
    if (password === confirmPassword) {
      // Add your registration logic here
      fetch("http://localhost:5194/api/Auth/register",{
        method: "POST",
        headers: {'content-type':"application/json"},
        body : JSON.stringify(userobj)
      }).then((res)=>{
        toast.success("Register Success");
        console.log('Registration data:', { username, password });
        navigate('/login');
      }).catch((err) => {
        toast.error("Failed Registeration "+ err.message);
      });
      // Reset the form if needed
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
      });
    } else {
      setErrorMessage('Passwords do not match');
      toast.error("Passwords do not match");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Register</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={checkPassword}
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Confirm Password:</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={checkPassword}
                    className="form-control"
                    required
                  />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
                <span>  ||  <a href='/login'>Already a user ?</a></span>
                {errorMessage && (
                  <p className="text-danger mt-2">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;

import { Console, error } from "console";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import jwt from 'jsonwebtoken';

type LoginFormData = {
  username: string;
  password: string;
};




type LoginComponentProps = {
  updateusername: (updateusername: string, jwttoken: string, isLogin: string, role: string) => void;
}

const Login: React.FC<LoginComponentProps> = ({ updateusername }) => {
  useEffect(() => {
    updateusername("", "", 'false', '');
    console.log('Navbar changed');
  }, []);

  //loading variable
  const [loading, setloading] = useState<boolean>(false);

  // variable to store user data
  const navigate = useNavigate();
  const [userinfo, setuserinfo] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  //variable to store error
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [role, setrole] = useState<string>('');

  // To Update value in variable
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage(''); // Clear error message when the user types

    //Pass previous data in function and update the necessary value "Name" and keep the "Password" and "Conform password" same
    setuserinfo((prevData) => ({ ...prevData, [name]: value }));
  };


  //Submit method
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { username, password } = userinfo;
    setloading(true);
    // Check password match before submitting
    if (username !== " " && password !== " ") {
      // Add your registration logic here
      if (username === " ") {
        console.log("Empty username");
      }
      const inputobj = {
        "Username": username,
        "Password": password
      };
      fetch("http://localhost:5194/api/Auth/login", {
        method: "POST",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(inputobj)
      }).then((res) => {
        return res.json();
      }).then((resp) => {
        console.log(resp.jwtToken);
        console.log('login data:', { username, password });
        if (resp.jwtToken !== null) {
          console.log("Login success");
          toast.success("Login success!!!");
          let jwttoken: string = resp.jwtToken;
          console.log("Jwttoken before userole fetch");
          console.log(jwttoken);
          fetch("http://localhost:5194/api/Users/GetUserRole?id=" + username, {
            headers: {
              Authorization: 'bearer ' + jwttoken
            }
          }).then(
            response => {
              console.log("Inside jwttoken");
              console.log(resp.jwttoken);
              console.log("Inside username response")
              return response.json();
            }
          ).then(
            data => {
              console.log("Role from API");
              console.log(data.roleName);
              setrole(data.roleName);
              updateusername(username, resp.jwtToken, 'true', data.roleName);
              setloading(false);
              navigate("/");
            }
          )
          console.log("Role outside fetch");
          console.log(role);

        }
        else {
          toast.error("User Not Found");
        }

      }).catch((err) => {
        toast.error(err.message);
      });

      // Reset the form if needed
      setuserinfo({
        username: '',
        password: '',
      });
    } else {
      setErrorMessage('User Not Found');
      toast.error("User Not Found");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center">Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={userinfo.username}
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
                    value={userinfo.password}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary">
                  Login
                </button>
                <span>  ||  <a href="/Register">New User ?</a></span>
                {errorMessage && (
                  <p className="text-danger mt-2">{errorMessage}</p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {loading && (
        <div>
          <div className="row justify-content-center">
            <div className="col-md-4">
            <img className="mx-auto" style={{
              justifyContent: 'center',
              alignItems: 'center'
            }} src="https://i.stack.imgur.com/hzk6C.gif" />
            </div>
          </div>
        </div>
      )}
    </div>

  )
};

export default Login;
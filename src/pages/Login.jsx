import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { baseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {authUser, setAuthUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const formData = new URLSearchParams();
      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });

      const data = await res.json();
      const accessToken = data?.access_token
      localStorage.setItem('lm_token', accessToken)

      const userRef = await fetch(`${baseUrl}/user`,{
        headers:{
            Authorization: `Bearer ${accessToken}`
        }
      })

      const userData = await userRef.json()

      setAuthUser(userData)

      if(userData.detail  == 'User not found'){
        return
      }else{
        navigate('/')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-center">Login now!</h1>
            <p className="py-6 text-center">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda <br />
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae <br />
              et a id nisi.
            </p>
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div>
                  <Link to={'/signup'} className="link link-hover">Don't have an account</Link>
                </div>
                <button onClick={handleLogin} className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

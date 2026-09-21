import { useState } from "react";
import { Link } from "react-router";
import { baseUrl } from "../services/BaseUrl";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");



const handleSignup = async () => {
  const userData = {
    email,
    username,
    firstname,
    lastname,
    password,
    role
  };

  const res = await fetch(`${baseUrl}/createuser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
  });

  const data = await res.json();

  console.log(data);
};




  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col">
          <div className="text-center">
            <h1 className="text-5xl font-bold">Sign Up</h1>
            <p className="py-6">
              Create your account by providing the information below.
            </p>
          </div>

          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <fieldset className="fieldset">
                {/* Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                {/* Username */}
                <label className="label">Username</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                {/* First Name */}
                <label className="label">First Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />

                {/* Last Name */}
                <label className="label">Last Name</label>
                <input
                  type="text"
                  className="input"
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                />

                {/* Password */}
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                {/* Role */}
                <label className="label">Role</label>
                <select
                  className="select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>

                <div>
                  <Link to="/login" className="link link-hover">
                    Already have an account?
                  </Link>
                </div>

                <button onClick={handleSignup} className="btn btn-neutral mt-4">
                  Sign Up
                </button>
              </fieldset>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

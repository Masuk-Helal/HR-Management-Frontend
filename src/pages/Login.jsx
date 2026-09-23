import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { baseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import { decodeToken } from "../services/decodeToken";
import toast from "react-hot-toast";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {authUser, setAuthUser} = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
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
      const accessToken = data?.access_token;

      if (!res.ok || !accessToken) {
        const message = data?.detail || "Invalid username or password";
        setError(message);
        toast.error(message);
        return;
      }

      const userData = decodeToken(accessToken);

      if (!userData) {
        const message = "Invalid session token. Please try again.";
        setError(message);
        toast.error(message);
        return;
      }

      localStorage.setItem('lm_token', accessToken)
      setAuthUser(userData)
      toast.success("Logged in successfully");
      navigate('/')
    } catch (error) {
      console.log(error);
      const message = "Something went wrong. Please try again.";
      setError(message);
      toast.error(message);
    }
  };

  return (
    <div className="bg-linear-to-br from-primary/10 via-base-100 to-success/10 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-16 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left content */}
        <div>
          <span className="badge badge-primary badge-outline rounded-full px-4 py-3 text-xs font-semibold tracking-wide">
            WELCOME BACK
          </span>

          <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight">
            Sign in to continue your career journey
          </h1>

          <p className="mt-6 text-base-content/70 max-w-md">
            Pick up right where you left off — track applications, discover
            new roles, and stay in touch with hiring teams.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Access curated jobs from verified companies",
              "Track every application in one place",
              "Get notified when employers respond",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-success text-success-content flex items-center justify-center text-xs shrink-0">
                  ✓
                </span>
                <span className="text-base-content/80">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right form card */}
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-8 lg:p-10">
          <h2 className="text-2xl font-bold">Sign in to your account</h2>
          <p className="text-base-content/60 text-sm mt-1">
            Welcome back! Please enter your details.
          </p>

          <form onSubmit={handleLogin}>
            <div className="mt-6">
              <label className="block text-sm font-medium mb-1.5">Username</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-error text-sm mt-3">{error}</p>}

            <button type="submit" className="btn btn-primary w-full mt-6">
              Sign In
            </button>

            <p className="text-center text-sm text-base-content/60 mt-5">
              Don't have an account?{" "}
              <Link to="/signup" className="link link-primary font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Login;

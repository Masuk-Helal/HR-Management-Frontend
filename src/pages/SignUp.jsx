import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { baseUrl } from "../services/BaseUrl";
import { AuthContext } from "../context/AuthProvider";
import { decodeToken } from "../services/decodeToken";
import toast from "react-hot-toast";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { setAuthUser } = useContext(AuthContext);
  const navigate = useNavigate();



const handleSignup = async (e) => {
  e.preventDefault();
  setError("");
  try {
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

    if (!res.ok) {
      const message = data?.detail || "Failed to create account";
      setError(message);
      toast.error(message);
      return;
    }

    const formData = new URLSearchParams();
    formData.append("username", username);
    formData.append("password", password);

    const loginRes = await fetch(`${baseUrl}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData,
    });

    const loginData = await loginRes.json();
    const accessToken = loginData?.access_token;

    if (!loginRes.ok || !accessToken) {
      toast.success("Account created. Please log in.");
      setError("Account created. Please log in.");
      navigate("/login");
      return;
    }

    const loggedInUser = decodeToken(accessToken);

    if (!loggedInUser) {
      toast.success("Account created. Please log in.");
      setError("Account created. Please log in.");
      navigate("/login");
      return;
    }

    localStorage.setItem("lm_token", accessToken);
    setAuthUser(loggedInUser);
    toast.success("Account created successfully");
    navigate("/");
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
            CREATE ACCOUNT
          </span>

          <h1 className="mt-6 text-4xl lg:text-5xl font-extrabold leading-tight">
            Join thousands of professionals hiring and getting hired
          </h1>

          <p className="mt-6 text-base-content/70 max-w-md">
            Build a profile that stands out, connect with employers, and
            unlock tailored recommendations to accelerate your career journey.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              "Access curated jobs from verified companies",
              "Showcase your portfolio and skill badges",
              "Collaborate with hiring teams in real time",
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
        <div className="bg-base-100 border border-base-200 rounded-2xl shadow-xl p-5 sm:p-8 lg:p-10">
          <h2 className="text-2xl font-bold">Create your free account</h2>
          <p className="text-base-content/60 text-sm mt-1">
            Start as a candidate or an employer. Switch anytime.
          </p>

          <form onSubmit={handleSignup}>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-sm font-medium mb-1.5">First name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Samantha"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Last name</label>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Jenkins"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5">Username</label>
              <input
                type="text"
                className="input w-full"
                placeholder="samantha_j"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5">Email address</label>
              <input
                type="email"
                className="input w-full"
                placeholder="name@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1.5">Desired role</label>
              <select
                className="select w-full"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="hr">HR</option>
              </select>
            </div>

        

            {error && <p className="text-error text-sm mt-3">{error}</p>}

            <button type="submit" className="btn btn-primary w-full mt-6">
              Create Account
            </button>

            <p className="text-center text-sm text-base-content/60 mt-5">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-medium">
                Sign in
              </Link>
            </p>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SignUp;

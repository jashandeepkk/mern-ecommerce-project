import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const [role, setRole] =
    useState("user");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      alert("Enter valid email address");
      return;
    }

    if (!password) {
      alert("Enter password");
      return;
    }

    try {
      setLoading(true);

     const response = await fetch(
  "https://mern-ecommerce-project-rtjp.onrender.com/api/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  }
);

const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Login failed"
        );

        setLoading(false);
        return;
      }

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      localStorage.setItem(
        "token",
        data.token
      );

      setSuccess(
        "Login successful!"
      );

      setTimeout(() => {
        if (
          data.user.role === "admin"
        ) {
          navigate("/admin");
        } else if (
          data.user.role === "vendor"
        ) {
          navigate("/vendor");
        } else {
          navigate("/");
        }
      }, 1000);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

    } finally {

      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-10 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #2563eb 0%, transparent 25%), radial-gradient(circle at bottom right, #7c3aed 0%, transparent 25%), linear-gradient(135deg, #020617 0%, #0f172a 45%, #111827 100%)",
      }}
    >
      
      <div className="absolute top-[-120px] left-[-120px] w-[320px] h-[320px] bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[320px] h-[320px] bg-violet-500/20 rounded-full blur-3xl"></div>

      <div className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-cyan-400/10 rounded-full blur-3xl"></div>

      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md
        bg-white/10 backdrop-blur-2xl
        border border-white/10
        rounded-[32px]
        p-8 shadow-[0_10px_60px_rgba(0,0,0,0.55)]"
      >
        
        <div className="flex justify-center mb-6">
          <div
            className="w-16 h-16 rounded-2xl
            bg-gradient-to-br from-blue-500 to-violet-500
            flex items-center justify-center
            text-2xl font-bold text-white
            shadow-lg shadow-blue-500/30"
          >
            C
          </div>
        </div>

        
        <div className="text-center mb-8">
          <p className="text-cyan-300 tracking-[4px] text-sm uppercase mb-2">
            Welcome Back
          </p>

          <h2 className="text-4xl font-bold text-white">
            Login
          </h2>

          <p className="text-gray-300 text-sm mt-3">
            Login to continue shopping
          </p>
        </div>

        
        <div className="relative mb-5">
          <FaUserShield className="absolute top-4 left-4 text-cyan-300 z-10" />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full pl-12 pr-4 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white outline-none
            focus:ring-2 focus:ring-cyan-400"
          >
            <option
              value="user"
              className="text-black"
            >
              Login as User
            </option>

            <option
              value="vendor"
              className="text-black"
            >
              Login as Vendor
            </option>

            <option
              value="admin"
              className="text-black"
            >
              Login as Admin
            </option>
          </select>
        </div>

        
        <div className="relative mb-5">
          <FaEnvelope className="absolute top-4 left-4 text-cyan-300" />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full pl-12 pr-4 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            outline-none focus:ring-2 focus:ring-cyan-400"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        
        <div className="relative mb-6">
          <FaLock className="absolute top-4 left-4 text-cyan-300" />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            className="w-full pl-12 pr-12 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            outline-none focus:ring-2 focus:ring-cyan-400"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-4 top-4 text-gray-300"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        
        {success && (
          <div
            className="bg-green-500/20 border border-green-400/20
            text-green-300 text-center text-sm
            py-3 rounded-2xl mb-5"
          >
            {success}
          </div>
        )}

        
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-2xl
          bg-gradient-to-r from-cyan-500 to-blue-500
          hover:from-cyan-400 hover:to-blue-400
          text-white font-bold text-lg
          transition-all duration-300
          shadow-lg shadow-cyan-500/20
          disabled:opacity-70"
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        
        <p className="text-sm mt-6 text-center text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-300 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
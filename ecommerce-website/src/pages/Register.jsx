import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaStore,
  FaUserShield,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [role, setRole] = useState("user");
  const [storeName, setStoreName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const [error, setError] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill all fields");
      return;
    }

    if (
      role === "vendor" &&
      !storeName
    ) {
      setError("Please enter store name");
      return;
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError(
        "Enter valid email address"
      );
      return;
    }

    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (
      !passwordRegex.test(password)
    ) {
      setError(
        "Password must contain 1 uppercase letter, 1 number and minimum 6 characters"
      );
      return;
    }

    if (
      password !== confirmPassword
    ) {
      setError(
        "Passwords do not match"
      );
      return;
    }

    try {
      setLoading(true);

      const { data } =
        await axios.post(
          "return `https://mern-ecommerce-project-rtjp.onrender.com/${img}`;/api/auth/register",
          {
            name,
            email,
            password,
            role,
            storeName,
          }
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "currentUser",
        JSON.stringify(data.user)
      );

      setSuccess(
        "Registration successful!"
      );

      setTimeout(() => {
        if (
          data.user.role ===
          "vendor"
        ) {
          navigate("/vendor");
        } else if (
          data.user.role ===
          "admin"
        ) {
          navigate("/admin");
        } else {
          navigate("/");
        }
      }, 1200);

    } catch (err) {

      setError(
        err.response?.data
          ?.message ||
          "Registration failed"
      );

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
            Welcome
          </p>

          <h2 className="text-4xl font-bold text-white">
            Create Account
          </h2>

          <p className="text-gray-300 text-sm mt-3">
            Join Cartify and explore premium shopping
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
              Register as User
            </option>

            <option
              value="vendor"
              className="text-black"
            >
              Register as Vendor
            </option>

          </select>
        </div>

        <div className="relative mb-5">

          <FaUser className="absolute top-4 left-4 text-cyan-300" />

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full pl-12 pr-4 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        {role === "vendor" && (
          <div className="relative mb-5">

            <FaStore className="absolute top-4 left-4 text-cyan-300" />

            <input
              type="text"
              placeholder="Store Name"
              value={storeName}
              onChange={(e) =>
                setStoreName(
                  e.target.value
                )
              }
              className="w-full pl-12 pr-4 py-3 rounded-2xl
              bg-white/5 border border-white/10
              text-white placeholder-gray-400
              outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
        )}

        <div className="relative mb-5">

          <FaEnvelope className="absolute top-4 left-4 text-cyan-300" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full pl-12 pr-4 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            outline-none focus:ring-2 focus:ring-cyan-400"
          />
        </div>

        <div className="relative mb-5">

          <FaLock className="absolute top-4 left-4 text-cyan-300" />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="w-full pl-12 pr-12 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute top-4 right-4 text-gray-300"
          >
            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        <div className="relative mb-6">

          <FaLock className="absolute top-4 left-4 text-cyan-300" />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            className="w-full pl-12 pr-12 py-3 rounded-2xl
            bg-white/5 border border-white/10
            text-white placeholder-gray-400
            outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute top-4 right-4 text-gray-300"
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        {error && (
          <div
            className="bg-red-500/20 border border-red-400/20
            text-red-300 text-center text-sm
            py-3 rounded-2xl mb-5"
          >
            {error}
          </div>
        )}

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
          shadow-lg shadow-cyan-500/20"
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>

        <p className="text-sm mt-6 text-center text-gray-300">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-cyan-300 font-semibold hover:underline"
          >
            Login
          </Link>

        </p>
      </form>
    </div>
  );
};

export default Register;
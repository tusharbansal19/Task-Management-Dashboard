import React, { useState } from "react";
import { FaEnvelope, FaImage, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "./AuthProtectComponents";
import { useNavigate } from "react-router-dom";

const SignupLogin = () => {
    const navigator=useNavigate()
    const {login}=useAuth();
  const [activeTab, setActiveTab] = useState("signup");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  // Validation function
  const validate = () => {
    const newErrors = {};
    if (activeTab === "signup") {
      if (!formData.name.trim()) newErrors.name = "Name is required.";
      if (!formData.email.includes("@")) newErrors.email = "Invalid email.";
      if (formData.password.length < 6)
        newErrors.password = "Password must be at least 6 characters.";
      if (formData.password !== formData.confirmPassword)
        newErrors.confirmPassword = "Passwords do not match.";
    } else {
      if (!formData.email.includes("@")) newErrors.email = "Invalid email.";
      if (!formData.password.trim())
        newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form data:", formData);
      
    }
    login();
    navigator("/")
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white">
      <div className="w-11/12 max-w-md bg-[#2C2B5A] rounded-lg shadow-xl p-6">
        {/* Tabs */}
        <div className="flex justify-around mb-6">
          <button
            onClick={() => setActiveTab("signup")}
            className={`text-lg font-bold ${
              activeTab === "signup"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-300"
            }`}
          >
            Signup
          </button>
          <button
            onClick={() => setActiveTab("login")}
            className={`text-lg font-bold ${
              activeTab === "login"
                ? "text-purple-400 border-b-2 border-purple-400"
                : "text-gray-300"
            }`}
          >
            Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {activeTab === "signup" && (
            <>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className={`w-full pl-10 pr-3 py-2 bg-[#3B3B80] rounded-lg focus:outline-none ${
                    errors.name ? "border border-red-500" : ""
                  }`}
                />
                {errors.name && (
                  <p className="text-red-400 text-sm">{errors.name}</p>
                )}
              </div>
              <div className="relative">
                <FaImage className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="file"
                  name="profileImage"
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 bg-[#3B3B80] rounded-lg focus:outline-none text-gray-300"
                  accept="image/*"
                />
              </div>
            </>
          )}
          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className={`w-full pl-10 pr-3 py-2 bg-[#3B3B80] rounded-lg focus:outline-none ${
                errors.email ? "border border-red-500" : ""
              }`}
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email}</p>
            )}
          </div>
          <div className="relative">
            <FaLock className="absolute top-3 left-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className={`w-full pl-10 pr-3 py-2 bg-[#3B3B80] rounded-lg focus:outline-none ${
                errors.password ? "border border-red-500" : ""
              }`}
            />
            {errors.password && (
              <p className="text-red-400 text-sm">{errors.password}</p>
            )}
          </div>
          {activeTab === "signup" && (
            <div className="relative">
              <FaLock className="absolute top-3 left-3 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full pl-10 pr-3 py-2 bg-[#3B3B80] rounded-lg focus:outline-none ${
                  errors.confirmPassword ? "border border-red-500" : ""
                }`}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-sm">{errors.confirmPassword}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 py-2 rounded-lg font-bold text-white transition"
          >
            {activeTab === "signup" ? "Signup" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupLogin;

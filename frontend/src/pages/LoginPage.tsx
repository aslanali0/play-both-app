import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import api from "../api/api";
import type { LoginRequest } from "../types/Auth";
const API_URL = "/users";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { refreshUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    Swal.fire({
      title: "Logging in...",
      background: "#1f2937",
      color: "#fff",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
      showConfirmButton: false,
    });

    const request: LoginRequest = {
      email: email,
      password: password,
    };
    try {
      const response = await api.post(`${API_URL}/login`, request);
      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting...",
        timer: 1500,
        showConfirmButton: false,
        background: "#1f2937",
        color: "#fff",
      });
      const token = response.data.access_token;
      localStorage.setItem("token", token);
      await refreshUser();
      navigate("/home");
    } catch (error) {
      console.error("Login error: ", error);
      await Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Invalid email or password. Please check your credentials and try again.",
        confirmButtonText: "Try Again",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#d33",
      });
      localStorage.clear();
    }
  };

  return (
    <div className=" flex flex-col w-96 h-auto bg-gray-900 rounded-lg p-6 m-auto mt-20">
      <span className="text-4xl m-4">Log in</span>

      <form className="flex flex-col" onSubmit={handleLogin}>
        <div className="text-xl font-bold text-white text-center mb-6">
          <input
            className="w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-orange-500 bg-gray-800/50 m-2 p-3 rounded"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <br />
          <input
            className="w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-orange-500 bg-gray-800/50 m-2 p-3 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <input
            className="mr-auto w-full bg-gray-800 shadow-md hover:bg-green-500/70 transition-colors rounded-lg font-semibold p-3 cursor-pointer"
            type="submit"
            value="Log in"
          />
          <span className="text-center p-4 w-20 text-white">or</span>

          <Link
            to="/signup"
            className="!text-inherit text-center mr-auto w-full bg-gray-500 shadow-md shadow-greeny-500/70 hover:bg-blue-500/70 transition-colors rounded-lg font-semibold p-3 cursor-pointer"
          >
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

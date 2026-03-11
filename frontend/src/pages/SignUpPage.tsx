import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import Swal from "sweetalert2";
import type { RegisterRequest } from "../types/Auth";
const API_URL = "/users";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const request: RegisterRequest = {
      username: username,
      email: email,
      password: password,
    };

    try {
      if (password != passwordConfirm) {
        throw new Error("Passwords do not match");
      }
      await api.post(`${API_URL}/register`, request);
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text:
          error instanceof Error && error.message == "Passwords do not match"
            ? "Passwords do not match, please try again!"
            : "An error occurred while creating your account. The email might already be in use or the information provided is invalid.",
        confirmButtonText: "Try Again",
        background: "#1f2937",
        color: "#fff",
        confirmButtonColor: "#d33",
      });
    }
  };

  return (
    <div className=" flex flex-col w-96 h-auto bg-gray-900 rounded-lg p-6 m-auto mt-20">
      <span className="text-4xl m-4">Sign up</span>
      <form className="flex flex-col" onSubmit={handleSignup}>
        <div className="text-xl font-bold text-white mb-6">
          <input
            className="w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-gray-500 bg-gray-800/50 m-2 p-3 rounded"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username..."
          />
          <input
            className="w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email..."
          />
          <br />
          <input
            className="w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password..."
          />
          <span className="font-normal text-gray-600 text-md m-2">
            Minimum 8 characters
          </span>
          <input
            className="w-full border-0 border-gray-700 focus:ring-2 mx-auto focus:ring-blue-500 bg-gray-800/50 m-2 p-3 rounded"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            placeholder="Confirm Password..."
          />
        </div>
        <div className="flex flex-col items-center mt-4">
          <input
            className="!text-inherit text-center mr-auto w-full bg-gray-500 shadow-md shadow-greeny-500/70 hover:bg-blue-500/70 transition-colors rounded-lg font-semibold p-3 cursor-pointer"
            type="submit"
            value="Sign up"
          />
          <span className="w-20 text-white items-center text-center p-4">
            or
          </span>
          <Link
            to="/login"
            className="mr-auto w-full bg-gray-800 text-center shadow-md hover:bg-green-500/70 transition-colors rounded-lg font-semibold p-3 cursor-pointer"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;

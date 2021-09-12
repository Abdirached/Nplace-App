import { useState } from "react";
import { Link } from "react-router-dom";
const axios = require("axios");

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const isInvalid = email === "";

  const onSubmit = async function sendPasswordResetLink(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/forgot-password/reset-link",
        data: {
          email,
        },
      });
      console.log(response);
      setSuccess("Password reset link has been sent to your inbox");
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };
  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex flex-col w-2/4 mx-auto">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="https://images.unsplash.com/photo-1533228100845-08145b01de14?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzR8fHBob25lfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <form onSubmit={onSubmit}>
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && "opacity-50"}`}
            >
              Submit
            </button>
          </form>
          {success && <p className="mb-4 text-xs text-green-500">{success}</p>}
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to="/SignIn" className="font-bold text-blue-medium">
              signin
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

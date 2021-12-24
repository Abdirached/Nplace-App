import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");

export default function SignIn() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";
  const onSubmit = async function postData(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/SignIn",
        data: {
          email,
          password,
        },
      });
      console.log(response);
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("userId", JSON.stringify(response.data.userId));
      localStorage.setItem("userRole", JSON.stringify(response.data.role));
      console.log("successfull signin");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 h-screen">
        <img
          src="https://source.unsplash.com/random"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Log in to your account
          </h1>
          <form onSubmit={onSubmit} className="mt-6">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-gray-700">Password</label>
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
              focus:bg-white focus:outline-none"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
            </div>
            <div className="text-right mt-2">
              <Link
                to={"/forgot-password/reset-link"}
                className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700"
              >
                Forgot Password?
              </Link>
            </div>
            <button
              disabled={isInvalid}
              type="submit"
              className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
            >
              Log In
            </button>
          </form>
          {error && <p className="my-4 text-red-500">{error}</p>}
          <hr className="my-6 border-gray-300 w-full"></hr>
          <p className="mt-8">
            Need an account?{" "}
            <Link
              to={"/SignUp"}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
const axios = require("axios");

export default function Signup() {
  const history = useHistory();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("buyer");
  const [error, setError] = useState("");
  const isInvalid = password === "" || email === "";
  console.log(role);
  const onSubmit = async function postData(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/SignUp",
        data: {
          role,
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
        },
      });
      console.log(response);
      if (response.data.error) {
        setError(response.data.error);
        return;
      }
      console.log("successfull signup");
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="flex flex-col md:flex-row h-full items-center">
      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">
            Create your account
          </h1>
          {role === "buyer" ? (
            <>
              <form onSubmit={onSubmit} className="mt-6">
                <div className="flex justify-evenly mb-4">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700">Buyer</label>
                    <input
                      aria-label="Buyer"
                      type="radio"
                      checked={role === "buyer"}
                      name="role"
                      onChange={({ target }) => setRole(target.value)}
                      value="buyer"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700">Seller</label>
                    <input
                      aria-label="Seller"
                      type="radio"
                      checked={role === "seller"}
                      name="role"
                      onChange={({ target }) => setRole(target.value)}
                      value="seller"
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">First Name</label>
                  <input
                    aria-label="Enter your firstName"
                    type="text"
                    placeholder="First name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setFirstName(target.value)}
                    value={firstName}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Last Name</label>
                  <input
                    aria-label="Enter your lastName"
                    type="text"
                    placeholder="Last name"
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setLastName(target.value)}
                    value={lastName}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    aria-label="Enter your email address"
                    type="text"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setEmail(target.value)}
                    value={email}
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
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    aria-label="Enter your phone number"
                    type="text"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setPhoneNumber(target.value)}
                    value={phoneNumber}
                  />
                </div>
                <button
                  disabled={isInvalid}
                  type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                >
                  Sign Up
                </button>
              </form>
              <button
                type="submit"
                className="w-full block bg-red-500 hover:bg-red-400 focus:bg-red-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                <a href="http://localhost:5000/auth/buyer/google">
                  Sign Up with google
                </a>
              </button>
            </>
          ) : (
            <>
              <form onSubmit={onSubmit} className="mt-6">
                <div className="flex justify-evenly mb-6">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700">Buyer</label>
                    <input
                      aria-label="Buyer"
                      type="radio"
                      checked={role === "buyer"}
                      name="role"
                      onChange={({ target }) => setRole(target.value)}
                      value="buyer"
                      className="w-5 h-5"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700">Seller</label>
                    <input
                      aria-label="Seller"
                      type="radio"
                      checked={role === "seller"}
                      name="role"
                      onChange={({ target }) => setRole(target.value)}
                      value="seller"
                      className="w-5 h-5"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700">Business Name</label>
                  <input
                    aria-label="Enter your bussiness name"
                    type="text"
                    placeholder="Bussines Name"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setFirstName(target.value)}
                    value={firstName}
                  />
                </div>
                <div>
                  <label className="block text-gray-700">Email Address</label>
                  <input
                    aria-label="Enter your email address"
                    type="text"
                    placeholder="Email address"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setEmail(target.value)}
                    value={email}
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
                <div>
                  <label className="block text-gray-700">Phone Number</label>
                  <input
                    aria-label="Enter your phone number"
                    type="text"
                    placeholder="Phone number"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    onChange={({ target }) => setPhoneNumber(target.value)}
                    value={phoneNumber}
                  />
                </div>
                <button
                  disabled={isInvalid}
                  type="submit"
                  className="w-full block bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
                >
                  Sign Up
                </button>
              </form>
              <button
                type="submit"
                className="w-full block bg-red-500 hover:bg-red-400 focus:bg-red-400 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
              >
                <a href="http://localhost:5000/auth/seller/google">
                  Sign Up with google
                </a>
              </button>
            </>
          )}
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
          <hr className="my-6 border-gray-300 w-full"></hr>
          <p className="mt-8">
            Have an account?{" "}
            <Link
              to={"/SignIn"}
              className="text-blue-500 hover:text-blue-700 font-semibold"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}

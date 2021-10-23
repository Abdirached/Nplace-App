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

          {role === "buyer" ? (
            <form onSubmit={onSubmit}>
              <label>
                Buyer{" "}
                <input
                  aria-label="Buyer"
                  type="radio"
                  checked={role === "buyer"}
                  name="role"
                  onChange={({ target }) => setRole(target.value)}
                  value="buyer"
                />
              </label>
              <label className="ml-4">
                Seller{" "}
                <input
                  aria-label="Seller"
                  type="radio"
                  checked={role === "seller"}
                  name="role"
                  onChange={({ target }) => setRole(target.value)}
                  value="seller"
                />
              </label>
              <input
                aria-label="Enter your firstName"
                type="text"
                placeholder="firstName"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setFirstName(target.value)}
                value={firstName}
              />
              <input
                aria-label="Enter your lastName"
                type="text"
                placeholder="lastName"
                required
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setLastName(target.value)}
                value={lastName}
              />
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <input
                aria-label="Enter your phone number"
                type="text"
                placeholder="phone number"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPhoneNumber(target.value)}
                value={phoneNumber}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && "opacity-50"}`}
              >
                Sign Up
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmit}>
              <label>
                Buyer{" "}
                <input
                  aria-label="Buyer"
                  type="radio"
                  checked={role === "buyer"}
                  name="role"
                  onChange={({ target }) => setRole(target.value)}
                  value="buyer"
                />
              </label>
              <label className="ml-4">
                Seller{" "}
                <input
                  aria-label="Seller"
                  type="radio"
                  checked={role === "seller"}
                  name="role"
                  onChange={({ target }) => setRole(target.value)}
                  value="seller"
                />
              </label>
              <input
                aria-label="Enter your bussiness name"
                type="text"
                placeholder="Bussiness Name"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setFirstName(target.value)}
                value={firstName}
              />
              <input
                aria-label="Enter your email address"
                type="text"
                placeholder="Email address"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setEmail(target.value)}
                value={email}
              />
              <input
                aria-label="Enter your password"
                type="password"
                placeholder="Password"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPassword(target.value)}
                value={password}
              />
              <input
                aria-label="Enter your phone number"
                type="text"
                placeholder="phone number"
                className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                onChange={({ target }) => setPhoneNumber(target.value)}
                value={phoneNumber}
              />
              <button
                disabled={isInvalid}
                type="submit"
                className={`bg-blue-medium text-white w-full rounded h-8 font-bold
              ${isInvalid && "opacity-50"}`}
              >
                Sign Up
              </button>
            </form>
          )}
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

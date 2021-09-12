import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
const axios = require("axios");

export default function ResetPassword() {
  const { token } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const isInvalid = password === "";

  const onSubmit = async function resetUserPassword(e) {
    e.preventDefault();
    try {
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/forgot-password/reset-password/${token}`,
        data: {
          password,
        },
      });
      console.log(response);
      history.push("/SignIn");
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
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
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
        </div>
      </div>
    </div>
  );
}

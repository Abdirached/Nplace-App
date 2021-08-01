import { useState } from "react";
const axios = require("axios");

export default function Add() {
  const [url, setUrl] = useState("");
  const [video, setVideo] = useState("");
  const [fields, setFields] = useState("");
  const onsubmit = async function onsubmitVideo(e) {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:5000/Storage/signedurl",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response);
      setUrl(response.data.url);
      setFields(response.data.fields);
    } catch (error) {
      console.log(error);
    }
    try {
      const data = new FormData();
      Object.keys(fields).forEach((key) => {
        data.append(key, fields[key]);
      });
      data.append("file", video);
      const response = await axios({
        method: "post",
        url: url,
        data: data,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div>
      <form onSubmit={onsubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setVideo(e.target.files[0])}
        />
        <button type="submit">submit</button>
      </form>
      <img
        className="h-12 w-12"
        src="https://nplacebucket.s3.amazonaws.com/18c412ca-7e0e-48a4-b295-7ba3ce8c23b1"
      />
    </div>
  );
}

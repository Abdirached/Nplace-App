import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import UselocationListner from "../hooks/UseLocationListner";
import UseRecorder from "../hooks/UseRecorder";
import UseSignedUrl from "../hooks/UseSignedUrl";
const axios = require("axios");

export default function EditPost() {
  const [audioURL, isRecording, startRecording, stopRecording, file] =
    UseRecorder();
  const [url, fields] = UseSignedUrl();
  const { postId } = useParams();
  const [content, setContent] = useState("");
  const { place } = UselocationListner();
  useEffect(() => {
    console.log(file);
  }, [file]);
  useEffect(() => {
    indivualPost();
  }, []);
  const indivualPost = async function getIndivualPost() {
    try {
      const response = await axios.get(
        `http://localhost:5000/Posts/${postId}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
          },
        }
      );
      console.log(response.data.post.content);
      setContent(response.data.post.content);
    } catch (error) {
      console.log(error);
    }
  };

  const onsubmit = async function onsubmitVideo(e) {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.keys(fields).forEach((key) => {
        data.append(key, fields[key]);
      });
      data.append("file", file);
      const response = await axios({
        method: "post",
        url,
        data,
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
    try {
      const country = place.country;
      const province = place.province;
      const key = fields.key;
      const videoUrl = `https://nplacebucket.s3.amazonaws.com/${key}`;
      const response = await axios({
        method: "put",
        url: `http://localhost:5000/Posts/${postId}/editpost`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          country,
          province,
          content,
          video: videoUrl,
        },
      });
      console.log("successfully updated");
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  if (place == null) {
    return null;
  }
  return (
    <>
      <Navbar />
      <div className="inline-block w-full h-full">
        <form
          onSubmit={onsubmit}
          className="flex flex-col justify-evenly md:flex-row "
        >
          <input type="text" readOnly value={place.country} />
          <input type="text" readOnly value={place.province} />
          <input
            type="textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <audio src={audioURL} controls />
          <button
            onClick={startRecording}
            disabled={isRecording}
            className="border-2"
          >
            start recording
          </button>
          <button
            onClick={stopRecording}
            disabled={!isRecording}
            className="border-2"
          >
            stop recording
          </button>
          <button type="submit">submit</button>
        </form>
      </div>
    </>
  );
}

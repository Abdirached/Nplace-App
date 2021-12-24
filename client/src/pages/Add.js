import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import UselocationListner from "../hooks/UseLocationListner";
import UseSignedUrl from "../hooks/UseSignedUrl";
import { useReactMediaRecorder } from "react-media-recorder";
import { v4 as uuidv4 } from "uuid";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import ReactLoader from "../components/ReactLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");

export default function Add() {
  const { status, startRecording, stopRecording, mediaBlobUrl, clearBlobUrl } =
    useReactMediaRecorder({ audio: true });
  const [url, fields] = UseSignedUrl();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { place } = UselocationListner();
  const isInvalid = content === "" || !mediaBlobUrl;
  const onsubmit = async function onsubmitVideo(e) {
    e.preventDefault();
    try {
      const country = place;
      const province = place;
      const key = fields.key;
      const videoUrl = `https://nplacebucket.s3.amazonaws.com/${key}`;
      const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
      console.log(audioBlob);
      const file = new File([audioBlob], `audiofile${uuidv4()}.webm`, {
        type: "audio/webm",
      });
      console.log(file);
      const data = new FormData();
      Object.keys(fields).forEach((key) => {
        data.append(key, fields[key]);
      });
      data.append("file", file);
      const uploadFileToS3Response = await axios({
        method: "post",
        url,
        data,
      });
      console.log(uploadFileToS3Response);
      const response = await axios({
        method: "post",
        url: "http://localhost:5000/Posts",
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
      console.log(response);
      setContent("");
      toast.success("Successfully Posted!", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      clearBlobUrl();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (error.response) {
        toast.error(error.response.data.error, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error(error.message, {
          position: toast.POSITION.BOTTOM_CENTER,
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  return (
    <div className="h-full">
      <Navbar />
      <div className="w-full h-full">
        {place !== null ? (
          <div className="w-full sm:w-9/12 mx-auto rounded-xl mt-8 pb-8 mb-8">
            <ToastContainer />
            <p className="text-center mt-8 text-lg">
              {status !== "idle" ? status.toUpperCase() : null}
            </p>
            {status === "recording" ? (
              <div className="rounded-full w-28 m-auto bg-red-500 h-28 mt-8 flex justify-center items-center">
                <FaMicrophone className="text-5xl text-white  animate-pulse" />
              </div>
            ) : (
              <div className="rounded-full w-28 m-auto bg-red-500 h-28 mt-8 flex justify-center items-center">
                <FaMicrophone className="text-5xl text-white " />
              </div>
            )}
            <div className=" mt-8">
              {status === "stopped" ? (
                <div className="bg-gray-100 w-4/5 border-2 border-gray-300 rounded-md m-auto lg:w-1/2">
                  <audio src={mediaBlobUrl} controls className=" w-full" />
                </div>
              ) : null}
              <div className=" mt-8 w-4/5 m-auto flex justify-center lg:w-2/5">
                {status === "recording" ? (
                  <div className="flex justify-around  w-full">
                    <button
                      onClick={stopRecording}
                      className="bg-gray-600 text-white rounded h-10 w-32 "
                    >
                      Stop recording
                    </button>
                    <button
                      onClick={clearBlobUrl}
                      className="bg-red-500 text-white rounded h-10 w-32 "
                    >
                      Cancel
                    </button>
                  </div>
                ) : null}
                {status === "idle" ? (
                  <button
                    onClick={startRecording}
                    className="bg-gray-600 text-white rounded h-10 w-32 "
                  >
                    Start recording
                  </button>
                ) : null}
                {status === "stopped" ? (
                  <button
                    onClick={clearBlobUrl}
                    className="bg-red-500 text-white rounded h-10 w-36"
                  >
                    Delete recording
                  </button>
                ) : null}
              </div>
            </div>
            <div className="mt-16 ">
              <form
                onSubmit={onsubmit}
                className="flex flex-col justify-evenly"
              >
                <input
                  className="w-4/5 m-auto focus:outline-none focus:placeholder-gray-600 text-gray-700 placeholder-gray-400 pl-12 bg-gray-200 rounded-md py-4 lg:w-1/2"
                  type="text"
                  placeholder="Add description"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-center">
                  <button
                    disabled={isInvalid}
                    className={`bg-blue-medium text-white rounded h-10 w-32 mt-10  ${
                      isInvalid && "opacity-50"
                    }`}
                    onClick={() => setLoading(true)}
                  >
                    {loading ? "Loading.." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <ReactLoader />
        )}
      </div>
    </div>
  );
}

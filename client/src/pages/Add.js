import { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import Navbar from "../components/Navbar";
import UselocationListner from "../hooks/UseLocationListner";
import ReactLoader from "../components/ReactLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const axios = require("axios");

export default function Add() {
  const [url, setUrl] = useState();
  const [fields, setFields] = useState();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const { place } = UselocationListner();
  const isInvalid = content === "" || !file;
  console.log(file);
  const hiddenFileInput = useRef(null);
  const handleClick = () => {
    hiddenFileInput.current.click();
  };
  useEffect(() => {
    const signedurl = async function getSignedUrl() {
      try {
        const response = await axios.get(
          `http://localhost:5000/Storage/signedurl/${file?.name}`,
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
    };
    signedurl();
  }, [file]);
  useEffect(() => {
    if (file) {
      setFileUrl(URL.createObjectURL(file));
    }
  }, [file]);

  const mimeTypes = ["video/mp4", "video/webm", "image/jpeg"];
  useEffect(() => {
    if (file && file?.size > 40971520) {
      toast.error("file over limit", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFile("");
      return;
    } else if (file && !mimeTypes.includes(file?.type)) {
      toast.error("file not supported", {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFile("");
      return;
    }
    console.log("ok guys");
  }, [file]);

  const onsubmit = async function onsubmitVideo(e) {
    e.preventDefault();
    try {
      const country = place;
      const province = place;
      const s3Key = fields.key;
      const videoUrl = `https://nplacebucket.s3.amazonaws.com/${s3Key}`;
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
      setFile("");
      setLoading(false);
    } catch (error) {
      console.log(error.response);
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
          <div className="w-full h-full mt-8">
            <ToastContainer />
            <div className="mt-4 w-4/5 md:w-full mx-auto mb-4">
              <h1 className="text-2xl text-gray-600 font-bold md:ml-12 xl:ml-16">
                Send order
              </h1>
            </div>
            <div className=" md:flex md:h-screen">
              <div className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center w-4/5 mx-auto mb-8 mt-6 md:w-1/3 xl:w-1/4 md:relative md:left-4 md:rounded-md md:h-3/4">
                {!file ? (
                  <>
                    <header className="flex flex-col justify-center items-center">
                      <span className="mb-3 font-semibold text-gray-900 justify-center">
                        Choose file to upload
                      </span>
                      <span className="mb-6 text-gray-400 justify-center">
                        Only video or image
                      </span>
                      <span className="mb-3 text-gray-400 justify-center">
                        Video less than 1 GB and up to 3 minutes
                      </span>
                    </header>
                  </>
                ) : file?.type === "video/mp4" ||
                  file?.type === "video/webm" ? (
                  <div className="h-2/5 w-4/5 mx-auto">
                    <ReactPlayer
                      url={fileUrl}
                      controls
                      width="100%"
                      height="100%"
                    />
                  </div>
                ) : file?.type === "image/jpeg" ? (
                  <div className="w-4/5 md:w-3/5 md:h-2/5 mx-auto">
                    <img src={fileUrl} className=" w-full h-full" />
                  </div>
                ) : (
                  <p>Something went wrong !</p>
                )}
                <div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      e.target.value = "";
                    }}
                    ref={hiddenFileInput}
                  />
                  <button
                    onClick={handleClick}
                    className="mt-4 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
                  >
                    Upload a file
                  </button>
                </div>
              </div>
              <div className=" mb-12 flex flex-col w-4/5 md:w-1/2 xl:w-3/5 mx-auto gap-3 md:mb-8 md:mt-3 lg:relative lg:right-8">
                <h4 className="ml-1 font-semibold">Description</h4>
                <form
                  onSubmit={onsubmit}
                  className="flex flex-col justify-evenly"
                >
                  <input
                    className=" w-full m-auto focus:outline-none focus:placeholder-gray-600 text-gray-700 placeholder-gray-400 pl-12 rounded-md py-4 border border-gray-300"
                    type="text"
                    placeholder="Add description"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button
                    disabled={isInvalid}
                    className={`bg-indigo-500 text-white rounded-md w-48 py-3 mt-16 text-center mx-auto  ${
                      isInvalid && "opacity-50"
                    }`}
                    onClick={() => setLoading(true)}
                  >
                    {loading ? "Loading.." : "Send"}
                  </button>
                </form>
                <div className="flex items-center justify-center">
                  <button
                    className="bg-gray-500 text-white rounded-md w-48 py-3 mt-4 text-center"
                    onClick={() => {
                      setFile("");
                      setContent("");
                    }}
                  >
                    Discard
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <ReactLoader />
        )}
      </div>
    </div>
  );
}

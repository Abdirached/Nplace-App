import { useEffect } from "react";
import { useParams } from "react-router-dom";
import UseSignedUrl from "../../../hooks/UseSignedUrl";
import UseRecorder from "../../../hooks/UseRecorder";
const axios = require("axios");

export default function AddComment({ comments, setComments, postOwner }) {
  console.log(postOwner);
  const currentUserId = JSON.parse(localStorage.getItem("userId"));
  const [audioURL, isRecording, startRecording, stopRecording, file] =
    UseRecorder();
  const [url, fields] = UseSignedUrl();
  const { postId } = useParams();
  useEffect(() => {
    console.log(file);
  }, [file]);
  const onSubmit = async function onSubmitComment(e) {
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
      const key = fields.key;
      const audioUrl = `https://nplacebucket.s3.amazonaws.com/${key}`;
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Posts/${postId}/comments`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          text: audioUrl,
        },
      });
      console.log(response.data.comment);
      setComments([response.data.comment, ...comments]);
    } catch (error) {}
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:5000/Notifications`,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        data: {
          action: "commented",
          actorId: currentUserId,
          recipientId: postOwner,
          notifiableId: postId,
          notifiableObject: "post",
        },
      });
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="inline-block h-full w-full">
      <form onSubmit={onSubmit} className="flex flex-row justify-evenly">
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
        <button type="onSubmit">submit</button>
      </form>
    </div>
  );
}

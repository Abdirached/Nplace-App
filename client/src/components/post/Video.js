import React from "react";
import ReactPlayer from "react-player/lazy";

export default function Video({ src }) {
  return <ReactPlayer muted={true} playing={true} controls={true} url={src} />;
}

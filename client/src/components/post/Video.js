import React from "react";
import ReactPlayer from "react-player/lazy";

export default function Video({ src }) {
  return <ReactPlayer url={src} />;
}

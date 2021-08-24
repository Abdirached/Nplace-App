import React from "react";

export default function Video({ src }) {
  return (
    <div>
      <audio controls src={src} className=" p-4" />
    </div>
  );
}

import React from "react";

export default function Video({ src }) {
  return (
    <div className=" sm:ml-4 mt-4">
      <audio
        controls
        src={src}
        className="bg-gray-100 w-4/5 m-auto border rounded border-gray-primary"
      />
    </div>
  );
}

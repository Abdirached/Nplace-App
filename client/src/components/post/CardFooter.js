import React from "react";

export default function CardFooter({ firstname, caption }) {
  return (
    <div className="p-4 pt-2 pb-1">
      <span>{caption}</span>
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import UseLocationListener from "../hooks/UseLocationListner";

export default function Sidebar() {
  const { place } = UseLocationListener();
  return (
    <div className=" relative h-full mb-4 w-4/5 m-auto hidden sm:flex sm:flex-col sm:items-start">
      {place !== null ? (
        <>
          <Link to="/">
            <h1 className="text-xl font-semibold text-red-500  sm:pb-4 sm:pt-2 lg:ml-8">
              {place?.country}
            </h1>
          </Link>
          <Link to="/HomeProvince">
            <h1 className="text-xl font-semibold lg:ml-8">{place?.province}</h1>
          </Link>
        </>
      ) : (
        <Skeleton count={1} width={200} height={100} className="mr-4" />
      )}
    </div>
  );
}

import React from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="loading flex justify-center items-center">
      <ThreeDots
        visible={true}
        height={80}
        width={80}
        color="#4fa94d"
        radius={9}
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}

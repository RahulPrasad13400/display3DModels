import React, { useState } from "react";

const ModelList = ({data}) => {

  return (
    <div
    key={data.id}
    className="flex items-center justify-between border-b p-4 hover:bg-gray-50 transition"
  >
    <div className="flex space-x-28">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="text-gray-600">{data.description}</p>
    </div>
    <button
      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
    >
      Delete
    </button>
  </div>
  );
};

export default ModelList;

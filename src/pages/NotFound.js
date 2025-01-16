import React from "react";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">404</h1>
        <p className="text-lg text-gray-700 mb-6">Page Not Found</p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

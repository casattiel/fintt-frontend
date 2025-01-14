import React, { useState, useEffect } from "react";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket(`${process.env.REACT_APP_BACKEND_URL.replace("http", "ws")}/notifications`);

    // On receiving a new message, add it to the notifications array
    socket.onmessage = (event) => {
      setNotifications((prev) => [...prev, event.data]);
    };

    // Cleanup function to close the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      {notifications.length > 0 ? (
        <ul className="list-disc pl-5">
          {notifications.map((note, index) => (
            <li key={index} className="mb-2 text-gray-700">
              {note}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No notifications yet.</p>
      )}
    </div>
  );
}

export default Notifications;

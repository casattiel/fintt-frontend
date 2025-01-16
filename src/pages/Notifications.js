import React, { useEffect, useState } from "react";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchNotifications() {
            setLoading(true);
            setError(null);

            try {
                const token = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).token : null;
                if (!token) {
                    throw new Error("Unauthorized: Please log in to view your notifications.");
                }

                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/notifications`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || "Failed to fetch notifications.");
                }

                const data = await response.json();
                setNotifications(data.notifications || []);
            } catch (err) {
                setError(err.message || "An error occurred while fetching notifications.");
            } finally {
                setLoading(false);
            }
        }

        fetchNotifications();
    }, []);

    if (loading) {
        return <div>Loading notifications...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="notifications-page">
            <h1>Your Notifications</h1>
            {notifications.length === 0 ? (
                <p>No new notifications</p>
            ) : (
                <ul className="notifications-list">
                    {notifications.map((notification, index) => (
                        <li key={index} className="notification-item">
                            <p>{notification.message}</p>
                            <span className="notification-date">{new Date(notification.date).toLocaleString()}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Notifications;

import React from "react";
import { Notification } from "../types";

interface Props {
  setNotificationPopoverOpen: Function;
  notifications: Notification[];
}

const NotificationPopover = (props: Props) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Notifications</p>
        <a className="card-header-icon" aria-label="more options">
          <button
            className="delete"
            aria-label="close"
            onClick={() => props.setNotificationPopoverOpen(false)}
          ></button>
        </a>
      </header>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "0.5rem",
        }}
      >
        <span
          className="markAllAsRead"
          style={{
            cursor: "pointer",
          }}
        >
          Mark All as Read
        </span>
      </div>
      <div
        style={{
          backgroundColor: "transparent",
          width: "400px",
          maxHeight: "75vh",
          overflowY: "auto",
          padding: "0.5rem",
        }}
      >
        {props.notifications.filter((not) => !not.markedAsRead).length > 0 &&
          props.notifications
            .filter((not) => !not.markedAsRead)
            .map((notification) => (
              <div key={notification.id}>{notification.title}</div>
            ))}
      </div>
    </div>
  );
};

export default NotificationPopover;

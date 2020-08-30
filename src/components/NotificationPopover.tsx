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
          backgroundColor: "transparent",
          width: "400px",
          maxHeight: "75vh",
          overflowY: "auto",
        }}
      >
        {props.notifications.length > 0 &&
          props.notifications.map((notification) => (
            <div key={notification.id}>
              {/* @ts-ignore */}
              {notification.createdAt.toDate().toString()}
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotificationPopover;

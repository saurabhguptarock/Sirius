import React from "react";
import router from "next/router";

interface Props {
  setPlusPopoverOpen: Function;
  setShowCreateBoard: Function;
}

const AddIconPopover = (props: Props) => {
  return (
    <div className="card">
      <header className="card-header">
        <p className="card-header-title">Create</p>
        <a className="card-header-icon" aria-label="more options">
          <button
            className="delete"
            aria-label="close"
            onClick={() => props.setPlusPopoverOpen(false)}
          ></button>
        </a>
      </header>
      <div
        style={{
          backgroundColor: "transparent",
          width: "300px",
        }}
      >
        <div
          className="plus-hover-tile mt-2 px-3 py-2"
          onClick={() => {
            props.setShowCreateBoard(true);
            props.setPlusPopoverOpen(false);
          }}
        >
          <div style={{ display: "flex" }}>
            <i className="fas fa-chess-board">
              <span
                className="ml-2"
                style={{
                  fontFamily: "Nunito",
                  fontWeight: 100,
                  fontSize: "0.9rem",
                }}
              >
                Create board
              </span>
            </i>
          </div>
          <p
            className="mt-1"
            style={{
              fontSize: "0.8rem",
              color: "#999",
              lineHeight: "0.9rem",
            }}
          >
            A board is made up of cards ordered on lists. Use it to manage
            projects, track information, or organize anything.
          </p>
        </div>
        <div
          className="plus-hover-tile mt-2 px-3 py-2"
          onClick={() => {
            props.setPlusPopoverOpen(false);
            router.push("/templates");
          }}
        >
          <div style={{ display: "flex" }}>
            <i className="fas fa-meteor">
              <span
                className="ml-2"
                style={{
                  fontFamily: "Nunito",
                  fontWeight: 100,
                  fontSize: "0.9rem",
                }}
              >
                Start with a template
              </span>
            </i>
          </div>
          <p
            className="mt-1"
            style={{
              fontSize: "0.8rem",
              color: "#999",
              lineHeight: "0.9rem",
            }}
          >
            Get started faster with a board template.
          </p>
        </div>
        <div className="plus-hover-tile mt-2 px-3 py-2">
          <div style={{ display: "flex" }}>
            <i className="fas fa-user-friends">
              <span
                className="ml-2"
                style={{
                  fontFamily: "Nunito",
                  fontWeight: 100,
                  fontSize: "0.9rem",
                }}
              >
                Create team
              </span>
            </i>
          </div>
          <p
            className="mt-1"
            style={{
              fontSize: "0.8rem",
              color: "#999",
              lineHeight: "0.9rem",
            }}
          >
            A team is a group of boards and people. Use it to organize your
            company, side hustle, family, or friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddIconPopover;

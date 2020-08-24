import React, { useState } from "react";
import TextArea from "react-textarea-autosize";
import { connect } from "react-redux";
import { addTile, addCard } from "../store/actions/TileAction";
import { Tile } from "../types";

interface Props {
  isTile: boolean;
  tileProps?: Tile;
  userId: string;
  boardId: string;
  noOfTiles?: number;
  addTile?: Function;
  addCard?: Function;
  dispatch?: Function;
}

const SiriusActionButton = (props: Props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [text, setText] = useState("");

  const handleChangeInput = (e) => setText(e.target.value);

  const handleAddTile = () => {
    if (text) {
      props.dispatch(
        addTile(props.userId, props.boardId, text, props.noOfTiles)
      );
      setText("");
    }
    return;
  };

  const handleAddCard = () => {
    if (text) {
      props.dispatch(
        addCard(
          props.userId,
          props.boardId,
          props.tileProps.id,
          text,
          props.tileProps.items.length,
          props.tileProps.position
        )
      );
      setText("");
    }
    return;
  };

  const renderAddButton = () => {
    const btnText = props.isTile ? "Add another Tile" : "Add another Card";
    const btnTextOpacity = props.isTile ? 1 : 0.5;
    const btnTextColor = props.isTile ? "white" : "inherit";
    const btnTextBackground = props.isTile ? "rgba(0,0,0,0.15)" : "inherit";

    return (
      <div
        onClick={openForm}
        style={{
          opacity: btnTextOpacity,
          color: btnTextColor,
          backgroundColor: btnTextBackground,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          borderRadius: "5px",
          height: 36,
          width: 272,
          paddingLeft: 10,
        }}
      >
        <i className="fas fa-plus"></i>
        <p className="ml-3">{btnText}</p>
      </div>
    );
  };

  const renderForm = () => {
    const placeHolder = props.isTile
      ? "Enter tile Title"
      : "Enter title for the card...";
    const btnTitle = props.isTile ? "Add Tile" : "Add Card";

    return (
      <div>
        <div
          className="card"
          style={{
            overflow: "visible",
            minHeight: 80,
            minWidth: 272,
            padding: "6px 8px 2px",
            borderRadius: "5px",
          }}
        >
          <TextArea
            placeholder={placeHolder}
            autoFocus
            onBlur={closeForm}
            value={text}
            onChange={handleChangeInput}
            style={{
              resize: "none",
              overflow: "hidden",
              width: "100%",
              outline: "none",
              border: "none",
            }}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
          className="mt-3"
        >
          <button
            onMouseDown={props.isTile ? handleAddTile : handleAddCard}
            className="button is-success"
          >
            {btnTitle}
          </button>
          <i style={{ cursor: "pointer" }} className="fas fa-times ml-3"></i>
        </div>
      </div>
    );
  };

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  return formOpen ? renderForm() : renderAddButton();
};

export default connect()(SiriusActionButton);

import React from "react";
import SiriusCard from "./SiriusCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SiriusActionButton from "./SiriusActionButton";
import { Tile } from "../types";

interface Props {
  tile: Tile;
}

const SiriusList = (props: Props) => {
  return (
    <Droppable droppableId={props.tile.id}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            backgroundColor: "#ccc",
            height: "100%",
            marginRight: "8px",
          }}
        >
          <h4 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {props.tile.title}
          </h4>
          {props.tile.items.map((item) => (
            <SiriusCard key={item.cardId} item={item} />
          ))}
          {provided.placeholder}
          <SiriusActionButton
            isList={false}
            tileProps={props.tile}
            // userId={userId}
            // boardId={boardId}
            // tileId={tileId}
            // noOfCards={cards.length}
            // tilePosition={tilePosition}
          />
        </div>
      )}
    </Droppable>
  );
};

export default SiriusList;

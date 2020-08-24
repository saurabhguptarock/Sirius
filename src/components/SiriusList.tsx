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
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            backgroundColor: "#ccc",
            height: "100%",
            marginRight: "8px",
          }}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h4 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {props.tile.title}
          </h4>
          {props.tile.items.map((item) => (
            <SiriusCard key={item.cardId} item={item} />
          ))}
          <SiriusActionButton
            isList={false}
            // userId={userId}
            // boardId={boardId}
            // tileId={tileId}
            // noOfCards={cards.length}
            // tilePosition={tilePosition}
          />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SiriusList;

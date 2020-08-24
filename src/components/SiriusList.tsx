import React from "react";
import SiriusCard from "./SiriusCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SiriusActionButton from "./SiriusActionButton";
import { Tile } from "../types";

interface Props {
  tile: Tile;
  idx: number;
}

const SiriusList = (props: Props) => {
  return (
    <Draggable draggableId={props.tile.id} index={props.idx}>
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          className="draggableTile"
        >
          <Droppable
            droppableId={props.tile.id}
            direction="vertical"
            type="item"
          >
            {(dropProvided) => (
              <div ref={dropProvided.innerRef} {...dropProvided.droppableProps}>
                <h4 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
                  {props.tile.title}
                </h4>
                {props.tile.items.map((item, i) => (
                  <SiriusCard key={item.cardId} item={item} index={i} />
                ))}
                {dropProvided.placeholder}
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
        </div>
      )}
    </Draggable>
  );
};

export default SiriusList;

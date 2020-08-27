import React from "react";
import SiriusCard from "./SiriusCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SiriusActionButton from "./SiriusActionButton";
import { Tile } from "../types";

interface Props {
  tile: Tile;
  idx: number;
  boardId: string;
  userId: string;
  setModalActive: Function;
  setModalData: Function;
}

const SiriusList = (props: Props) => {
  return (
    // TODO : change to only drag if grabbed from title
    // <div className="draggableTile">

    // </div>
    <Draggable draggableId={props.tile.id} index={props.idx}>
      {(dragProvided) => (
        <div
          ref={dragProvided.innerRef}
          {...dragProvided.draggableProps}
          {...dragProvided.dragHandleProps}
          className="draggableTile mt-5"
        >
          <h4 style={{ fontSize: "1.5rem", fontWeight: 600 }}>
            {props.tile.title}
          </h4>
          <Droppable
            droppableId={props.tile.id}
            direction="vertical"
            type="item"
          >
            {(dropProvided) => (
              <div
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                className="innerDraggable"
              >
                {props.tile.items.map((item, i) => (
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      props.setModalActive(true);
                      props.setModalData(item);
                    }}
                  >
                    <SiriusCard key={item.cardId} item={item} index={i} />
                  </div>
                ))}
                {dropProvided.placeholder}
                <SiriusActionButton
                  isTile={false}
                  tileProps={props.tile}
                  userId={props.userId}
                  boardId={props.boardId}
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

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Item } from "../types";

interface Props {
  item: Item;
  index: number;
}

const SiriusCard = (props: Props) => {
  return (
    <Draggable draggableId={props.item.cardId} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-3"
        >
          <div
            className="card"
            style={{
              borderRadius: "3px",
            }}
          >
            <div
              className="card-content"
              style={{
                padding: "0.6rem",
              }}
            >
              <p style={{ wordWrap: "break-word" }}>{props.item.title}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SiriusCard;

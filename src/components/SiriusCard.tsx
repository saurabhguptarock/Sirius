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
              boxShadow: "0 1.5px 1.5px 0 rgba(0, 0, 0, 0.2)",
              minWidth: 270,
              maxWidth: 270,
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

import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Item } from "../types";

interface Props {
  item: Item;
}

const SiriusCard = (props: Props) => {
  return (
    <Draggable draggableId={props.item.cardId} index={props.item.position}>
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
              borderRadius: "5px",
            }}
          >
            <div className="card-content">
              <p>{props.item.title}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SiriusCard;

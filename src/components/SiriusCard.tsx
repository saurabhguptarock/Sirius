import React from "react";
import { Draggable } from "react-beautiful-dnd";

const SiriusCard = ({ content, id, idx }) => {
  return (
    <Draggable draggableId={id} index={idx}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className="card mt-3"
            style={{
              borderRadius: "5px",
              marginBottom: "8px",
            }}
          >
            <div className="card-content">
              <p>{content}</p>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default SiriusCard;

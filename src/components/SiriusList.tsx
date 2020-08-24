import React from "react";
import SiriusCard from "./SiriusCard";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SiriusActionButton from "./SiriusActionButton";

const SiriusList = ({
  title,
  tileId,
  cards,
  idx,
  userId,
  boardId,
  tilePosition,
}) => {
  return (
    <Draggable draggableId={tileId} index={idx}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "5px",
            backgroundColor: "#ccc",
            height: "100%",
            marginRight: "8px",
          }}
        >
          <Droppable droppableId={tileId}>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <h4 style={{ fontSize: "1.5rem", fontWeight: 600 }}>{title}</h4>
                {cards.map((card, i) => (
                  <SiriusCard
                    key={card.cardId}
                    content={card.title}
                    id={card.cardId}
                    idx={i}
                  />
                ))}
                <SiriusActionButton
                  list={false}
                  userId={userId}
                  boardId={boardId}
                  tileId={tileId}
                  noOfCards={cards.length}
                  tilePosition={tilePosition}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default SiriusList;

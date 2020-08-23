import React from "react";
import SiriusCard from "./SiriusCard";
import { Droppable } from "react-beautiful-dnd";
import SiriusActionButton from "./SiriusActionButton";

const SiriusList = ({ title, tileId, cards }) => {
  return (
    <Droppable droppableId={tileId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
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
          <h4 style={{ fontSize: "1.5rem", fontWeight: 600 }}>{title}</h4>
          {cards.map((card, i) => (
            <SiriusCard
              key={card.cardId}
              content={card.title}
              id={card.cardId}
              idx={i}
            />
          ))}
          <SiriusActionButton list={false} tileId={tileId} />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default SiriusList;

import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <li
          className={`flex items-center justify-center bg-white w-full max-w-[250px] min-h-[72px] my-1 mx-0 rounded-sm ${
            snapshot.isDragging ? "dragging" : ""
          }`}
          style={{ overflowWrap: "anywhere" }}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {card.name}
        </li>
      )}
    </Draggable>
  );
};

export default Card;

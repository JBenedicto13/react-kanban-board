import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const List = ({ cards, list, index }) => {
  return (
    <Draggable key={list.id} draggableId={list.id} index={index} type="LIST">
      {(provided, snapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? "#E2FCEF" : "#EBECF0",
          ...provided.draggableProps.style,
        };
        return (
          <div
            className="list-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
          >
            <div className="list-header">
              <h4>{list.title}</h4>
            </div>
            <Droppable droppableId={list.id}>
              {(provided, snapshot) => (
                <ul
                  className={`card-list ${
                    snapshot.isDraggingOver
                      ? "dragging-over"
                      : snapshot.draggingFromThisWith
                      ? "dragging-from-with"
                      : ""
                  }`}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {list.itemIds.map((cardId, index) => {
                    const card = cards[cardId];
                    return <Card key={cardId} card={card} index={index} />;
                  })}
                  {provided.placeholder}
                  <div className="composer-container composer-container__card">
                    <button>
                      <span>+</span>
                      <span>Add Card</span>
                    </button>
                  </div>
                </ul>
              )}
            </Droppable>
          </div>
        );
      }}
    </Draggable>
  );
};

export default List;

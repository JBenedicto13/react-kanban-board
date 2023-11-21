import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Card from "./Card";

const List = ({ cards, list, index, removeList }) => {
  return (
    <Draggable key={list.id} draggableId={list.id} index={index} type="LIST">
      {(provided, snapshot) => {
        const style = {
          backgroundColor: snapshot.isDragging ? "#E2FCEF" : "#EBECF0",
          ...provided.draggableProps.style,
        };
        return (
          <div
            className="flex flex-col items-center justify-center text-center min-w-[250px] min-h-[250px] mx-2 rounded"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={style}
          >
            <div className="list-header w-full flex">
              <h4 className="grow m-0 p-2 text-left hover:bg-hover-header hover:rounded">
                {list.title}
              </h4>
              <span
                onClick={() => removeList(list.id)}
                className="w-10 flex items-center justify-center hover:bg-custom-pink hover:rounded cursor-pointer"
              >
                X
              </span>
            </div>
            <Droppable droppableId={list.id}>
              {(provided, snapshot) => (
                <ul
                  className={`card-list flex flex-col items-center grow list-none p-2 mx-2 min-h-[100px] w-full ${
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
                  <div className="flex min-w-[250px] mx-0 my-1">
                    <button className="flex items-center grow h-8 cursor-pointer border-none text-sm rounded text-slate-950 bg-slate-50 hover:bg-hover-card">
                      <span className="w-1/5">+</span>
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

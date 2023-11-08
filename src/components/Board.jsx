import React from "react";
import { Droppable } from "react-beautiful-dnd";
import List from "./List";

const Board = ({ lists, cards, addList }) => {
  return (
    <div className="board-container">
      <Droppable droppableId="lists" direction="horizontal" type="LIST">
        {(provided) => (
          <ol
            className="lists-container"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Object.values(lists).map((list, index) => (
              <li key={list.id}>
                <List cards={cards} list={list} index={index} />
              </li>
            ))}
            {provided.placeholder}
            <div className="composer-container composer-container__list">
              <button onClick={addList}>
                <span>+</span>
                <span>Add List</span>
              </button>
            </div>
          </ol>
        )}
      </Droppable>
    </div>
  );
};

export default Board;

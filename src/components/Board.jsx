import React from "react";
import { Droppable } from "react-beautiful-dnd";
import List from "./List";

const Board = ({ lists, cards, addList, removeList }) => {
  return (
    <div className="board-container min-h-full min-w-full">
      <Droppable droppableId="lists" direction="horizontal" type="LIST">
        {(provided) => (
          <ol
            className="flex flex-row justify-start list-none select-none my-0 mx-2"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {Object.values(lists).map((list, index) => (
              <li key={list.id}>
                <List cards={cards} list={list} index={index} removeList={removeList} />
              </li>
            ))}
            {provided.placeholder}
            <div className="flex min-w-[250px] mx-3 my-0">
              <button
                className="flex items-center grow h-8 cursor-pointer border-none text-sm rounded text-slate-50 bg-custom-white hover:bg-hover-list"
                onClick={addList}
              >
                <span className="w-1/5">+</span>
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

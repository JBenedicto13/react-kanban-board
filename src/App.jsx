import { useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import Board from "./components/Board";

const cardData = {
  gary: {
    id: "gary",
    name: "Gary Goodspeed",
    thumb: "/images/gary.png",
  },
  cato: {
    id: "cato",
    name: "Little Cato",
    thumb: "/images/cato.png",
  },
  kvn: {
    id: "kvn",
    name: "KVN",
    thumb: "/images/kvn.png",
  },
  mooncake: {
    id: "mooncake",
    name: "Mooncake",
    thumb: "/images/mooncake.png",
  },
  quinn: {
    id: "quinn",
    name: "Quinn Ergon asddddddddddddddddddddddddddddddddddddasdasdasdkhasdahsdasdvjhasdasdasdj",
    thumb: "/images/quinn.png",
  },
};

const listData = {
  "list-1": {
    id: "list-1",
    title: "List 1",
    itemIds: ["gary", "cato", "quinn"],
  },
  "list-2": {
    id: "list-2",
    title: "List 2",
    itemIds: ["kvn", "mooncake"],
  },
};

function App() {
  const [cards, setCards] = useState(cardData);
  const [lists, setLists] = useState(listData);

  const handleAddList = () => {
    // Generate a unique ID for the new list (you can use a library or a unique key generator)
    const newListId = `list-${Object.keys(lists).length + 1}`;

    // Create the new list object
    const newList = {
      id: newListId,
      title: `List ${Object.keys(lists).length + 1}`,
      itemIds: [],
    };

    // Update the state to include the new list
    setLists((prevListData) => ({
      ...prevListData,
      [newListId]: newList,
    }));
  };

  const handleRemoveList = (listId) => {
    // Create a copy of the state object
    const updatedLists = { ...lists };

    // Remove the list with the specified ID
    delete updatedLists[listId];

    // Update the state with the removed list
    setLists(updatedLists);
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const sourceList = lists[result.source.droppableId];
    const destinationList = lists[result.destination.droppableId];
    const draggedCard = cardData[result.draggableId];

    if (result.type === "LIST") {
      // Reorder lists
      const newLists = Array.from(Object.values(lists));
      const movedList = newLists.splice(result.source.index, 1)[0];
      newLists.splice(result.destination.index, 0, movedList);

      const newListsObject = {};
      newLists.forEach((list, index) => {
        newListsObject[`list-${index + 1}`] = {
          ...list,
          id: `list-${index + 1}`,
        };
      });

      setLists(newListsObject);
    } else if (sourceList === destinationList) {
      // Reorder within the same list
      const newCardIds = Array.from(sourceList.itemIds);
      newCardIds.splice(result.source.index, 1);
      newCardIds.splice(result.destination.index, 0, result.draggableId);

      const newList = {
        ...sourceList,
        itemIds: newCardIds,
      };

      setLists({ ...lists, [newList.id]: newList });
    } else {
      // Move to a different column
      const sourceCardIds = Array.from(sourceList.itemIds);
      sourceCardIds.splice(result.source.index, 1);
      const newSourceList = {
        ...sourceList,
        itemIds: sourceCardIds,
      };

      const destinationCardIds = Array.from(destinationList.itemIds);
      destinationCardIds.splice(
        result.destination.index,
        0,
        result.draggableId
      );
      const newDestinationList = {
        ...destinationList,
        itemIds: destinationCardIds,
      };

      setLists({
        ...lists,
        [newSourceList.id]: newSourceList,
        [newDestinationList.id]: newDestinationList,
      });
    }
  }

  return (
    <div className="app">
      <div className="header text-center text-slate-50">
        <h1 className=" text-4xl font-bold mb-3">Kanban Board</h1>
      </div>
      <div className="board-container min-h-screen min-w-full">
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Board
            cards={cards}
            lists={lists}
            addList={handleAddList}
            removeList={(listId) => handleRemoveList(listId)}
          />
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;

import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import userdata from "../Data.json";
import { useState } from "react";

export default function DragDrop() {
  const [users, setUsers] = useState(userdata.data);

  const handleDragEnd = (e) => {
    if (!e.destination) return; // edge case drag outside the table
    let tempData = Array.from(users);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setUsers(tempData);
  };
  return (
    <div className="App mt-5">
      <h4>Drag and Drop</h4>
      <DragDropContext onDragEnd={handleDragEnd}>
        <table className="table table-striped w-50 m-auto">
          <thead>
            <tr>
              <th>Username</th>
              <th>Age</th>
              <th>Gender</th>
            </tr>
          </thead>
          <Droppable droppableId="droppable-1">
            {(provider, snapshot) => (
              <tbody
                className="text-capitalize"
                ref={provider.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "lightgray"
                    : "grey",
                }}
                {...provider.droppableProps}
              >
                {users?.map((user, index) => (
                  <Draggable
                    key={user.name}
                    draggableId={user.name}
                    index={index}
                  >
                    {(provider) => (
                      <tr
                        {...provider.draggableProps}
                        ref={provider.innerRef}
                        {...provider.dragHandleProps}
                      >
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.gender}</td>
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provider.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </DragDropContext>
    </div>
  );
}

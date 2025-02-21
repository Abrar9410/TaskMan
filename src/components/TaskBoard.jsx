import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const categories = ['To-Do', 'In Progress', 'Done'];

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Task 1', category: 'To-Do', order: 0 },
        { id: '2', title: 'Task 2', category: 'In Progress', order: 0 },
        { id: '3', title: 'Task 3', category: 'Done', order: 0 },
    ]);

    // 1. Handle Drag End with Optimistic UI
    const onDragEnd = async (result) => {
        if (!result.destination) return;

        // Clone the tasks to revert if needed
        // const previousTasks = [...tasks];

        // 2. Optimistically update the order in UI
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(result.source.index, 1);

        // Update category and order
        movedTask.category = categories[result.destination.droppableId];
        updatedTasks.splice(result.destination.index, 0, movedTask);

        // Reassign order for all tasks within the category
        const categoryTasks = updatedTasks.filter(
            (task) => task.category === movedTask.category
        );
        categoryTasks.forEach((task, index) => {
            task.order = index;
        });

        setTasks(updatedTasks);

        // 3. API Call to Save Order in Background
        // try {
        //     await fetch('http://localhost:5000/tasks/update-order', {
        //         method: 'PUT',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ tasks: categoryTasks }),
        //     });
        // } catch (error) {
        //     // 4. Revert UI if API call fails
        //     console.error('Failed to update order:', error);
        //     setTasks(previousTasks);
        // }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
                {categories.map((category, index) => (
                    <Droppable key={category} droppableId={String(index)}>
                        {(provided) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={`${category === 'To-Do' && 'bg-red-500'} ${category === 'In Progress' && 'bg-yellow-500'} ${category === 'Done' && 'bg-green-500'} rounded-lg p-4 min-h-[200px]`}
                            >
                                <h2 className="text-lg font-bold mb-2">{category}</h2>
                                {tasks
                                    .filter((task) => task.category === category)
                                    .sort((a, b) => a.order - b.order) // Sort tasks by order
                                    .map((task, index) => (
                                        <Draggable key={task.id} draggableId={task.id} index={index}>
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className="bg-white rounded-lg shadow p-3 mb-2 cursor-grab"
                                                >
                                                    {task.title}
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </div>
        </DragDropContext>
    );
};

export default TaskBoard;
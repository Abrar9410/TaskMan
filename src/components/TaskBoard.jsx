import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import NewTaskModal from './NewTaskModal';
import { axiosAll } from '../utilities/utilities';

const categories = ['To-Do', 'In Progress', 'Done'];

const TaskBoard = () => {
    const [tasks, setTasks] = useState([
        { id: '1', title: 'Task 1', description: 'korte hobr jevabei hok', category: 'To-Do', order: 0 },
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
        //     const {data} = await axiosAll.put('/tasks/update-order', { tasks: categoryTasks });
        //     if (data.modifiedCount>0) {
        //         console.log('database updated');
        //     };
        // } catch (error) {
        //     // 4. Revert UI if API call fails
        //     console.error('Failed to update order:', error);
        //     setTasks(previousTasks);
        // }
    };

    return (
        <>
            <div className="my-16 flex justify-center">
                <button onClick={()=>document.getElementById('add-task').showModal()} className='w-max px-2 pb-1 bg-orange-500 text-white rounded-md shadow-md cursor-pointer outline-none'>
                    <span className='text-2xl font-semibold'>+</span>
                    <span className='text-lg font-semibold'> Add New Task</span>
                </button>
            </div>
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
                                    <h2 className="text-lg font-bold text-center mb-2">{category}</h2>
                                    {tasks
                                        .filter((task) => task.category === category)
                                        .sort((a, b) => a.order - b.order) // Sort tasks by order
                                        .map((task, index) => (
                                            <div key={task.id} className="flex gap-2">
                                                <p className='w-max text-lg text-black font-bold pt-3'>{index + 1}.</p>
                                                <Draggable draggableId={task.id} index={index}>
                                                    {(provided) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className="bg-white text-black w-full rounded-lg shadow p-3 mb-2 cursor-grab"
                                                        >
                                                            <h3 className='text-lg font-bold'>{task.title}</h3>
                                                            <p>{task.description || ''}</p>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            </div>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
            <NewTaskModal></NewTaskModal>
        </>
    );
};

export default TaskBoard;
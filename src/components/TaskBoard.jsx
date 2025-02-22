import { useContext, useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import NewTaskModal from './NewTaskModal';
import { axiosAll } from '../utilities/utilities';
import { AuthContext } from '../AuthContext';

const categories = ['To-Do', 'In Progress', 'Done'];

const TaskBoard = () => {

    const { user } = useContext(AuthContext);
    const [tasks, setTasks] = useState([]);

    const getAllTasks = async userEmail => {
        const { data } = await axiosAll(`/tasks/${userEmail}`);
        setTasks(data);
    }

    useEffect(() => {
        if (user) {
            getAllTasks(user.email);
        }
    }, [user])

    // 1. Handle Drag End with Optimistic UI
    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination) return; // Drag outside any droppable

        // Copy tasks for optimistic update
        const previousTasks = [...tasks];

        // 1. Find the moved task
        const movedTaskIndex = tasks.findIndex(task => task._id === result.draggableId);
        const movedTask = tasks[movedTaskIndex];

        // 2. Optimistically update task category and order
        movedTask.category = destination.droppableId;
        const updatedTasks = previousTasks.filter(task => task._id !== movedTask._id); // Remove from old category
        updatedTasks.splice(destination.index, 0, movedTask); // Insert into new category

        // 3. Reassign order for tasks within the category
        updatedTasks
            .filter(task => task.category === destination.droppableId)
            .forEach((task, index) => {
                task.order = index;
            });

        setTasks(updatedTasks);

        // 4. Update database in the background
        try {
            const categoryTasks = updatedTasks.filter(task => task.category === movedTask.category);
            const { data } = await axiosAll.put('/tasks/update-order', { tasks: categoryTasks });
            if (data.modifiedCount > 0) console.log('Database updated');
        } catch (error) {
            console.error('Failed to update order:', error);
            setTasks(previousTasks); // Revert if API call fails
        }
    };

    return (
        <>
            <div className="my-16 flex justify-center">
                <button onClick={() => document.getElementById('add-task').showModal()} className='w-max px-2 pb-1 bg-orange-500 text-white rounded-md shadow-md cursor-pointer outline-none'>
                    <span className='text-2xl font-semibold'>+</span>
                    <span className='text-lg font-semibold'> Add New Task</span>
                </button>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-16">
                    {categories.map((category) => (
                        <Droppable key={category} droppableId={category}>
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
                                            <div key={task._id} className="flex gap-2">
                                                <p className='w-max text-lg text-black font-bold pt-3'>{index + 1}.</p>
                                                <Draggable draggableId={task._id} index={index}>
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
            <NewTaskModal userEmail={user.email} getAllTasks={getAllTasks}></NewTaskModal>
        </>
    );
};

export default TaskBoard;
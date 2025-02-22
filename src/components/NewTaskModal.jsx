import { axiosAll } from "../utilities/utilities";


const NewTaskModal = ({userEmail, getAllTasks}) => {

    const handleAddTask = async e => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const dueDate = new Date(form.dueDate.value);
        const description = form.description.value;
        const newTask = {
            title,
            description,
            dueDate,
            userEmail
        }
        const {data} = await axiosAll.post(`/tasks/${userEmail}`, newTask);
        if (data.insertedId) {
            getAllTasks(userEmail);
            form.reset();
            document.getElementById('add-task').close();
        }
    }

    return (
        <dialog id='add-task' className="rounded-lg p-6 w-11/12 sm:w-10/12 md:w-3/4 xl:w-1/2 fixed inset-0 m-auto bg-white backdrop:bg-black/50">
            <h2 className="text-center text-3xl text-black mb-8">Add New Task</h2>
            <form onSubmit={handleAddTask} className="flex flex-col gap-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-col gap-1 w-full">
                        <label className="text-lg text-black font-semibold">Title</label>
                        <input type="text" placeholder="title" name="title" className="h-12 px-4 py-2 border border-gray-400 rounded-md" required/>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-lg text-black font-semibold">Due Date</label>
                        <input type="datetime-local" placeholder="title" name="dueDate" className="h-12 px-4 py-2 border border-gray-400 rounded-md" />
                    </div>
                </div>
                <div className="flex flex-col gap-1 w-full">
                    <label className="text-lg text-black font-semibold">Description</label>
                    <textarea placeholder="write details" name="description" className="w-full h-32 p-4 border border-gray-400 rounded-md"/>
                </div>
                <input type="submit" value="Add Task" className="w-full mt-4 p-2 bg-green-500 text-white font-semibold cursor-pointer hover:scale-105 outline-none" />
            </form>
            <button 
                onClick={() => document.getElementById('add-task').close()}
                className="w-full mt-4 p-2 bg-gray-400 text-white font-semibold cursor-pointer">
                    Cancel
            </button>
        </dialog>
    );
};

export default NewTaskModal;
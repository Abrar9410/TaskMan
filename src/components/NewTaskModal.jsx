

const NewTaskModal = () => {
    return (
        <dialog id='add-task' className="rounded-lg p-6 w-11/12 sm:w-10/12 md:w-3/4 xl:w-1/2 fixed inset-0 m-auto bg-white backdrop:bg-black/50">
            <h2 className="text-center text-3xl text-black">Add New Task</h2>
            <form >
                
            </form>
            <button onClick={()=>document.getElementById('add-task').close()}>Cancel</button>
        </dialog>
    );
};

export default NewTaskModal;
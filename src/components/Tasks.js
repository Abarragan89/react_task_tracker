import Task from './Task'

//The onDelete function just get's passes as a  prop to get passed as a prop to task
const Tasks = ({ tasks, onDelete, onToggle }) => {
    return (
        //returns an array of each item after they went 
        //through the function
        <>
        {tasks.map((task) => (
            //each needs to have a uniqe identifier. 
        <Task
            key={task.id}
            task={task} 
            onDelete={onDelete} 
            onToggle={onToggle}
        />
        ))}
        </>
    )
}

export default Tasks 
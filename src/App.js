import { useState, useEffect } from 'react'
import { Routes, BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  //setTasks is the hook
  //It rerenders the state
  //similar to this.statetasks && this.setState()
  //this is destructing. it is an array
  //it returns currentState and an function to update it.
  //the argument of useState is the 
  const [showAddTask, setShowAddTask] = useState(false)
  const[tasks, setTasks] = useState ([])

  useEffect(() => { 
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

    //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:3000/tasks')
    const data = await res.json()
    return data
  }

  //Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:3000/tasks/${id}`)
    const data = await res.json()
    return data
  }


//Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updatedTask = {...taskToToggle, 
  reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:3000/tasks/${id}`, 
  { method: 'PUT', 
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updatedTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id
  ? {...task, reminder: data.reminder} :
  task)
  )
}

//Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:3000/tasks', 
    { method: 'POST', 
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)})

  const data = await res.json()

  setTasks([...tasks, data])

  // const id = Math.floor(Math.random() * 10000) + 1
  // const newTask = { id, ...task }
  // setTasks([...tasks, newTask])
}

// Delete Task
const deleteTask = async (id) => {
  //deletes from the server. No variable because we are 
  //only deleting data and not storing it. 
  await fetch
    (`http://localhost:3000/tasks/${id}`, 
    { method: 'DELETE' })
  //setTasks updates the current state of tasks
  setTasks(tasks.filter((task) => task.id !== id))
}



  return (
    <Router>
      
        {/* Looks like html, but it is really JSX */}
        <div className="container">
        {/* Hello is a prop */}
        <Header onAdd={() => setShowAddTask(!showAddTask)} 
        showAdd={showAddTask} />
        <Routes>
        <Route path='/' element={
          <>
          {showAddTask && <AddTask onAdd={addTask}  />}
          { /* this is the function getting called with arguments */}
          {tasks.length > 0 ?  
            (<Tasks 
              tasks={tasks} 
              onDelete={deleteTask} 
              onToggle={toggleReminder}/>
              ) : (
                'No tasks to show') 
            }
          </>
        }
        />
        <Route path='/about' element={<About />} />
        </Routes>
        <Footer />  
        
      </div>
    
    </Router>
  );
}

export default App;


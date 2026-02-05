import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks } from './api';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Task Master</h1>

      <TaskForm onTaskAdded={fetchTasks} />

      <div style={{ marginTop: '2rem' }}>
        <h2 style={{ marginBottom: '1rem', color: '#e2e8f0' }}>Your Tasks</h2>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#94a3b8' }}>Loading tasks...</p>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskUpdated={fetchTasks}
            onTaskDeleted={fetchTasks}
          />
        )}
      </div>
    </div>
  );
}

export default App;

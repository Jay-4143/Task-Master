import React from 'react';
import { updateTask, deleteTask } from '../api';

const TaskList = ({ tasks, onTaskUpdated, onTaskDeleted }) => {
    const handleStatusChange = async (task, newStatus) => {
        try {
            await updateTask(task._id, { status: newStatus });
            onTaskUpdated();
        } catch (error) {
            console.error('Failed to update task status', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await deleteTask(id);
                onTaskDeleted();
            } catch (error) {
                console.error('Failed to delete task', error);
            }
        }
    };

    if (tasks.length === 0) {
        return (
            <div className="glass-panel" style={{ textAlign: 'center', padding: '3rem' }}>
                <p style={{ color: '#94a3b8', fontSize: '1.2rem' }}>No tasks found. Create one above!</p>
            </div>
        );
    }

    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <li key={task._id} className="task-item">
                    <div className="task-content">
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <span className={`status-badge status-${task.status}`}>
                            {task.status.replace('-', ' ')}
                        </span>
                    </div>
                    <div className="task-actions">
                        <select
                            className="form-control"
                            style={{ width: 'auto', padding: '0.4rem', fontSize: '0.9rem' }}
                            value={task.status}
                            onChange={(e) => handleStatusChange(task, e.target.value)}
                        >
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button
                            className="btn btn-danger"
                            style={{ padding: '0.4rem 0.8rem' }}
                            onClick={() => handleDelete(task._id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;

import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ onTaskAdded }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setError('Title is required');
            return;
        }

        try {
            await createTask({ title, description });
            setTitle('');
            setDescription('');
            setError('');
            onTaskAdded();
        } catch (err) {
            setError('Failed to add task. Please try again.');
        }
    };

    return (
        <div className="glass-panel form-group">
            <h2 style={{ marginTop: 0 }}>Add New Task</h2>
            {error && <p style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Task Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="What needs to be done?"
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Description (Optional)</label>
                    <textarea
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Add some details..."
                        rows="3"
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                    Create Task
                </button>
            </form>
        </div>
    );
};

export default TaskForm;

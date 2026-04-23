import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = 'http://localhost:5000/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await axios.post(API_URL, { title, description, priority });
      setTitle('');
      setDescription('');
      setPriority('medium');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (task) => {
    try {
      await axios.put(`${API_URL}/${task.id}`, {
        ...task,
        completed: task.completed ? 0 : 1,
      });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const startEdit = (task) => {
    setEditingId(task.id);
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/${editingId}`, {
        title,
        description,
        priority,
        completed: tasks.find((t) => t.id === editingId)?.completed || 0,
      });
      setEditingId(null);
      setTitle('');
      setDescription('');
      setPriority('medium');
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed === 1;
    if (filter === 'pending') return task.completed === 0;
    return true;
  });

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  return (
    <div className="app">
      <h1>Task Manager</h1>

      <form onSubmit={editingId ? updateTask : addTask} className="task-form">
        <input
          type="text"
          placeholder="Task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description (optional)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
        <div className="form-buttons">
          <button type="submit" className="btn-primary">
            {editingId ? 'Update Task' : 'Add Task'}
          </button>
          {editingId && (
            <button type="button" className="btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="filters">
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          All
        </button>
        <button className={filter === 'pending' ? 'active' : ''} onClick={() => setFilter('pending')}>
          Pending
        </button>
        <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>
          Completed
        </button>
      </div>

      <div className="task-list">
        {filteredTasks.length === 0 ? (
          <p className="no-tasks">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <div className="task-content">
                <div className="task-header">
                  <h3>{task.title}</h3>
                  <span className={`priority-badge ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
                {task.description && <p className="task-desc">{task.description}</p>}
                <small className="task-date">
                  {new Date(task.created_at).toLocaleString()}
                </small>
              </div>
              <div className="task-actions">
                <button
                  className={`btn-toggle ${task.completed ? 'completed' : ''}`}
                  onClick={() => toggleComplete(task)}
                  title={task.completed ? 'Mark as pending' : 'Mark as completed'}
                >
                  {task.completed ? '↩' : '✓'}
                </button>
                <button className="btn-edit" onClick={() => startEdit(task)} title="Edit">
                  ✎
                </button>
                <button className="btn-delete" onClick={() => deleteTask(task.id)} title="Delete">
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="stats">
        <span>Total: {tasks.length}</span>
        <span>Pending: {tasks.filter((t) => !t.completed).length}</span>
        <span>Completed: {tasks.filter((t) => t.completed).length}</span>
      </div>
    </div>
  );
}

export default App;


import React, { useState } from 'react';
import { getTasks, saveTasks } from '../data';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('');
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState({ title: '', priority: '', status: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = { title: '', priority: '', status: '' };
        let hasError = false;

        if (!title.trim()) {
            newErrors.title = 'Task name is required.';
            hasError = true;
        }
        if (!priority) {
            newErrors.priority = 'Please select a priority.';
            hasError = true;
        }
        if (!status) {
            newErrors.status = 'Please select a status.';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const newTask = {
            id: Date.now(),
            title,
            description,
            priority,
            status,
            completed: false,
        };

        const tasks = getTasks();
        tasks.push(newTask);
        saveTasks(tasks);

        navigate('/');
    };

    const handleBack = (event) => {
        event.preventDefault();
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 max-w-lg">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                Add New Task
            </h1>
            <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-gray-600 transition mb-4 text-sm sm:text-base w-full sm:w-auto cursor-pointer"
            >
                Back
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            setErrors((prev) => ({ ...prev, title: e.target.value.trim() ? '' : prev.title }));
                        }}
                        placeholder="Task Name"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.title && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title}</p>}
                </div>
                <div>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                        rows="4"
                    />
                </div>
                <div>
                    <select
                        value={priority}
                        onChange={(e) => {
                            setPriority(e.target.value);
                            setErrors((prev) => ({ ...prev, priority: e.target.value ? '' : prev.priority }));
                        }}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select a Priority
                        </option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    {errors.priority && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.priority}</p>}
                </div>
                <div>
                    <select
                        value={status}
                        onChange={(e) => {
                            setStatus(e.target.value);
                            setErrors((prev) => ({ ...prev, status: e.target.value ? '' : prev.status }));
                        }}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Select a Status
                        </option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.status}</p>}
                </div>
                <button
                    className="w-full bg-blue-600 text-white px-3 rounded-md py-2 sm:px-4 sm:py-2 hover:bg-blue-700 transition text-sm sm:text-base cursor-pointer"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
};

export default AddTask;
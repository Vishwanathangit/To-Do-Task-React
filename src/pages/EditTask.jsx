import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTasks, saveTasks } from '../data';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [task, setTask] = useState(null);
    const [errors, setErrors] = useState({ title: '', priority: '', status: '' });

    useEffect(() => {
        const tasks = getTasks();
        const taskToEdit = tasks.find((t) => t.id === Number(id));
        if (taskToEdit) {
            setTask(taskToEdit);
        } else {
            alert('Task not found');
            navigate('/');
        }
    }, [id, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = { title: '', priority: '', status: '' };
        let hasError = false;

        if (!task.title.trim()) {
            newErrors.title = 'Task name is required.';
            hasError = true;
        }
        if (!task.priority) {
            newErrors.priority = 'Please select a priority.';
            hasError = true;
        }
        if (!task.status) {
            newErrors.status = 'Please select a status.';
            hasError = true;
        }

        if (hasError) {
            setErrors(newErrors);
            return;
        }

        const updatedTask = { ...task };

        const tasks = getTasks().map((t) =>
            t.id === Number(id) ? updatedTask : t
        );

        saveTasks(tasks);
        alert('Task updated!');
        navigate('/');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: value ? '' : prev[name] }));
    };

    return (
        task && (
            <div className="container mx-auto p-4 sm:p-6 max-w-lg">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
                    Edit Task
                </h1>
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-gray-600 transition mb-4 text-sm sm:text-base w-full sm:w-auto cursor-pointer"
                >
                    Back
                </button>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="title"
                            value={task.title}
                            onChange={handleChange}
                            placeholder="Task Name"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.title && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div>
                        <textarea
                            name="description"
                            value={task.description}
                            onChange={handleChange}
                            placeholder="Description"
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                            rows="4"
                        />
                    </div>
                    <div>
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
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
                            name="status"
                            value={task.status}
                            onChange={handleChange}
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
                        Update Task
                    </button>
                </form>
            </div>
        )
    );
};

export default EditTask;
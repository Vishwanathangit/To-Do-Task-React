import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, saveTasks } from '../data';

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [sortByPriority, setSortByPriority] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5;
    const navigate = useNavigate();

    useEffect(() => {
        const storedTasks = getTasks();
        const tasksWithDefaults = storedTasks.map((task) => ({
            ...task,
            priority: task.priority || 'Medium',
            status: task.status || 'Pending',
            completed: task.completed || false,
        }));
        setTasks(tasksWithDefaults);
    }, []);

    const handleAddTask = () => {
        navigate('/AddTask');
    };

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    };

    const handleDelete = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const handleToggleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
        saveTasks(updatedTasks);
    };

    const handleSortByPriority = () => {
        setSortByPriority(true);
        setCurrentPage(1);
    };

    const priorityOrder = { High: 3, Medium: 2, Low: 1 };

    const filteredTasks = tasks
        .filter((task) => {
            const matchesSearch =
                task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                task.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus
                ? (filterStatus === 'Completed' ? task.status === 'Completed' : task.status === 'Pending')
                : true;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortByPriority) {
                return priorityOrder[b.priority] - priorityOrder[a.priority];
            }
            return 0;
        });

    const pendingTasksCount = tasks.filter((task) => task.status === 'Pending').length;

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask) || [];

    const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const getPriorityClasses = (priority) => {
        switch (priority) {
            case 'High':
                return 'bg-red-700 text-white';
            case 'Medium':
                return 'bg-orange-500 text-white';
            case 'Low':
                return 'bg-green-600 text-white';
            default:
                return 'bg-gray-500 text-white';
        }
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 max-w-4xl">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                Task List
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-4">
                Pending Tasks: {pendingTasksCount}
            </p>
            <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                    <button
                        onClick={handleAddTask}
                        className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-blue-700 transition text-sm sm:text-base w-full sm:w-auto cursor-pointer"
                    >
                        Add Task
                    </button>
                    <button
                        onClick={handleSortByPriority}
                        className="bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-md hover:bg-purple-700 transition text-sm sm:text-base w-full sm:w-auto cursor-pointer"
                    >
                        Sort by Priority
                    </button>
                </div>
                <div className="flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="Search by title or description"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="border border-gray-300 rounded-md px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                    />
                    <div className="flex flex-wrap gap-2">
                        <button
                            onClick={() => {
                                setFilterStatus('');
                                setCurrentPage(1);
                            }}
                            className={`px-3 py-2 rounded-md transition text-sm sm:text-base flex-1 sm:flex-none ${filterStatus === ''
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => {
                                setFilterStatus('Completed');
                                setCurrentPage(1);
                            }}
                            className={`px-3 py-2 rounded-md transition text-sm sm:text-base flex-1 sm:flex-none ${filterStatus === 'Completed'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            Completed
                        </button>
                        <button
                            onClick={() => {
                                setFilterStatus('Pending');
                                setCurrentPage(1);
                            }}
                            className={`px-3 py-2 rounded-md transition text-sm sm:text-base flex-1 sm:flex-none ${filterStatus === 'Pending'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            Pending
                        </button>
                    </div>
                </div>
            </div>

            {/* List layout for all screens */}
            <ul className="space-y-4">
                {currentTasks.length === 0 ? (
                    <li className="text-center py-4 text-gray-500 text-sm">
                        No tasks found
                    </li>
                ) : (
                    currentTasks.map((task) => (
                        <li
                            key={task.id}
                            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 flex flex-col gap-2"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center flex-1">
                                    <input
                                        type="checkbox"
                                        checked={task.completed}
                                        onChange={() => handleToggleComplete(task.id)}
                                        className="h-4 w-4 cursor-pointer mr-2"
                                    />
                                    <div className="flex flex-col">
                                        <span
                                            className={`text-sm sm:text-base font-medium ${task.completed ? 'line-through text-gray-500' : ''
                                                }`}
                                        >
                                            {task.title}
                                        </span>
                                        <p
                                            className={`text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-600'
                                                }`}
                                        >
                                            {task.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2 sm:ml-4">
                                    <button
                                        onClick={() => handleEdit(task.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-yellow-600 transition text-xs sm:text-sm"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(task.id)}
                                        className="bg-red-500 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-md hover:bg-red-600 transition text-xs sm:text-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="flex justify-center gap-2 mt-2">
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${getPriorityClasses(task.priority)}`}
                                >
                                    {task.priority}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded-full text-xs ${task.status === 'Completed'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                        }`}
                                >
                                    {task.status}
                                </span>
                            </div>
                        </li>
                    ))
                )}
            </ul>

            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1 rounded-md transition text-sm ${currentPage === index + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
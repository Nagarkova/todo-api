import { useState, useEffect } from 'react';

type Task = { id: number; title: string; completed: boolean };

function App() {
    const [title, setTitle] = useState('');
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('http://localhost:3000/tasks');
            if (!res.ok) {
                throw new Error('Failed to fetch tasks');
            }
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load tasks');
        } finally {
            setLoading(false);
        }
    };

    const createTask = async () => {
        if (!title.trim()) return;

        try {
            setError(null);
            const res = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: title.trim() })
            });

            if (!res.ok) {
                throw new Error('Failed to create task');
            }

            const task = await res.json();
            setTasks([...tasks, task]);
            setTitle('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create task');
        }
    };

    const completeTask = async (id: number) => {
        try {
            setError(null);
            const res = await fetch(`http://localhost:3000/tasks/${id}/complete`, {
                method: 'PATCH'
            });

            if (!res.ok) {
                throw new Error('Failed to complete task');
            }

            setTasks(tasks.map(t => t.id === id ? { ...t, completed: true } : t));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to complete task');
        }
    };

    const deleteTask = async (id: number) => {
        try {
            setError(null);
            const res = await fetch(`http://localhost:3000/tasks/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) {
                throw new Error('Failed to delete task');
            }

            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to delete task');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            createTask();
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading tasks...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                    📝 Todo App
                </h1>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                        <p className="font-medium">Error:</p>
                        <p>{error}</p>
                        <button
                            onClick={() => setError(null)}
                            className="text-sm underline hover:no-underline mt-1"
                        >
                            Dismiss
                        </button>
                    </div>
                )}

                <div className="flex mb-6 gap-2">
                    <input
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter task title..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors duration-200 font-medium"
                        onClick={createTask}
                        disabled={!title.trim()}
                    >
                        Add
                    </button>
                </div>

                {tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <p className="text-gray-500 text-lg">No tasks yet!</p>
                        <p className="text-gray-400">Add your first task above</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-600 mb-4">
                            <span>Total: {tasks.length}</span>
                            <span>Completed: {tasks.filter(t => t.completed).length}</span>
                        </div>

                        <ul className="space-y-3">
                            {tasks.map(task => (
                                <li key={task.id} className="flex justify-between items-center bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors duration-200">
                                    <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                                        {task.title}
                                    </span>
                                    <div className="flex gap-2 ml-4">
                                        {!task.completed && (
                                            <button
                                                className="text-green-600 hover:text-green-800 hover:bg-green-50 p-2 rounded-full transition-colors duration-200"
                                                onClick={() => completeTask(task.id)}
                                                title="Mark as completed"
                                            >
                                                ✓
                                            </button>
                                        )}
                                        <button
                                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-full transition-colors duration-200"
                                            onClick={() => deleteTask(task.id)}
                                            title="Delete task"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;

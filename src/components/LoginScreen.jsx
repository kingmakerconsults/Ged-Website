import React, { useState } from 'react';

function LoginScreen({ users, onLogin }) {
    const [newUsername, setNewUsername] = useState('');

    const handleCreateUser = () => {
        if (newUsername.trim()) {
            onLogin(newUsername.trim());
        }
    };

    return (
        <div className="text-center max-w-md mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Welcome!</h2>
            <p className="text-slate-500 mb-6">Please select your profile or create a new one.</p>

            <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-700 mb-3">Existing Users</h3>
                <div className="flex flex-wrap justify-center gap-3">
                    {users.length > 0 ? users.map(user => (
                        <button
                            key={user}
                            onClick={() => onLogin(user)}
                            className="px-4 py-2 bg-sky-100 text-sky-800 font-semibold rounded-lg hover:bg-sky-200 transition"
                        >
                            {user}
                        </button>
                    )) : <p className="text-slate-400">No users found. Create a new one below.</p>}
                </div>
            </div>

            <div>
                <h3 className="text-xl font-bold text-slate-700 mb-3">Create New User</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        placeholder="Enter your name"
                        className="flex-grow p-2 border border-slate-300 rounded-md"
                    />
                    <button
                        onClick={handleCreateUser}
                        className="px-4 py-2 bg-sky-600 text-white font-semibold rounded-md hover:bg-sky-700"
                    >
                        Create & Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export default LoginScreen;

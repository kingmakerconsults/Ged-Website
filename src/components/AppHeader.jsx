import React from 'react';

function AppHeader({ currentUser, onLogout }) {
	return (
		<header className="bg-white shadow-sm sticky top-0 z-50">
			<div className="w-full max-w-4xl mx-auto p-4 flex justify-between items-center">
				<h1 className="text-xl font-bold text-sky-700">Mr. Smith's Learning Canvas</h1>
				{currentUser && (
					<div className="flex items-center gap-4">
						<span className="font-semibold text-slate-600">Welcome, {currentUser}!</span>
						<button
							onClick={onLogout}
							className="text-sm font-semibold text-sky-600 hover:text-sky-800"
						>
							Log Out
						</button>
					</div>
				)}
			</div>
		</header>
	);
}

export default AppHeader;

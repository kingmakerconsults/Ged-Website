import React, { useState, useEffect } from 'react';
import AppHeader from './components/AppHeader.jsx';

// If you want to import the existing app-data from the other folder, the file now exports AppData.
// Adjust the relative path if your workspace is organized differently.
import { AppData as ImportedAppData } from '../../ged-website-vite/src/app-data.js';

export default function App() {
	// minimal app state to get started; move more logic here as needed
	const [currentUser, setCurrentUser] = useState(null);

	useEffect(() => {
		// Example: use the imported AppData for initial menus or debugging
		if (ImportedAppData) {
			console.debug('Imported AppData keys:', Object.keys(ImportedAppData));
		}
	}, []);

	return (
		<>
			<AppHeader currentUser={currentUser} onLogout={() => setCurrentUser(null)} />
			<main className="w-full max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
				<div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8 transition-all duration-300 relative">
					{/* ...replace with your StartScreen component / router ... */}
					<h2 className="text-2xl font-bold text-slate-800">Welcome to Mr. Smith's Learning Canvas</h2>
					<p>Select a subject to begin (UI moved to src/...).</p>
				</div>
			</main>
		</>
	);
}

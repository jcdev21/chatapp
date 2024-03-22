import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';
import '@/index.css';
import AuthProvider from '@/modules/auth/auth-context';

// ReactDOM.createRoot(document.getElementById('root')!).render(
// 	<React.StrictMode>
// 		<AuthProvider>
// 			<App />
// 		</AuthProvider>
// 	</React.StrictMode>
// );

ReactDOM.createRoot(document.getElementById('root')!).render(
	<AuthProvider>
		<App />
	</AuthProvider>
);

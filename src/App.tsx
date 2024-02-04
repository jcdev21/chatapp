import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from '@/components/protected-layout';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <ProtectedLayout />,
			children: [
				{
					index: true,
					element: <Chat />,
				},
			],
		},
		{
			path: '/login',
			element: <Login />,
		},
		{
			path: '/register',
			element: <Register />,
		},
	]);

	return <RouterProvider router={router} />;
}

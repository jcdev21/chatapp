import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from '@/components/layout';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
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

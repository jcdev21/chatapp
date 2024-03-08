import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from '@/components/protected-layout';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';
import { loader as chatLoader } from './modules/chat/loader';
import { actionRegister } from './modules/auth/action-register';
import Chatroom from './pages/chatroom';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <ProtectedLayout />,
			children: [
				{
					index: true,
					element: <Chat />,
					loader: chatLoader,
				},
				{
					path: ':chatId',
					element: <Chatroom />,
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
			action: actionRegister,
		},
	]);

	return <RouterProvider router={router} />;
}

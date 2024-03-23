import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProtectedLayout from '@/components/protected-layout';
import Chat from './pages/chat';
import Login from './pages/login';
import Register from './pages/register';
import { loader as chatLoader } from './modules/chat/loader';
import { actionRegister } from './modules/auth/action-register';
import Chatroom from './pages/chatroom';
import { loader as chatroomLoader } from './modules/chatroom/loader';
import { actionCreateChat } from './modules/chat/action-create-chat';

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
					action: actionCreateChat,
				},
				{
					path: ':chatId',
					element: <Chatroom />,
					loader: chatroomLoader,
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

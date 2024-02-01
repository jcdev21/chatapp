import { RouterProvider, createBrowserRouter } from 'react-router-dom';

export default function App() {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <div>OKE</div>,
		},
	]);

	return <RouterProvider router={router} />;
}

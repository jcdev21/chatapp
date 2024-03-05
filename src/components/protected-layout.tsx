import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import { RequireAuth } from '@/modules/auth/auth-context';

export default function ProtectedLayout() {
	return (
		<RequireAuth>
			<div>
				<Navbar />
				<main className="w-full h-[calc(100vh-4rem)] flex justify-center items-end bg-slate-200">
					<Outlet />
				</main>
			</div>
		</RequireAuth>
	);
}

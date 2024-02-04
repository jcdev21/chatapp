import { Outlet } from 'react-router-dom';
import Navbar from './navbar';
import { RequireAuth } from '@/modules/auth/auth-context';

export default function ProtectedLayout() {
	return (
		<RequireAuth>
			<div>
				<Navbar />
				<main>
					<Outlet />
				</main>
			</div>
		</RequireAuth>
	);
}

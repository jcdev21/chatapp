import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/modules/auth/auth-context';

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { signOut } = useAuth();

	const signOutHandle = () => {
		signOut?.(() => {
			navigate('/login', {
				replace: true,
				state: { from: location },
			});
		});
	};

	return (
		<header className="w-full py-4 shadow">
			<nav
				role="navigation"
				className="container flex justify-between items-center"
			>
				<h1 className="text-2xl font-medium">ChatApp</h1>
				<div>
					<Button variant="secondary" onClick={signOutHandle}>
						Logout
					</Button>
				</div>
			</nav>
		</header>
	);
}

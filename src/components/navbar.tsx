import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '@/modules/auth/auth-context';
import { socket } from '@/utils/socket';

export default function Navbar() {
	const navigate = useNavigate();
	const location = useLocation();
	const { signOut, user } = useAuth();

	const signOutHandle = () => {
		socket.disconnect();
		signOut?.(() => {
			navigate('/login', {
				replace: true,
				state: { from: location },
			});
		});
	};

	return (
		<header className="w-full h-16 shadow grid">
			<nav
				role="navigation"
				className="container flex justify-between items-center"
			>
				<Link to="/">
					<h1 className="text-2xl font-medium text-primary">
						ChatApp
					</h1>
				</Link>
				<div>
					<h1 className="text-sm font-bold text-green-400">
						{user?.email}
					</h1>
				</div>
				<div>
					<Button variant="secondary" onClick={signOutHandle}>
						Logout
					</Button>
				</div>
			</nav>
		</header>
	);
}

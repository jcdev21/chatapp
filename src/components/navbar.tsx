import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export default function Navbar() {
	return (
		<header className="w-full py-4 shadow">
			<nav
				role="navigation"
				className="container flex justify-between items-center"
			>
				<h1 className="text-2xl font-medium">ChatApp</h1>
				<span>Logged in as Luffy</span>
				<div>
					<Button asChild variant="secondary">
						<Link to="/login">
							<ArrowRight className="mr-2 h-4 w-4" /> Login
						</Link>
					</Button>
				</div>
			</nav>
		</header>
	);
}

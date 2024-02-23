import { useAuth } from '@/modules/auth/auth-context';
import FormLogin from '@/modules/auth/form-login';
import { Navigate, useLocation } from 'react-router-dom';

export default function Login() {
	const auth = useAuth();
	const location = useLocation();

	if (auth.user || auth.accessToken) {
		return <Navigate to="/" state={{ from: location }} replace />;
	}

	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col">
			<h1 className="mb-5 font-semibold text-2xl text-slate-600">
				Sign In
			</h1>
			<div className="w-[320px]">
				<FormLogin />
			</div>
		</div>
	);
}

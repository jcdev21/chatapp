import FormLogin from '@/modules/auth/form-login';

export default function Login() {
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

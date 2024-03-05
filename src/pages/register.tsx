import FormRegister from '@/modules/auth/form-register';

export default function Register() {
	return (
		<div className="w-screen h-screen flex justify-center items-center flex-col">
			<h1 className="mb-5 font-semibold text-2xl text-slate-600">
				Sign Up
			</h1>
			<div className="w-[320px]">
				<FormRegister />
			</div>
		</div>
	);
}

import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="border-b border-slate-200 bg-white">
			<nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
				<Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900">
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">E</span>
					<span>E-commerce</span>
				</Link>

				<div className="order-3 flex w-full items-center justify-center gap-6 text-sm font-semibold text-slate-600 sm:order-2 sm:w-auto sm:gap-8">
					<Link to="/" className="transition hover:text-blue-600">Home</Link>
					<Link to="/about" className="transition hover:text-blue-600">About</Link>
					<Link to="/contact" className="transition hover:text-blue-600">Contact</Link>
				</div>

				<div className="order-2 flex items-center gap-2 sm:order-3">
					<Link to="/signup" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600">
						Signup
					</Link>
					<Link to="/login" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
						Login
					</Link>
				</div>
			</nav>
		</header>
	);
};

export default Header;
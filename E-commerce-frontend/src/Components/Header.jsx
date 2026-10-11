import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false);
	const { user, setUser, loading,logOutHandler } = useContext(AuthContext);
	return (
		<header className="border-b border-slate-200 bg-white">
			<nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
				<Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight text-slate-900" onClick={() => setMenuOpen(false)}>
					<span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">E</span>
					<span>E-commerce</span>
				</Link>
				<button
					type="button"
					className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100 md:hidden"
					onClick={() => setMenuOpen((isOpen) => !isOpen)}
					aria-expanded={menuOpen}
					aria-label={menuOpen ? "Close menu" : "Open menu"}
				>
					<span className="text-2xl leading-none">{menuOpen ? "×" : "☰"}</span>
				</button>

				<div className="order-3 hidden w-full items-center justify-center gap-6 text-sm font-semibold text-slate-600 md:flex sm:order-2 sm:w-auto sm:gap-8">
					<Link to="/home" className="transition hover:text-blue-600">Home</Link>
{user&&user.type==="admin"&&(
	<Link to="/products" className="transition hover:text-blue-600">Products</Link>
)}
				
          {user&&user.type!="admin"&&(
<Link to="/about" className="transition hover:text-blue-600">About</Link>
					)}
					{!user&&(
						<Link to="/about" className="transition hover:text-blue-600">About</Link>
					)}
				
				
					  {user&&user.type!="admin"&&(
<Link to="/contact" className="transition hover:text-blue-600">Contact</Link>
					)}
					{!user&&(
						<Link to="/contact" className="transition hover:text-blue-600">Contact</Link>
					)}
					
				</div>

			
					{user&&user.type==="admin"&&(
							<div className="order-2 hidden items-center gap-2 sm:order-3 md:flex">
								<Link to="/listed-items" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700  transition hover:bg-blue-700">
						Listed Items
					</Link>
						<Link to="/add-product" className="rounded-lg px-4 py-2 text-sm font-semibold text-slate-700  transition hover:bg-blue-700">
						Add Products
					</Link>
					<Link to="/edit-items" className="rounded-lg  px-4 py-2 text-sm font-semibold text-slate-700  transition hover:bg-blue-700">
						Edit Items
					</Link>
					</div>
						)}
						{user&&(
<div className="order-2 hidden items-center gap-2 sm:order-3 md:flex">
            <button  className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600"
						onClick={logOutHandler}
						>
						logout
					</button>
					<Link to="/setting" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
						setting
					</Link>
					</div>
						)}
							
					
				
						{!user&&(
							<div className="order-2 hidden items-center gap-2 sm:order-3 md:flex">
            <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-blue-600">
						login
					</Link>
					<Link to="/signup" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">
						signup
					</Link>
					</div>
					)}

				{menuOpen && (
					<div className="order-4 w-full border-t border-slate-100 pt-4 md:hidden">
						<div className="flex flex-col gap-1 text-sm font-semibold text-slate-700">
							<Link to="/home" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">Home</Link>
							{user && user.type === "admin" && <Link to="/products" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">Products</Link>}
							<Link to="/about" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">About</Link>
							<Link to="/contact" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">Contact</Link>

							{user && user.type === "admin" && (
								<>
									<Link to="/add-product" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">Add Products</Link>
									<Link to="/edit-items" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">Edit Items</Link>
								</>
							)}

							{user ? (
								<>
									<Link to="/setting" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">setting</Link>
									<button onClick={logOutHandler} className="rounded-lg px-3 py-3 text-left hover:bg-slate-50">logout</button>
								</>
							) : (
								<>
									<Link to="/login" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">login</Link>
									<Link to="/signup" onClick={() => setMenuOpen(false)} className="rounded-lg px-3 py-3 hover:bg-slate-50">signup</Link>
								</>
							)}
						</div>
					</div>
				)}
					
				
				
			</nav>
		</header>
	);
};

export default Header;
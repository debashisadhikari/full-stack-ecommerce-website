
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

      <section className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-xl shadow-blue-600/20">
            E
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-blue-600">E-commerce</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Welcome back</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Sign in to continue to your account.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
          <form className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-bold text-slate-700">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-bold text-slate-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
              />
            </div>

            <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 active:translate-y-0">
              Login
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline">Create account</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;

import { useContext, useEffect, useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import { AuthContext } from "../Auth-Contex/AuthContex";

const Signup = () => {
  const navigate=useNavigate();
  const { user, loading } = useContext(AuthContext);
  const [err,setErr]=useState();

  useEffect(() => {
    if (!loading && user) {
      navigate("/home", { replace: true });
    }
  }, [loading, user, navigate]);
  
//form handle data collected
const  FormHander= async(e)=>{
e.preventDefault();
setErr("");
const formData = new FormData(e.target);
const data = Object.fromEntries(formData.entries());

  const response = await fetch("http://localhost:5001/api/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
 

  if(result.success===false){
       setErr(result.errors);
       console.log(result.errors);
  }
  if(result.success===true){
    navigate("/login");
  }

}

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return null;
  }

  return (
    <main className="relative flex min-h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />

      <section className="relative w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-2xl font-black text-white shadow-xl shadow-blue-600/20">
            E
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Create your account</h1>
          <p className="mt-3 text-sm leading-6 text-slate-500">Join us and start shopping with ease.</p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/10 sm:p-8">
          
          {err && err.length > 0 && (
            <div className="mb-5 text-sm font-semibold text-red-600" role="alert">
              {Array.isArray(err) ? (
                <ul className="list-inside list-disc space-y-1">
                  {err.map((error, index) => (
                    <li key={index}>
                      {typeof error === "object"
                        ? error.msg || error.message || JSON.stringify(error)
                        : error}
                    </li>
                  ))}
                </ul>
              ) : (
                err
              )}
            </div>
          )}

          <form className="space-y-5" onSubmit={(event) => FormHander(event)}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="name">Full name</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10" id="name" name="name" placeholder="Alex Morgan" required type="text" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="phone">Phone number</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10" id="phone" name="phone" placeholder="+91 0000000000" type="tel" 
                 maxLength={10}
               inputMode="numeric"
                pattern="[6-9][0-9]{9}"
                
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="email">Email address</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10" id="email" name="email" placeholder="you@example.com" required type="email" />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="password">Password</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10" id="password" name="password" placeholder="Enter your password" required type="password"
                minLength={8}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="confirm-password">Confirm password</label>
                <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10" id="confirm-password" name="confirmPassword" placeholder="Repeat your password" required type="password" 
                
                minLength={8}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 text-xs leading-5 text-slate-500">
               <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor="confirm-password">Accout Type: </label>
             <label className="flex items-center gap-2 text-sm text-slate-600">
          
    <input
      type="radio"
      name="role"
      value="customer"
      required
      className="h-4 w-4 accent-blue-600"
    />
    Customer
  </label>

  <label className="flex items-center gap-2 text-sm text-slate-600">
    <input
      type="radio"
      name="role"
      value="admin"
      required
      className="h-4 w-4 accent-blue-600"
    />
    Admin
  </label>
              
            </label>

            <button className="w-full rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-600/20 active:translate-y-0" type="submit">
              Create account
            </button>
          </form>

          <p className="mt-7 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link className="font-bold text-blue-600 hover:text-blue-700 hover:underline" to="/login">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Signup;
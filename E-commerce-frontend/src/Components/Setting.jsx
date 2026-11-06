
import { use, useContext } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";

const Setting = () => {
  const { user, setUser } = useContext(AuthContext);

  const submitHandler=async(e)=>{
  e.preventDefault();
  const formData = new FormData(e.target);
const data = Object.fromEntries(formData.entries());
console.log(data);
const res=await fetch("http://localhost:5001/api/editProfile",{
  method:"POST",
  credentials:"include",
  headers:{
    "Content-Type":"application/json",
  },
  body: JSON.stringify(data),
})
const resData=await res.json();


setUser(resData.UserUpdate);


  }

  return (
    <section className="min-h-screen bg-gray-50 flex justify-center items-start px-4 py-16">

      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-10">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Profile
          </h1>
          <p className="text-gray-500 mt-2">
            Update your personal information and profile details.
          </p>
        </div>

        {/* Profile Icon */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              {user?.name || "Your Name"}
            </h2>
            <p className="text-sm text-gray-500">
              Manage your account details
            </p>
          </div>
        </div>

        <form className="space-y-6"
        onSubmit={(e)=>{
          submitHandler(e);
        }}
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={user?.name || ""}
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <input
             required
              type="email"
              defaultValue={user?.email || ""}
              name="email"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              defaultValue={user?.phone || ""}
              name="phone"
               required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-200 shadow-md shadow-indigo-200"
            >
              Save Changes
            </button>

            <button
              type="reset"
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold hover:bg-gray-100 transition"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};

export default Setting;


import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";

const Myaccount = () => {
  const { user } = useContext(AuthContext);

  const [Address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(true);
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        setAddressLoading(true);

        const res = await fetch("http://localhost:5001/api/profile", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch address");
        }

        
        setAddress(data.address || null);
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddressError(error.message || "Unable to load address");
      } finally {
        setAddressLoading(false);
      }
    };

    fetchAddress();
  }, []);

  if (!user) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading your profile...</p>
      </div>
    );
  }

  const initials = (user.name || "User")
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Page heading */}
        <div className="mb-6">
          <p className="text-sm font-medium text-slate-500">
            Home / My Account
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View your personal account information.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* Left profile card */}
          <aside className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:col-span-1">
            <div className="h-24 bg-blue-600" />

            <div className="px-6 pb-7">
              <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-blue-100 text-3xl font-bold text-blue-700 shadow-sm">
                {initials}
              </div>

              <h2 className="mt-4 break-words text-xl font-bold text-slate-900">
                {user.name || "User"}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email || "Email not available"}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Account type
                </p>

                <span className="mt-2 inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5 text-sm font-semibold capitalize text-blue-700">
                  <span className="h-2 w-2 rounded-full bg-blue-600" />
                  {user.type || "User"}
                </span>
              </div>
            </div>
          </aside>

          {/* Personal information */}
          <section className="rounded-xl border border-slate-200 bg-white shadow-sm md:col-span-2">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your registered account details.
              </p>
            </div>

            <div className="divide-y divide-slate-100 px-5 sm:px-8">

              {/* Name */}
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 sm:w-1/3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-500">Full Name</span>
                </div>

                <p className="break-words text-sm font-semibold text-slate-900 sm:flex-1 sm:pl-3">
                  {user.name || "Not provided"}
                </p>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 sm:w-1/3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-500">Email Address</span>
                </div>

                <p className="break-all text-sm font-semibold text-slate-900 sm:flex-1 sm:pl-3">
                  {user.email || "Not provided"}
                </p>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 sm:w-1/3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-500">Phone Number</span>
                </div>

                <p className="break-words text-sm font-semibold text-slate-900 sm:flex-1 sm:pl-3">
                  {user.phone || "Not provided"}
                </p>
              </div>

              {/* Account type */}
              <div className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3 sm:w-1/3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </div>
                  <span className="text-sm text-slate-500">Account Type</span>
                </div>

                <p className="text-sm font-semibold capitalize text-slate-900 sm:flex-1 sm:pl-3">
                  {user.type || "User"}
                </p>
              </div>

            </div>

            <div className="border-t border-slate-100 bg-slate-50 px-5 py-4 sm:px-8">
              <p className="text-xs leading-5 text-slate-500">
                Your profile information is displayed using your registered
                account details.
              </p>
            </div>
          </section>

          {/* Saved Address: data.address is an OBJECT */}
          <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm md:col-span-3">
            <div className="border-b border-slate-100 px-5 py-5 sm:px-8">
              <h2 className="text-lg font-bold text-slate-900">
                Delivery Address
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your saved delivery address.
              </p>
            </div>

            <div className="p-5 sm:p-8">
              {addressLoading ? (
                <p className="text-sm text-slate-500">
                  Loading address...
                </p>
              ) : addressError ? (
                <p className="text-sm text-red-600">
                  {addressError}
                </p>
              ) : Address && Object.keys(Address).length > 0 ? (
                <div className="max-w-xl rounded-xl border border-slate-200 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold text-slate-900">
                        {Address.name || "Name not provided"}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {Address.addressType || "Address"}
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                      {Address.addressType || "Other"}
                    </span>
                  </div>

                  <p className="mt-4 break-words text-sm leading-6 text-slate-600">
                    {[
                      Address.house,
                      Address.street,
                      Address.city,
                      Address.state,
                      Address.pincode,
                    ]
                      .filter(Boolean)
                      .join(", ") || "Address not provided"}
                  </p>

                  <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 text-sm text-slate-700">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.84.58 2.8.7a2 2 0 0 1 1.73 2.03Z" />
                    </svg>
                    <span>{Address.phone || "Phone not provided"}</span>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>
                  <p className="mt-3 font-semibold text-slate-800">
                    No saved address
                  </p>
                  <p className="mt-1 text-sm text-slate-500">
                    Add a delivery address to see it here.
                  </p>
                </div>
              )}
            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Myaccount;

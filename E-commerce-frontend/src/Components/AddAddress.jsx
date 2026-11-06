
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    type:"Address",
    name: "",
    phone: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    addressType: "Home",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "phone" || name === "pincode"
          ? value.replace(/\D/g, "").slice(
              0,
              name === "phone" ? 10 : 6
            )
          : value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError("");

    if (formData.phone.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    if (formData.pincode.length !== 6) {
      setError("Please enter a valid 6-digit PIN code.");
      return;
    }

  
    const res = await fetch("http://localhost:5001/api/adress", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

  
    navigate("/profile");
    // Connect your backend API here to save the address.
    
  };

  const inputClass =
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-3xl">

        {/* Heading */}
        <div className="mb-6">
          <p className="text-sm font-medium text-blue-600">
            My Account / Delivery Address
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            Add Delivery Address
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Enter your details so we can deliver your orders safely.
          </p>
        </div>

        {/* Form card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="flex items-center gap-3 border-b border-slate-100 bg-blue-50/70 px-6 py-5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600 text-xl text-white">
              📍
            </div>

            <div>
              <h2 className="font-bold text-slate-900">
                Delivery Information
              </h2>
              <p className="text-xs text-slate-500">
                All fields are required
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">

            {/* Name and phone */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <input type="hidden" name="type" value="Address" />
                <label htmlFor="name" className={labelClass}>
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="phone" className={labelClass}>
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="10-digit mobile number"
                  className={inputClass}
                />
              </div>
            </div>

            {/* House and street */}
            <div>
              <label htmlFor="house" className={labelClass}>
                House / Flat / Building
              </label>
              <input
                id="house"
                name="house"
                type="text"
                required
                value={formData.house}
                onChange={handleChange}
                placeholder="House number, flat, building name"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="street" className={labelClass}>
                Street / Area / Landmark
              </label>
              <textarea
                id="street"
                name="street"
                rows={3}
                required
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter street, locality or nearby landmark"
                className={inputClass}
              />
            </div>

            {/* City and state */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="city" className={labelClass}>
                  City / Town
                </label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city or town"
                  className={inputClass}
                />
              </div>

              <div>
                <label htmlFor="state" className={labelClass}>
                  State
                </label>
                <input
                  id="state"
                  name="state"
                  type="text"
                  required
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  className={inputClass}
                />
              </div>
            </div>

            {/* PIN code */}
            <div>
              <label htmlFor="pincode" className={labelClass}>
                PIN Code
              </label>
              <input
                id="pincode"
                name="pincode"
                type="text"
                inputMode="numeric"
                required
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit PIN code"
                className={inputClass}
              />
            </div>

            {/* Address type */}
            <div>
              <p className={labelClass}>Address Type</p>

              <div className="flex flex-wrap gap-3">
                {["Home", "Work"].map((type) => (
                  <label
                    key={type}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition ${
                      formData.addressType === type
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="addressType"
                      value={type}
                      checked={formData.addressType === type}
                      onChange={handleChange}
                      className="accent-blue-600"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Error */}
            {error && (
              <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            )}

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
              <button
                type="reset"
                onClick={() => {
                  setFormData({
                    name: "",
                    phone: "",
                    house: "",
                    street: "",
                    city: "",
                    state: "",
                    pincode: "",
                    addressType: "Home",
                  });
                  setError("");
                }}
                className="rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Clear Form
              </button>

              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-7 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-blue-700"
              >
                Save Address
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          Please ensure your address and contact number are correct.
        </p>
      </div>
    </main>
  );
};

export default AddAddress;

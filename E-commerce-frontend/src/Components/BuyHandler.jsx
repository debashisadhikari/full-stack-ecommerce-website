
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const BuyHandler = () => {
  const navigate=useNavigate();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [editAddress, setEditAddress] = useState(false);

  const emptyAddress = {
    name: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    phone: "",
  };

  const [address, setAddress] = useState(null);
  const [tempAddress, setTempAddress] = useState(emptyAddress);

 
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(
          `http://localhost:5001/api/productDetails/${id}`,
          {
            credentials: "include",
          }
        );
      

        if (!res.ok) {
          throw new Error("Could not fetch product details.");
        }

        const data = await res.json();

        if (!data.product) {
          throw new Error("Product not found.");
        }

        setProduct(data.product);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);
  const fetchProfile = async () => {
    try {
      const res = await fetch("http://localhost:5001/api/profile", {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setAddress(null);
        return;
      }

      setAddress(data.address || null);
      if (data.address) {
        setTempAddress({ ...data.address });
      }
    } catch (err) {
      console.error("Failed to fetch profile address:", err);
      setAddress(null);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <p className="text-lg font-medium text-slate-600">
          Loading checkout...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100 px-4">
        <h2 className="text-xl font-bold text-slate-800">
          {error || "Product not found"}
        </h2>
        <Link
          to="/products"
          className="mt-4 font-semibold text-blue-600 hover:underline"
        >
          Back to products
        </Link>
      </div>
    );
  }

  
  const details = product.Details || {};

  const brand = product.Brand || "";
  const model = product.Model || "";
  const color = product.Color || "";

  const price = Number(details.Price) || 0;
  const mrp = Number(details.MRP) || price;
  const discount = Math.max(0, mrp - price);


  

  const subtotal = price * quantity;
  const totalDiscount = discount * quantity;
  const total = subtotal;

  
  const firstImage = Array.isArray(product.Image)
    ? product.Image[0]
    : product.Image;

  const imageUrl =
    typeof firstImage === "string"
      ? firstImage
      : firstImage?.url ||
        firstImage?.URL ||
        firstImage?.image ||
        firstImage?.src ||
        firstImage?.path ||
        firstImage?.secure_url ||
        "";

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const formattedDate = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const handleEditAddress = () => {
    setTempAddress(address ? { ...address } : { ...emptyAddress });
    setEditAddress(true);
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setTempAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = (e) => {
    e.preventDefault();

    const safeAddress = {
      ...emptyAddress,
      ...tempAddress,
    };

    if (
      !safeAddress.name.trim() ||
      !safeAddress.house.trim() ||
      !safeAddress.street.trim() ||
      !safeAddress.city.trim() ||
      !safeAddress.state.trim() ||
      !/^[0-9]{6}$/.test(safeAddress.pincode) ||
      !/^[0-9]{10}$/.test(safeAddress.phone)
    ) {
      alert("Please enter a valid address, house number, state, 6-digit PIN code and 10-digit phone number.");
      return;
    }

    const readyAddress = {
      ...safeAddress,
      name: safeAddress.name.trim(),
      house: safeAddress.house.trim(),
      street: safeAddress.street.trim(),
      city: safeAddress.city.trim(),
      state: safeAddress.state.trim(),
    };

    setAddress(readyAddress);
    setTempAddress(readyAddress);
    setEditAddress(false);
  };

  const handleContinue = async () => {
    if (!address || !address.name || !address.pincode || !address.phone) {
      alert("Please add a valid delivery address before confirming your order.");
      setEditAddress(true);
      return;
    }
    const data={
      id:id,
      price:price,
    };

    const res = await fetch(`http://localhost:5001/api/order`, {
         method:"POST",
          credentials: "include",
          headers:{
           "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      
    });
    console.log(res);

    if (!res.ok) {
      alert("Unable to place order right now. Please try again.");
      return;
    }

    navigate("/");
  };

  return (
    <main className="min-h-screen bg-[#f1f3f6] px-3 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Page heading */}
        <div className="mb-5">
          <Link
            to="/products"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            ← Continue shopping
          </Link>

          <h1 className="mt-3 text-2xl font-bold text-slate-800">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-3">

          {/* LEFT: Delivery and product summary */}
          <div className="space-y-4 lg:col-span-2">

            {/* Delivery address */}
            <section className="bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Delivery Address
                  </p>

                  {!editAddress ? (
                    address ? (
                      <>
                        <p className="mt-4 text-sm text-slate-600">
                          Deliver to:
                        </p>

                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <h2 className="font-semibold text-slate-900">
                            {address.name}
                          </h2>

                          <span className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                            HOME
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-700">
                          {address.house}, {address.street},{" "}
                          {address.city}, {address.state} - {address.pincode}
                        </p>

                        <p className="mt-2 text-sm font-medium text-slate-700">
                          Phone: {address.phone}
                        </p>
                      </>
                    ) : (
                      <div className="mt-4 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4">
                        <p className="text-sm font-medium text-slate-700">
                          No delivery address saved yet.
                        </p>
                        <p className="mt-1 text-sm text-slate-500">
                          Add your address to continue with checkout.
                        </p>
                      </div>
                    )
                  ) : (
                    <form
                      onSubmit={handleSaveAddress}
                      className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2"
                    >
                      {[
                        ["name", "Full name"],
                        ["house", "House / Flat"],
                        ["street", "Street / Area"],
                        ["city", "City"],
                        ["state", "State"],
                        ["pincode", "PIN code"],
                        ["phone", "Phone number"],
                      ].map(([name, label]) => (
                        <div key={name}>
                          <label
                            htmlFor={name}
                            className="mb-1 block text-xs font-semibold text-slate-600"
                          >
                            {label}
                          </label>

                          <input
                            id={name}
                            name={name}
                            value={tempAddress[name]}
                            onChange={handleAddressChange}
                            required
                            maxLength={
                              name === "phone" ? 10 :
                              name === "pincode" ? 6 : 150
                            }
                            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                          />
                        </div>
                      ))}

                      <div className="flex gap-3 sm:col-span-2">
                        <button
                          type="submit"
                          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                          Save Address
                        </button>

                        <button
                          type="button"
                          onClick={() => setEditAddress(false)}
                          className="rounded-md border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {!editAddress && (
                  <button
                    type="button"
                    onClick={handleEditAddress}
                    className="shrink-0 rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50"
                  >
                    {address ? "Edit" : "Add address"}
                  </button>
                )}
              </div>
            </section>

            <section className="bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <h2 className="font-bold text-slate-800">
                  Order Summary
                </h2>

                <span className="text-sm text-slate-500">
                  Step 2 of 3
                </span>
              </div>

              <div className="flex flex-col gap-5 sm:flex-row">

                <div className="flex h-44 w-full shrink-0 items-center justify-center bg-slate-50 p-3 sm:w-40">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={`${brand} ${model}`}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="text-center text-sm text-slate-400">
                      No product image
                    </div>
                  )}
                </div>

               
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-semibold text-slate-800">
                    {brand} {model}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Color: {color || "Not specified"}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    RAM: {details.Ram || "N/A"} | Storage:{" "}
                    {details.Rom || "N/A"}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    <span className="text-xl font-bold text-slate-900">
                      ₹{price.toLocaleString("en-IN")}
                    </span>

                    {mrp > price && (
                      <>
                        <span className="text-sm text-slate-400 line-through">
                          ₹{mrp.toLocaleString("en-IN")}
                        </span>

                        <span className="text-sm font-semibold text-green-600">
                          {Math.round((discount / mrp) * 100)}% off
                        </span>
                      </>
                    )}
                  </div>

                  <p className="mt-2 text-sm text-green-600">
                    You save ₹{discount.toLocaleString("en-IN")} per item
                  </p>

               
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <span className="text-sm text-slate-600">
                      Quantity:
                    </span>

                    <div className="flex items-center border border-slate-300">
                      <button
                        type="button"
                        disabled={quantity <= 1}
                        onClick={() =>
                          setQuantity((q) => Math.max(1, q - 1))
                        }
                        className="px-3 py-1.5 text-lg disabled:opacity-40"
                      >
                        −
                      </button>

                      <span className="min-w-9 text-center text-sm font-semibold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          setQuantity((q) => q + 1)
                        }
                        className="px-3 py-1.5 text-lg"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <p className="mt-5 text-sm font-semibold text-slate-700">
                    Delivery by {formattedDate}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Estimated date for demonstration only.
                  </p>
                </div>
              </div>
            </section>
          </div>

          
          <aside className="lg:sticky lg:top-5">
            <h2 className="mb-3 text-lg font-bold text-slate-800">
              Price Details
            </h2>

            <section className="bg-white p-5 shadow-sm">
              <div className="space-y-4 text-sm">
                <div className="flex justify-between gap-3 text-slate-600">
                  <span>MRP (incl. of all taxes)</span>
                  <span className="text-slate-900">
                    ₹{(mrp * quantity).toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-slate-600">
                  <span>Product discount</span>
                  <span className="font-medium text-green-600">
                    −₹{totalDiscount.toLocaleString("en-IN")}
                  </span>
                </div>

                

                <div className="border-t border-dashed border-slate-300 pt-4">
                  <div className="flex justify-between gap-3 font-bold text-slate-900">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-md bg-emerald-50 px-3 py-3 text-center text-sm font-medium text-emerald-700">
                You save ₹
                {(totalDiscount).toLocaleString("en-IN")}{" "}
                on this order after fees
              </div>

              <button
                type="button"
                onClick={handleContinue}
                className="mt-5 w-full rounded-md bg-amber-400 px-5 py-3 font-bold text-slate-900 transition hover:bg-amber-500"
              >
                Confirm
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                Secure checkout · Verify your address before placing an order.
              </p>
            </section>
          </aside>

        </div>
      </div>
    </main>
  );
};

export default BuyHandler;

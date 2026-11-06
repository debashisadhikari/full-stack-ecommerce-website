
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Fetch Orders
  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch("http://localhost:5001/api/order", {
        credentials: "include",
      });

      const data = await res.json();

      console.log("Orders:", data);

      if (!res.ok) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      // OrderDetails is an array
      setOrders(data.OrderDetails || []);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  // Format Date
  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) return "Not available";

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Format Price
  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN");
  };

  // Status Color
  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-amber-100 text-amber-700";
    }
  };

  const openOrderModal = (order, item) => {
    const product = item?.productId;

    if (!product) return;

    setSelectedOrder({ order, item, product });
  };

  const closeOrderModal = () => setSelectedOrder(null);
  const CancelHandler=async(id)=>{
       const check=prompt("Cancel Confirm Enter 10");
       if(check!=10){
         return;
       }
       console.log("this is calceld");
       const res=await fetch(`http://localhost:5001/api/cancel/${id}`,{
        credentials:"include",
       })
       const data=await res.json();
       console.log(data);
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-6xl">

        {/* Heading */}

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Shopping History
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            My Orders
          </h1>

          <p className="mt-2 text-slate-500">
            View your purchased products and track deliveries.
          </p>
        </div>

        {/* Loading */}

        {loading ? (

          <div className="rounded-xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-600">
              Loading your orders...
            </p>
          </div>

        ) : error ? (

          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error}
          </div>

        ) : orders.length === 0 ? (

          <div className="rounded-xl bg-white p-12 text-center shadow-sm">
            <h2 className="text-xl font-bold text-slate-800">
              No Orders Found
            </h2>

            <p className="mt-2 text-slate-500">
              You haven't purchased any products yet.
            </p>
          </div>

        ) : (

          /* All Orders */

          <div className="space-y-7">

            {orders.map((order) => (

              <section
                key={order._id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >

                {/* Order Header */}

                <div className="flex flex-col justify-between gap-3 border-b border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Order ID
                    </p>

                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {order._id}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Total Items
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {order.Products?.length || 0} Products
                    </p>
                  </div>

                </div>

                {/* Products Array */}

                <div className="divide-y divide-slate-100 gap-6">

                  {order.Products?.map((item) => {

                    // Populated Product Details
                    const product = item.productId;

                    if (!product) return null;

                    return (

                      <div key={item._id} className="p-5 sm:p-6">

                        <div className="flex flex-col gap-6 md:flex-row">

                          {/* Product Image */}

                          <Link
                            to={`/product/${product._id}`}
                            className="flex h-52 items-center justify-center rounded-xl bg-slate-50 p-4 md:w-52 md:shrink-0"
                          >
                            <img
                              src={product.Image?.[0]?.url}
                              alt={product.Model}
                              className="h-full w-full object-contain"
                            />
                          </Link>

                          {/* Product Information */}

                          <div className="min-w-0 flex-1">

                            <div className="flex flex-wrap items-start justify-between gap-3">

                              <div>

                                <Link to={`/product/${product._id}`} className="text-xl font-bold text-slate-900">
                                  {product.Brand} {product.Model}
                                </Link>

                                <p className="mt-1 text-sm text-slate-500">
                                  Color: {product.Color || "N/A"}
                                </p>

                              </div>

                              {/* Status */}

                              <span
                                className={`rounded-full px-4 py-1.5 text-sm font-semibold ${getStatusStyle(item.status)}`}
                              >
                                {item.status || "Pending"}
                              </span>

                            </div>

                            {/* RAM ROM Details */}

                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

                              <div className="rounded-lg bg-slate-50 p-3">
                                <p className="text-xs text-slate-400">
                                  RAM
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                  {product.Details?.Ram || "N/A"}
                                </p>
                              </div>

                              <div className="rounded-lg bg-slate-50 p-3">
                                <p className="text-xs text-slate-400">
                                  Storage
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                  {product.Details?.Rom || "N/A"}
                                </p>
                              </div>

                              <div className="rounded-lg bg-slate-50 p-3">
                                <p className="text-xs text-slate-400">
                                  Brand
                                </p>

                                <p className="mt-1 font-semibold text-slate-800">
                                  {product.Brand || "N/A"}
                                </p>
                              </div>

                            </div>

                            {/* Price */}

                            <div className="mt-5">

                              <div className="flex flex-wrap items-center gap-3">

                                <p className="text-2xl font-bold text-slate-900">
                                  ₹{formatPrice(
                                    item.orderPrice || product.Details?.Price
                                  )}
                                </p>

                                <p className="text-sm text-slate-400 line-through">
                                  ₹{formatPrice(product.Details?.MRF)}
                                </p>

                              </div>

                              <p className="mt-1 text-xs text-slate-500">
                                Purchase Price
                              </p>

                            </div>

                          </div>

                        </div>

                        

                        <div className="mt-7 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-3">

                          {/* Order Date */}

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Order Date
                            </p>

                            <p className="mt-2 font-semibold text-slate-800">
                              {formatDate(item.orderDate)}
                            </p>
                          </div>

                          {/* Shipping Date */}

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Shipping Date
                            </p>

                            <p className="mt-2 font-semibold text-slate-800">
                              {formatDate(item.shippingDate)}
                            </p>
                          </div>

                          {/* Delivery Date */}

                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                              Expected Delivery
                            </p>

                            <p className="mt-2 font-semibold text-green-700">
                              {formatDate(item.deliveryDate)}
                            </p>
                          </div>
                          <div>
                            <button
                              type="button"
                              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-5 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition-all duration-200 hover:border-red-500 hover:bg-red-600 hover:text-white active:scale-95"
                              onClick={() => {
                              CancelHandler(product._id);
                              }}
                            >
                              <span aria-hidden="true">✕</span>
                              Cancel Order
                            </button>
                          </div>
                          <div>
                            <button
                              type="button"
                              onClick={() => openOrderModal(order, item)}
                              className="mt-3 inline-flex items-center justify-center gap-2 rounded-lg border border-green-200 bg-green-50 px-5 py-2.5 text-sm font-semibold text-green-700 shadow-sm transition-all duration-200 hover:border-green-600 hover:bg-green-600 hover:text-white active:scale-95"
                            >
                              <span aria-hidden="true">👁</span>
                              View Details
                            </button>
                          </div>

                        </div>

                      </div>

                    );

                  })}

                </div>

              </section>

            ))}

          </div>

        )}

        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Order Details
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-slate-900">
                    {selectedOrder.product.Brand} {selectedOrder.product.Model}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-800"
                >
                  Close
                </button>
              </div>

              <div className="grid gap-6 p-5 md:grid-cols-[220px_1fr] md:p-6">
                <div className="flex h-56 items-center justify-center rounded-xl bg-slate-50 p-4">
                  <img
                    src={selectedOrder.product.Image?.[0]?.url}
                    alt={selectedOrder.product.Model}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="text-2xl font-bold text-slate-900">
                      ₹{formatPrice(
                        selectedOrder.item.orderPrice || selectedOrder.product.Details?.Price
                      )}
                    </p>

                    <span
                      className={`rounded-full px-4 py-1.5 text-sm font-semibold ${getStatusStyle(selectedOrder.item.status)}`}
                    >
                      {selectedOrder.item.status || "Pending"}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-slate-600">
                    Color: {selectedOrder.product.Color || "N/A"}
                  </p>

                  <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">RAM</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {selectedOrder.product.Details?.Ram || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">Storage</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {selectedOrder.product.Details?.Rom || "N/A"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-slate-50 p-3">
                      <p className="text-xs text-slate-400">Order ID</p>
                      <p className="mt-1 font-semibold text-slate-800">
                        {selectedOrder.order._id}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Order Date
                      </p>
                      <p className="mt-2 font-semibold text-slate-800">
                        {formatDate(selectedOrder.item.orderDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Shipping Date
                      </p>
                      <p className="mt-2 font-semibold text-slate-800">
                        {formatDate(selectedOrder.item.shippingDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Expected Delivery
                      </p>
                      <p className="mt-2 font-semibold text-green-700">
                        {formatDate(selectedOrder.item.deliveryDate)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </main>
  );
};

export default OrderPage;

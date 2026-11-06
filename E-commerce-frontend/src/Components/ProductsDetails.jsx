
import { useContext, useEffect, useState } from "react";
import {  Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../Auth-Contex/AuthContex";


const ProductDetailsLayout = () => {
  const { id } = useParams();
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
          throw new Error("Failed to fetch product details");
        }

        const data = await res.json();

        setProduct(data.product);
        setSelectedImage(0);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is missing");
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="animate-pulse text-gray-500">
          Loading product details...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <p className="text-center text-red-600">
          {error || "Product not found"}
        </p>
      </div>
    );
  }

  const images = product.Image || [];
  const details = product.Details || {};
  
  const camera = details.Cammera || {};
  console.log("camera section", camera);

  const price = Number(details.Price || 0);
  const mrp = Number(details.MRF || 0);

  const discount =
    mrp > price && mrp > 0
      ? Math.round(((mrp - price) / mrp) * 100)
      : 0;

  const formatValue = (value) => {
    if (value === undefined || value === null || value === "") {
      return "Not specified";
    }

    if (Array.isArray(value)) {
      return value.map(formatValue).join(", ");
    }

    if (typeof value === "object") {
      return Object.entries(value)
        .map(([key, val]) => `${key}: ${formatValue(val)}`)
        .join(" | ");
    }

    return String(value);
  };


  const specifications = [
    ["Brand", product.Brand],
    ["Model", product.Model],
    ["Colour", product.Color],
    ["MRP", details.MRF],
    ["Price", details.Price],
    ["Discount", details.Discount],
    ["RAM", details.Ram],
    ["Storage", details.Rom],
    ["Processor", details.Processor],
    ["Display", details.Display],
    ["Battery", details.Battery],
    ["Water Resistance", details.water],
   
  ].filter(
    ([, value]) =>
      value !== undefined && value !== null && value !== ""
  );
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-6 lg:px-8">

        {/* Breadcrumb */}
        <nav className="mb-5 break-words text-xs text-gray-500 sm:text-sm">
          Home / Mobiles / {product.Brand} {product.Model}
        </nav>

        <div className="grid min-w-0 grid-cols-1 gap-5 rounded-xl bg-white p-3 shadow-sm sm:p-5 lg:grid-cols-2 lg:gap-8 lg:p-7">

          {/* LEFT: PRODUCT IMAGES */}
          <section className="min-w-0">
            <div className="relative flex h-64 items-center justify-center sm:h-80 md:h-[420px]">
              {images[selectedImage]?.url ? (
                <img
                  src={images[selectedImage].url}
                  alt={`${product.Brand} ${product.Model}`}
                  className="h-full w-full object-contain"
                />
              ) : (
                <p className="text-sm text-gray-400">
                  No image available
                </p>
              )}

              {discount > 0 && (
                <span className="absolute left-0 top-0 rounded-md bg-red-600 px-3 py-1 text-xs font-semibold text-white sm:text-sm">
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* Image thumbnails */}
            {images.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto pb-2 sm:gap-3">
                {images.map((image, index) => (
                  <button
                    key={image._id || image.url || index}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View product image ${index + 1}`}
                    aria-pressed={selectedImage === index}
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border-2 p-1 transition sm:h-20 sm:w-20 ${
                      selectedImage === index
                        ? "border-red-600 bg-red-50"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`Product view ${index + 1}`}
                      className="h-full w-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Key Highlights */}
            <div className="mt-5 rounded-xl border border-gray-200 p-3 sm:p-5">
              <h2 className="text-base font-bold sm:text-lg">
                Key Highlights
              </h2>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {[
                  ["Display", details.Display],
                  ["Battery", details.Battery],
                  ["RAM", details.Ram],
                  ["Storage", details.Rom],
                  ["Rear Cam",camera.rear],
                  ["Front Cam", camera.front],
                  
                ]
                  .filter(([, value]) => value)
                  .map(([label, value]) => (
                    <div key={label} className="min-w-0">
                      <p className="text-xs text-gray-500 sm:text-sm">
                        {label}
                      </p>

                      <p className="mt-1 break-words text-sm font-medium sm:text-base">
                        {formatValue(value)}
                      </p>
                    </div>
                  ))}
                  <div>
                  
                  </div>

                  

                  
              </div>
            </div>
          </section>

          
          <section className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-red-600 sm:text-sm">
              {product.Brand}
            </p>

            <h1 className="mt-2 break-words text-xl font-bold leading-snug sm:text-2xl lg:text-3xl">
              {product.Brand} {product.Model}
            </h1>

            <p className="mt-2 break-words text-sm text-gray-500">
              Model: {product.Model}
            </p>

            {product.Color && (
              <p className="mt-3 text-sm sm:text-base">
                Colour:{" "}
                <span className="font-semibold">{product.Color}</span>
              </p>
            )}

            {/* Price */}
            <div className="mt-5 rounded-xl bg-gray-50 p-4 sm:p-5">
              <p className="text-xs text-gray-500 sm:text-sm">
                Special Price
              </p>

              <div className="mt-2 flex flex-wrap items-baseline gap-2 sm:gap-3">
                <span className="text-2xl font-bold sm:text-3xl lg:text-4xl">
                  ₹{price.toLocaleString("en-IN")}
                </span>

                {mrp > price && (
                  <span className="text-sm text-gray-400 line-through sm:text-base">
                    ₹{mrp.toLocaleString("en-IN")}
                  </span>
                )}

                {discount > 0 && (
                  <span className="text-sm font-semibold text-green-700">
                    {discount}% off
                  </span>
                )}
              </div>

              {mrp > price && (
                <p className="mt-2 text-xs text-green-700 sm:text-sm">
                  You save ₹{(mrp - price).toLocaleString("en-IN")}
                </p>
              )}

              <p className="mt-3 text-xs text-gray-500">
                Inclusive of applicable taxes
              </p>
            </div>

            {/* Offers */}
            <div className="mt-4 rounded-xl border border-gray-200 p-3 sm:p-4">
              <h2 className="font-bold">Offers & Benefits</h2>

              <p className="mt-2 text-sm text-gray-600">
                Check available bank offers and payment benefits at checkout.
              </p>
            </div>

            {/* Action buttons */}
            <div className="mt-5 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2">
              <button
                type="button"
                onClick={() => alert("Connect your Add to Cart API here")}
                className="rounded-lg border-2 border-red-600 px-3 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50 sm:text-base"
              >
                Add to Cart
              </button>

              <Link
              to={`/checkout/${id}`}
                
                className="rounded-lg bg-red-600 px-3 py-3 text-sm font-semibold text-white transition hover:bg-red-700 sm:text-base"
              >
                Buy Now
              </Link>
            </div>

            {/* More Details: opens OPURL */}
            {product.OPURL && (
              <a
                href={product.OPURL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-800 transition hover:border-red-600 hover:bg-red-50 hover:text-red-600 sm:text-base"
              >
                More Details
                <span aria-hidden="true">↗</span>
              </a>
            )}

            {/* View Specifications */}
            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              aria-expanded={showMore}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-3 text-sm font-semibold transition hover:bg-gray-50 sm:text-base"
            >
              {showMore ? "Show Less" : "View Specifications"}

              <span aria-hidden="true">
                {showMore ? "▲" : "▼"}
              </span>
            </button>

            {/* Expandable specifications */}
            {showMore && (
              <div className="mt-5 min-w-0">
                <h2 className="mb-3 text-lg font-bold sm:text-xl">
                  Complete Specifications
                </h2>

                <div className="overflow-hidden rounded-xl border border-gray-200">
                  {specifications.map(([label, value], index) => (
                    <div
                      key={label}
                      className={`grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-3 px-3 py-3 text-xs sm:px-4 sm:text-sm ${
                        index % 2 === 0
                          ? "bg-gray-50"
                          : "bg-white"
                      }`}
                    >
                      <span className="break-words text-gray-500">
                        {label}
                      </span>

                      <span className="break-words font-medium">
                        {formatValue(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

           
            <div className="mt-5 rounded-xl border border-gray-200 p-3 sm:p-4">
              <h2 className="font-bold">Delivery & Support</h2>

              <ul className="mt-3 space-y-2 text-sm text-gray-600">
                <li>✓ Secure online payment</li>
                <li>✓ Product support information</li>
                <li>✓ Check delivery availability at checkout</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailsLayout;

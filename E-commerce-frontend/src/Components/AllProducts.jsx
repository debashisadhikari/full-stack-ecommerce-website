
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        "http://localhost:5001/api/getAllProducts",
        {
          credentials: "include",
        }
      );

      if (!res.ok) {
        throw new Error("Products could not be loaded. Please try again.");
      }

      const data = await res.json();

      if (!Array.isArray(data.product)) {
        throw new Error("The product list could not be displayed.");
      }

      setProducts(data.product);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-2 sm:mb-7">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-700 sm:text-sm">
            Find your next favorite
          </p>

          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-950 sm:text-3xl">
            All products
          </h1>
        </div>

        {!loading && !error && (
          <p className="text-sm font-medium text-slate-500">
            {products.length}{" "}
            {products.length === 1 ? "product" : "products"}
          </p>
        )}
      </div>

      {loading && (
        <div
          className="flex min-h-48 items-center justify-center"
          role="status"
          aria-label="Loading products"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-teal-600" />
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center">
          <p className="font-semibold text-rose-800">{error}</p>

          <button
            type="button"
            onClick={fetchProducts}
            className="mt-4 rounded-xl bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && products.length === 0 && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-10 text-center">
          <p className="text-lg font-semibold text-slate-800">
            No products available yet
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Please check back soon.
          </p>
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((item) => {
            const details = item.Details ?? {};

            const firstImage = Array.isArray(item.Image)
              ? item.Image[0]?.url
              : item.Image?.url ?? item.Image;

            return (
              <Link
                to={`/product/${item._id}`}
                key={item._id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg sm:p-4"
              >
                <div className="flex h-44 w-full items-center justify-center overflow-hidden rounded-xl bg-slate-50 sm:h-52 lg:h-56">
                  {firstImage ? (
                    <img
                      src={firstImage}
                      alt={`${item.Brand ?? ""} ${item.Model ?? ""}`.trim()}
                      loading="lazy"
                      className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="px-3 text-center text-sm text-slate-400">
                      Image unavailable
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col pt-3 sm:pt-4">
                  <h2 className="line-clamp-2 min-h-10 text-sm font-bold leading-5 text-slate-900 group-hover:text-teal-800 sm:text-base">
                    {[item.Brand, item.Model].filter(Boolean).join(" ") ||
                      "Product"}
                  </h2>

                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                    {[
                      details.Ram && `${details.Ram} RAM`,
                      details.Rom && `${details.Rom} storage`,
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>

                  {details.Processor && (
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                      {details.Processor}
                    </p>
                  )}

                  <div className="mt-auto flex flex-wrap items-baseline gap-x-2 gap-y-1 pt-3">
                    {details.MRF != null && (
                      <del className="text-xs text-slate-400 sm:text-sm">
                        ₹{details.MRF}
                      </del>
                    )}

                    {details.Price != null && (
                      <span className="text-base font-extrabold text-slate-950 sm:text-lg">
                        ₹{details.Price}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default AllProducts;

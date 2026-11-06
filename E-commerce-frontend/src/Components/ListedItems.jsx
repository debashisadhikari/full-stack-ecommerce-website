
import { useState, useEffect } from "react";

const AllProducts = () => {
  const [allItems, setAllItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState("");

  const LIMIT = 8;

  const fetchProducts = async (pageNumber) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:5001/api/getAllProducts?page=${pageNumber}&limit=${LIMIT}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();
      const products = data.allProducts ?? [];

      setAllItems((prev) =>
        pageNumber === 1 ? products : [...prev, ...products]
      );

      setHasMore(
        typeof data.hasMore === "boolean"
          ? data.hasMore
          : products.length === LIMIT
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMore = async () => {
    const nextPage = page + 1;
    await fetchProducts(nextPage);
    setPage(nextPage);
  };

  return (
    <main className="min-h-screen bg-slate-100 p-5 md:p-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-900">
        Explore Products
      </h1>

      {error && (
        <p className="mb-5 text-red-600">{error}</p>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {allItems.map((product) => {
          const specs = product.specification ?? {};
          const image = Array.isArray(product.image)
            ? product.image[0]
            : product.image;

          return (
            <article
              key={product._id}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-60 items-center justify-center bg-slate-50 p-5">
                {image ? (
                  <img
                    src={image}
                    alt={`${product.brand} ${product.model}`}
                    loading="lazy"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <p className="text-slate-400">No image available</p>
                )}
              </div>

              <div className="p-5">
                <p className="text-sm font-semibold text-blue-600">
                  {product.brand}
                </p>

                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  {product.model}
                </h2>

                <p className="mt-3 text-2xl font-bold text-slate-900">
                  ₹{Number(specs.Price ?? 0).toLocaleString("en-IN")}
                </p>

                {specs.MRF && (
                  <p className="text-sm text-slate-400 line-through">
                    MRP: ₹{Number(specs.MRF).toLocaleString("en-IN")}
                  </p>
                )}

                {specs.Discount && (
                  <span className="mt-2 inline-block rounded-md bg-green-50 px-2 py-1 text-sm font-semibold text-green-700">
                    {specs.Discount}% discount
                  </span>
                )}

                <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">Color:</span>{" "}
                    {product.color?.join(", ") || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">RAM:</span>{" "}
                    {specs.Ram || "N/A"} GB
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Storage:</span>{" "}
                    {specs.Rom || "N/A"} GB
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Processor:</span>{" "}
                    {specs.Processor || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Display:</span>{" "}
                    {specs.Display || "N/A"}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">Battery:</span>{" "}
                    {specs.Battery || "N/A"} mAh
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {loading && (
        <p className="mt-8 text-center text-slate-500">
          Loading products...
        </p>
      )}

     
{loading ? (
  <div className="mt-10 flex justify-center items-center">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
  </div>
) : (
  hasMore && (
    <div className="mt-10 flex justify-center">
      <button
        onClick={loadMore}
        className="rounded-xl bg-blue-600 px-8 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        Load More Products
      </button>
    </div>
  )
)}

      {!hasMore && allItems.length > 0 && (
        <p className="mt-10 text-center text-slate-500">
          You have reached the end of the products.
        </p>
      )}
    </main>
  );
};

export default AllProducts;
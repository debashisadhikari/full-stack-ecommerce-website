
import { useState } from "react";
import { Link } from "react-router-dom";

const brands = [
  "All brands",
  "Apple",
  "Samsung",
  "Nokia",
  "Oppo",
  "Vivo",
  "OnePlus",
  "Xiaomi",
  "Realme",
  "Google",
  "Motorola",
  "Nothing",
  "Sony",
];

const visibleBrands = brands.slice(0, 8);

const ItemsList = () => {
  const [activeBrand, setActiveBrand] = useState("All brands");

  return (
    <section className="mx-auto max-w-7xl px-5 py-2 sm:px-8 lg:px-10">
      <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_10px_30px_-20px_rgba(15,23,42,0.4)]">
        <div className="flex items-center gap-2 overflow-x-auto">

          {visibleBrands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => setActiveBrand(brand)}
              className={`whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-semibold transition ${
                activeBrand === brand
                  ? "bg-slate-950 text-white shadow-md"
                  : "border border-slate-200 bg-slate-50 text-slate-600 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
              }`}
            >
              {brand}
            </button>
          ))}

          <Link
            to="/categories"
            className="ml-auto shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-bold text-teal-700 transition hover:bg-teal-50 hover:text-teal-900"
          >
            More →
          </Link>

        </div>
      </div>
    </section>
  );
};

export default ItemsList;
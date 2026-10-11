const Search = () => {
  return (
    <section className="w-full px-5 py-1 sm:px-8">
      <div
        role="search"
        className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_14px_35px_-24px_rgba(15,23,42,0.6)]"
      >
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-700"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-5 w-5 fill-none stroke-current"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
        </span>

        <input
          type="text"
          
          aria-label="Search products"
          placeholder="Search phones, brands, or accessories"
          className="min-w-0 flex-1 bg-transparent px-2 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 sm:text-base"
        />

        <button
          type="button"
          aria-label="Search"
          className="shrink-0 rounded-xl bg-slate-950 px-4 py-3 text-sm font-bold text-white sm:px-5"
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default Search;
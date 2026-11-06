
import { useState, useContext } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";
import { useNavigate } from "react-router-dom";

const initialProduct = {
  brand: "",
  model: "",
  color: "",
  imageUrl: [""],
  MRF: "",
  Price: "",
  Discount: "",
  Ram: "",
  Rom: "",
  Processor: "",
  Display: "",
  Battery: "",
  water: "",
  rearCamera: "",
  frontCamera: "",
  OPURL:"",
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const ProductPost = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState(initialProduct);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = ({ target }) => {
    setFormData((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  };

  const handleImageChange = (index, value) => {
    setFormData((current) => ({
      ...current,
      imageUrl: current.imageUrl.map((url, i) =>
        i === index ? value : url
      ),
    }));
  };

  const addImageInput = () => {
    setFormData((current) => ({
      ...current,
      imageUrl: [...current.imageUrl, ""],
    }));
  };

  const removeImageInput = (index) => {
    setFormData((current) => ({
      ...current,
      imageUrl: current.imageUrl.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!user?.id) {
      setError("User not found. Please log in again.");
      return;
    }

    const imageUrls = formData.imageUrl
      .map((url) => url.trim())
      .filter(Boolean);

    if (imageUrls.length === 0) {
      setError("Please provide at least one product image URL.");
      return;
    }

    const product = {
      userId: user.id,
      brand: formData.brand,
      model: formData.model,
      color: formData.color,
      image: imageUrls.map((url) => ({ url })),
      OPURL:formData.OPURL,
      productdetails: {
        MRF: formData.MRF,
        Price: formData.Price,
        Discount: formData.Discount,
        Ram: formData.Ram,
        Rom: formData.Rom,
        Processor: formData.Processor,
        Display: formData.Display,
        Battery: formData.Battery,
        water: formData.water,
        Cammera: {
          rear: formData.rearCamera,
            
          front: formData.frontCamera
           
        },
      },
    };

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5001/api/addProduct",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );

      const result = await response.json();

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Failed to add product.");
      }

      navigate("/listed-items");
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      ...initialProduct,
      imageUrl: [""],
    });
    setError("");
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 max-w-2xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Admin dashboard
          </p>
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
            Add a new product
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60"
        >
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_1.35fr] lg:p-10">
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Product identity
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add the basic product information.
                </p>
              </div>

              <div className="space-y-5">
                <label className="block text-sm font-semibold text-slate-700">
                  Brand
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                  >
                    <option value="">Select a brand</option>
                    {[
                      "Samsung",
                      "Apple",
                      "OnePlus",
                      "Xiaomi",
                      "Realme",
                      "Vivo",
                      "Oppo",
                      "iQOO",
                    ].map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Model name
                  <input
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Galaxy S25 Ultra"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Available colors
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    placeholder="Black, Silver, Blue"
                    className={inputClassName}
                  />
                  <span className="mt-2 block text-xs font-normal text-slate-400">
                    Separate colors with commas.
                  </span>
                </label>

                <div className="text-sm font-semibold text-slate-700">
                  Product images

                  {formData.imageUrl.map((url, index) => (
                    <div key={index} className="mt-2 flex items-center gap-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(event) =>
                          handleImageChange(index, event.target.value)
                        }
                        placeholder="https://example.com/product.jpg"
                        className={inputClassName}
                        aria-label={`Product image URL ${index + 1}`}
                      />

                      {formData.imageUrl.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageInput(index)}
                          className="mt-2 rounded-lg bg-red-100 px-3 py-3 text-sm text-red-600"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addImageInput}
                    className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                  >
                    + Add More Image
                  </button>
                </div>

                <div className="rounded-2xl bg-slate-100 p-3">
                  <p className="mb-3 text-sm font-semibold text-slate-700">
                    Image previews
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    {formData.imageUrl
                      .filter((url) => url.trim())
                      .map((url, index) => (
                        <div
                          key={`${index}-${url}`}
                          className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-white"
                        >
                          <img
                            src={url}
                            alt={`Product preview ${index + 1}`}
                            className="h-full w-full object-contain"
                            onError={(event) => {
                              event.currentTarget.style.visibility = "hidden";
                            }}
                            onLoad={(event) => {
                              event.currentTarget.style.visibility = "visible";
                            }}
                          />
                        </div>
                      ))}
                  </div>

                  {!formData.imageUrl.some((url) => url.trim()) && (
                    <p className="py-6 text-center text-sm text-slate-400">
                      Product previews will appear here.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">
                  Product details
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Add specifications shoppers use to compare devices.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block text-sm font-semibold text-slate-700">
                  MRP
                  <input
                    type="number"
                    min="0"
                    name="MRP"
                    value={formData.MRF}
                    onChange={(event) =>
                      setFormData((current) => ({
                        ...current,
                        MRF: event.target.value,
                      }))
                    }
                    required
                    placeholder="99999"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Selling price
                  <input
                    type="number"
                    min="0"
                    name="Price"
                    value={formData.Price}
                    onChange={handleChange}
                    required
                    placeholder="89999"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Discount
                  <input
                    type="text"
                    name="Discount"
                    value={formData.Discount}
                    onChange={handleChange}
                    placeholder="10%"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  RAM
                  <select
                    name="Ram"
                    value={formData.Ram}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                  >
                    <option value="">Select RAM</option>
                    {["2GB", "4GB", "6GB", "8GB", "12GB", "16GB"].map(
                      (ram) => (
                        <option key={ram} value={ram}>
                          {ram}
                        </option>
                      )
                    )}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Storage
                  <select
                    name="Rom"
                    value={formData.Rom}
                    onChange={handleChange}
                    required
                    className={inputClassName}
                  >
                    <option value="">Select storage</option>
                    {[
                      "32GB",
                      "64GB",
                      "128GB",
                      "256GB",
                      "512GB",
                      "1TB",
                      "2TB",
                    ].map((rom) => (
                      <option key={rom} value={rom}>
                        {rom}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Processor
                  <input
                    name="Processor"
                    value={formData.Processor}
                    onChange={handleChange}
                    required
                    placeholder="Snapdragon 8 Gen 4"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Display
                  <input
                    name="Display"
                    value={formData.Display}
                    onChange={handleChange}
                    required
                    placeholder="Super AMOLED"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Battery
                  <input
                    name="Battery"
                    value={formData.Battery}
                    onChange={handleChange}
                    required
                    placeholder="5000 mAh"
                    className={inputClassName}
                  />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Water resistance
                  <input
                    name="water"
                    value={formData.water}
                    onChange={handleChange}
                    placeholder="IP68"
                    className={inputClassName}
                  />
                </label>
                <label className="block text-sm font-semibold text-slate-700">
                  Products URL from Official Website
                  <input
                    name="OPURL"
                    value={formData.OPURL}
                    onChange={handleChange}
                    placeholder="URL"
                    className={inputClassName}
                  />
                </label>
              </div>

              <div className="mt-8 border-t border-slate-100 pt-7">
                <h3 className="text-base font-bold text-slate-900">
                  Camera
                </h3>

                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Rear camera specifications
                    <textarea
                      name="rearCamera"
                      value={formData.rearCamera}
                      onChange={handleChange}
                      placeholder="50 MP main, 12 MP ultra-wide, 10 MP telephoto"
                      rows={4}
                      className={inputClassName}
                    />
                  </label>

                  <label className="block text-sm font-semibold text-slate-700">
                    Front camera specifications
                    <textarea
                      name="frontCamera"
                      value={formData.frontCamera}
                      onChange={handleChange}
                      placeholder="12 MP"
                      rows={4}
                      className={inputClassName}
                    />
                  </label>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Separate multiple camera specifications with commas.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <p
              role="alert"
              className="mx-6 mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600 sm:mx-10"
            >
              {error}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-10">
            <button
              type="button"
              onClick={clearForm}
              disabled={loading}
              className="rounded-xl px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200 disabled:opacity-50"
            >
              Clear form
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Adding product..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductPost;

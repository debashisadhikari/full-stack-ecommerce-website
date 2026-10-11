import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";

const initialProduct = {
  brand: "",
  model: "",
  color: "",
  imageUrl: "",
  MRF: "",
  Price: "",
  Discount: "",
  Ram: "",
  Rom: "",
  Processor: "",
  Display: "",
  Battery: "",
  rearCamera: "",
  frontCamera: "",
};

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

const ProductPost = () => {
  const {user}=useContext(AuthContext);
  const [formData, setFormData] = useState(initialProduct);

  const handleChange = ({ target }) => {
    setFormData((currentData) => ({
      ...currentData,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();

    const product = {
      userId:user.id,
      brand: formData.brand,
      model: formData.model,
      color: formData.color
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
      image: { url:formData.imageUrl.trim() },
      productdetails: {
        
        MRF: formData.MRF,
        Price: formData.Price,
        Discount: formData.Discount,
        Ram: formData.Ram,
        Rom: formData.Rom,
        Processor: formData.Processor,
        Display: formData.Display,
        Battery: formData.Battery,
        Cammera: {
          rear: formData.rearCamera
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
          front: formData.frontCamera
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
      },
    };
    const respone=await fetch("http://localhost:5001/api/addProduct",{
        method:"POST",
         credentials: "include",
        headers:{
          "Content-Type":"application/json",
        },
        body: JSON.stringify(product),
    })
    const result=await respone.json();
    console.log(result);
    

    console.log("Product ready to submit:", product);
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

        <form onSubmit={handleSubmit} className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
          <div className="grid gap-10 p-6 sm:p-8 lg:grid-cols-[1fr_1.35fr] lg:p-10">
            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">Product identity</h2>
                <p className="mt-1 text-sm text-slate-500">Start with the details customers notice first.</p>
              </div>

              <div className="space-y-5">
                <label className="block text-sm font-semibold text-slate-700">
                  Brand
                  <select name="brand" value={formData.brand} onChange={handleChange} required className={inputClassName}>
                    <option value="">Select a brand</option>
                    {["Samsung", "Apple", "OnePlus", "Xiaomi", "Realme", "Vivo", "Oppo", "iQOO"].map((brand) => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Model name
                  <input name="model" value={formData.model} onChange={handleChange} required placeholder="e.g. Galaxy S25 Ultra" className={inputClassName} />
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Available colors
                  <input name="color" value={formData.color} onChange={handleChange} placeholder="Black, Silver, Blue" className={inputClassName} />
                  <span className="mt-2 block text-xs font-normal text-slate-400">Separate multiple colors with commas.</span>
                </label>

                <label className="block text-sm font-semibold text-slate-700">
                  Product image URL
                  <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://example.com/product.jpg" className={inputClassName} />
                </label>

                <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-slate-100">
                  {formData.imageUrl ? (
                    <img src={formData.imageUrl} alt="Product preview" className="h-full w-full object-contain" />
                  ) : (
                    <div className="text-center text-slate-400">
                      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">+</div>
                      <p className="text-sm font-medium">product preview</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-slate-900">Product details</h2>
                <p className="mt-1 text-sm text-slate-500">Add specifications shoppers use to compare devices.</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {[
                  ["MRF", "MRP", "e.g. 89999", "number"],
                  ["Price", "Selling price", "e.g. 74999", "number"],
                  ["Discount", "Discount", "e.g. 16%", "text"],
                  ["Ram", "RAM", "e.g. 12 GB", "text"],
                  ["Rom", "Storage", "e.g. 256 GB", "text"],
                  ["Processor", "Processor", "e.g. Snapdragon 8 Elite", "text"],
                  ["Display", "Display", "e.g. 6.9 inch AMOLED", "text"],
                  ["Battery", "Battery", "e.g. 5000 mAh", "text"],
                ].map(([name, label, placeholder, type]) => (
                  <label key={name} className="block text-sm font-semibold text-slate-700">
                    {label}
                    <input type={type} name={name} value={formData[name]} onChange={handleChange} placeholder={placeholder} required className={inputClassName} />
                  </label>
                ))}
              </div>

              <div className="mt-8 border-t border-slate-100 pt-7">
                <h3 className="text-base font-bold text-slate-900">Camera</h3>
                <div className="mt-4 grid gap-5 sm:grid-cols-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Rear camera
                    <input name="rearCamera" value={formData.rearCamera} onChange={handleChange} placeholder="50 MP, 12 MP ultrawide" required className={inputClassName} />
                  </label>
                  <label className="block text-sm font-semibold text-slate-700">
                    Front camera
                    <input name="frontCamera" value={formData.frontCamera} onChange={handleChange} placeholder="12 MP" required className={inputClassName} />
                  </label>
                </div>
                <p className="mt-2 text-xs text-slate-400">Separate multiple camera specifications with commas.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-10">
            <button type="button" onClick={() => setFormData(initialProduct)} className="rounded-xl px-5 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-200 hover:text-slate-900">
              Clear form
            </button>
            <button type="submit" className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default ProductPost;
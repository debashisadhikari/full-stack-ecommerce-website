import { useEffect, useState } from "react";


const EditItems = () => {
  const [myProducts,setProducts]=useState([]);
  const [loading,setLoding]=useState(true);
  useEffect(()=>{
    const getProduct=async()=>{
      try{
      const respone=await fetch("http://localhost:5001/api/getproduct",{
         credentials: "include",
      });
      const data=await respone.json();
      setProducts(data.allProducts);
      console.log("all data",data);
      }catch{

      }finally{
        setLoding(false);
      }
    }
     getProduct();
  },[])
 if (loading) {
  return (
    <main
      className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8"
      role="status"
      aria-label="Loading products"
      aria-busy="true"
    >
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 space-y-3">
          <div className="h-4 w-28 rounded bg-slate-200" />
          <div className="h-9 w-48 rounded bg-slate-200" />
          <div className="h-4 w-64 max-w-full rounded bg-slate-200" />
        </div>

        <div className="space-y-4">
          {[0, 1, 2].map((item) => (
            <div
              key={item}
              className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="h-28 w-28 shrink-0 rounded-xl bg-slate-200" />

              <div className="min-w-0 flex-1 space-y-4">
                <div className="h-5 w-40 rounded bg-slate-200" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {[0, 1, 2, 3, 4].map((detail) => (
                    <div key={detail} className="space-y-2">
                      <div className="h-3 w-12 rounded bg-slate-200" />
                      <div className="h-4 w-20 max-w-full rounded bg-slate-200" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="h-12 w-full rounded-xl bg-slate-200 sm:w-24" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

 

  

 

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-black text-slate-950">
            Edit Items
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage the products added by you.
          </p>
        </div>

        {myProducts.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <h2 className="text-xl font-bold text-slate-900">
              No products found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You have not added any products yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {myProducts.map((product)=>(
  <div
               
                className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center"
                key={product._id}
              >
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-slate-100 p-3">
                  <img
                     className="h-full w-full object-contain"
                    src={product.image[0]}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-slate-950">
                   
                  </h2>

                  <div className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2 text-sm sm:grid-cols-5">
                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Brand
                      </p>
                      <p className="font-semibold text-slate-700">
                        {product.brand}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Model
                      </p>
                      <p className="font-semibold text-slate-700">
                     {product.model}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        RAM
                      </p>
                      <p className="font-semibold text-slate-700">
                 {product.specification.Ram} GB 
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        ROM
                      </p>
                      <p className="font-semibold text-slate-700">
                        {product.specification.Rom} GB
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-slate-400">
                        Price
                      </p>
                      <p className="font-bold text-slate-950">
                     ₹ {product.specification.Price}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                 
                  className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            ))}
            
            
            
          </div>
        )}
      </div>
    </main>
  );
};

export default EditItems;
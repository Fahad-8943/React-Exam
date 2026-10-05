import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import { getAllProducts } from "../services/allApi";

import Loader from "../components/Loader";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllProducts()
      .then((res) => setProducts(res.data))
      .catch((err) => {
        console.error("Could not load products:", err);
        setError("Failed to load products. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <main className="flex min-h-[60vh] items-center justify-center bg-slate-50"><Loader /></main>;
  }
  if (error) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4">
        <p role="alert" className="rounded-xl border border-red-200 bg-white px-6 py-4 text-center font-medium text-red-600 shadow-sm">{error}</p>
      </main>
    );
  }
  return (
    <main className="min-h-[calc(100vh-8rem)] bg-slate-50">
      {products?.length === 0 ? (
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center px-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-2xl text-green-800">＋</div>
            <h1 className="text-xl font-bold text-slate-900">No products yet</h1>
            <p className="mt-2 text-sm text-slate-500">Add your first item to get the catalog started.</p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-green-800">Browse the collection</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">Our Products</h1>
            </div>
            <p className="text-sm text-slate-500">{products.length} {products.length === 1 ? "item" : "items"} in your catalog</p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products?.map((product) => (
              <ProductCard key={product.id} products={product} />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}

export default Home;

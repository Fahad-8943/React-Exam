import { useState } from "react";
import { useNavigate } from "react-router";
import { postProduct } from "../services/allApi";

const initialForm = { name: "", price: "", category: "" };

function AddProducts() {
  const [form, setForm] = useState(initialForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price);
    if (!name || !category || form.price === "" || !Number.isFinite(price) || price < 0) {
      setError("Enter a name, category, and a valid non-negative price.");
      return;
    }

    setSaving(true);
    try {
      await postProduct({ name, price, category });
      setForm(initialForm);
      navigate("/");
    } catch (err) {
      console.error("Could not add product:", err);
      setError("Could not add product. Check that the API server is running.");
    } finally {
      setSaving(false);
    }
  };
  

  return (
    <main className="min-h-[calc(100vh-9rem)] bg-slate-50 px-4 py-12">
      <section className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
        <div className="bg-green-800 px-6 py-6 text-white sm:px-8">
          <p className="text-sm font-medium text-green-100">PRODUCT CATALOG</p>
          <h1 className="mt-1 text-2xl font-bold">Add a product</h1>
          <p className="mt-2 text-sm text-green-100">Enter the details to add an item to your catalog.</p>
        </div>
        <form className="flex flex-col gap-2 px-6 py-7 sm:px-8" onSubmit={handleSubmit}>
        <label className="mt-2 text-sm font-semibold text-slate-700" htmlFor="name">Product name</label>
        <input className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/15" placeholder="e.g. Wireless headphones" id="name" name="name" value={form.name} onChange={handleChange} required />
        <label className="mt-3 text-sm font-semibold text-slate-700" htmlFor="price">Price (₹)</label>
        <input className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/15" placeholder="0.00" id="price" name="price" type="number" min="0" step="any" value={form.price} onChange={handleChange} required />
        <label className="mt-3 text-sm font-semibold text-slate-700" htmlFor="category">Category</label>
        <input className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-green-700 focus:ring-2 focus:ring-green-700/15" placeholder="e.g. Electronics" id="category" name="category" value={form.category} onChange={handleChange} required />
        {error && <p role="alert" className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button className="mt-5 rounded-lg bg-green-800 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60" type="submit" disabled={saving}>
          {saving ? "Adding..." : "Add Product"}
        </button>
      </form>
      </section>
    </main>
  );
}

export default AddProducts;

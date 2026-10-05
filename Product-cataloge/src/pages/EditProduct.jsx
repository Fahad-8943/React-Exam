import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAllProducts, updateProduct } from "../services/allApi";
import Loader from "../components/Loader";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", price: "", category: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    getAllProducts()
      .then((response) => {
        const product = response.data.find((item) => String(item.id) === id);
        if (!product) {
          if (active) setError("Product not found.");
          return;
        }
        if (active) {
          setForm({
            name: product.name ?? "",
            price: String(product.price ?? ""),
            category: product.category ?? "",
          });
        }
      })
      .catch((err) => {
        console.error("Could not load product:", err);
        if (active)
          setError(
            "Could not load product. Check that the API server is running.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const name = form.name.trim();
    const category = form.category.trim();
    const price = Number(form.price);
    if (
      !name ||
      !category ||
      form.price === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      setError("Enter a name, category, and a valid non-negative price.");
      return;
    }

    setSaving(true);
    try {
      await updateProduct(id, { name, price, category });
      alert("Product updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Could not update product:", err);
      setError(
        "Could not update product. Check that the API server is running.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-[calc(100vh-9rem)] bg-slate-50 px-4 py-12">
      <section className="mx-auto max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg shadow-slate-900/5">
      <div className="bg-green-800 px-6 py-6 text-white sm:px-8">
        <p className="text-sm font-medium text-green-100">PRODUCT CATALOG</p>
        <h1 className="mt-1 text-2xl font-bold">Edit product</h1>
        <p className="mt-2 text-sm text-green-100">Update the details below and save your changes.</p>
      </div>
      {error && (
        <p role="alert" className="mb-3 text-red-600">
          {error}
        </p>
      )}
      {!error && (
        <form className="flex flex-col gap-2 px-6 py-7 sm:px-8" onSubmit={handleSubmit}>
          <label className="mt-2 text-sm font-semibold text-slate-700" htmlFor="name">Product name</label>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <label className="mt-3 text-sm font-semibold text-slate-700" htmlFor="price">Price (₹)</label>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
            id="price"
            name="price"
            type="number"
            min="0"
            step="any"
            value={form.price}
            onChange={handleChange}
            required
          />
          <label className="mt-3 text-sm font-semibold text-slate-700" htmlFor="category">Category</label>
          <input
            className="rounded-lg border border-slate-300 px-3 py-2.5 text-slate-900 outline-none transition focus:border-green-700 focus:ring-2 focus:ring-green-700/15"
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />
          <button
            className="mt-5 rounded-lg bg-green-800 px-4 py-3 font-semibold text-white shadow-sm transition hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            type="submit"
            disabled={saving}
          >
            {saving ? "Saving..." : "Update Product"}
          </button>
        </form>
      )}
      </section>
    </main>
  );
}

export default EditProduct;

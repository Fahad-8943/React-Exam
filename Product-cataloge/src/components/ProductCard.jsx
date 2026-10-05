import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";
import { deleteProduct } from "../services/allApi";

function ProductCard({ products }) {
  const handleDelete = async () => {
    try {
      await deleteProduct(products.id);
      alert("Product deleted successfully.");
      window.location.reload(); // Refresh the page to reflect the changes
    } catch (err) {
      console.error("Could not delete product:", err);
      alert("Could not delete product.");
    }
  };

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-green-200 hover:shadow-lg">
      <div className="mb-5 flex h-32 items-center justify-center rounded-xl bg-gradient-to-br from-green-50 to-slate-100">
        <span className="text-5xl font-semibold text-green-800/70" aria-hidden="true">
          {products.name?.charAt(0)?.toUpperCase() || "P"}
        </span>
      </div>
      <div className="flex flex-1 flex-col">
        <span className="mb-2 w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-800">
          {products.category}
        </span>
        <h2 className="text-lg font-semibold text-slate-900">{products.name}</h2>
        <p className="mt-2 text-xl font-bold text-green-800">
          {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(products.price) || 0)}
        </p>
      <div className="mt-auto flex justify-between gap-3 pt-5">
        <Link
          to={`/editProduct/${products.id}`}
          aria-label={`Edit ${products.name}`}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-green-700 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
        >
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Link>
        <button className="rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" onClick={handleDelete}>
          Delete
        </button>
      </div>
      </div>
    </article>
  );
}

export default ProductCard;

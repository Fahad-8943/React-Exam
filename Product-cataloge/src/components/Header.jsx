import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-green-900/10 bg-green-800 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link to="/" className="flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/80">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <FontAwesomeIcon icon={faCartShopping} />
        </span>
        <span>
          <span className="block text-lg font-bold tracking-tight">Product Catalog</span>
          <span className="block text-xs text-green-100">Find your next favorite</span>
        </span>
      </Link>
      <nav aria-label="Main navigation">
        <ul className="flex items-center gap-2">
          <li>
            <Link className="rounded-lg px-4 py-2 text-sm font-medium text-green-50 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/80" to="/">Home</Link>
          </li>
          <li>
            <Link className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-800 shadow-sm transition hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-white/80" to="/addProducts">Add Product</Link>
          </li>
        </ul>
      </nav>
      </div>
    </header>
  );
}

export default Header;

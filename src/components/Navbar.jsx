import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">

          <Link
            to="/"
            className="text-3xl font-extrabold tracking-tight"
          >
            <span className="text-black">Qmax</span>{" "}
            <span className="text-red-700">PCB Toolkit</span>
          </Link>

          <Link
            to="/"
            className="text-gray-700 hover:text-red-700 font-medium transition"
          >
            Home
          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
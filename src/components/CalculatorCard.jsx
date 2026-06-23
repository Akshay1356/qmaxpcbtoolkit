import { Link } from "react-router-dom";

function CalculatorCard({ title, description, link }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      <h2 className="text-gray-900 text-2xl font-bold mb-4">
        {title}
      </h2>

      <p className="text-gray-600 mb-6 min-h-[72px]">
        {description}
      </p>

      <Link
        to={link}
        className="inline-block bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-lg font-medium transition"
      >
        Open Calculator
      </Link>

    </div>
  );
}

export default CalculatorCard;
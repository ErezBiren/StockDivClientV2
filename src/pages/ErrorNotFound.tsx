import { Link } from "react-router-dom";

function ErrorNotFound() {
  return (
    <div className="bg-iconsColor text-white text-center flex items-center justify-center">
      <div>
        <div className="text-9xl mb-6">404</div>

        <div className="text-4xl opacity-40 mb-8">Oops. Nothing here...</div>

        <Link
          to="/"
          className="bg-white text-blue-500 font-bold py-4 px-8 rounded-md uppercase tracking-wide hover:bg-blue-500 hover:text-white transition duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorNotFound;

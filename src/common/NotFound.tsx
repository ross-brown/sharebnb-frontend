import { Link } from "react-router-dom";

/** Custom 404 page component */
function NotFound() {
  return (
    <div className="text-center mt-64">
      <p className="text-base font-semibold text-green-600">404</p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Page not found
      </h1>
      <p className="mt-6 text-base leading-7 text-gray-600">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <div className="mt-10 flex items-center justify-center">
        <Link
          to="/"
          className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
          Go Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

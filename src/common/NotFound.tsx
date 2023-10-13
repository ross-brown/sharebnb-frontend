import { Link } from "react-router-dom";

/** Custom 404 page component */
function NotFound() {
  return (
    <div className="text-center mt-64">
      <h1 className="font-bold text-3xl">Sorry, this page isn't available.</h1>
      <p>Either the page is broken, deleted, or doesn't exist.</p>
      <Link to="/" className="block mt-5 text-green-500 font-bold text-xl hover:text-green-400">Go Home</Link>
    </div>
  );
}

export default NotFound;

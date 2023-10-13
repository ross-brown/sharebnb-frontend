import { Link } from "react-router-dom";

/** Custom 404 page component */
function NotFound() {
  return (
    <div>
      <h1>Sorry, this page isn't available.</h1>
      <p>Either the page is broken, deleted, or doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;

import { Link } from "react-router-dom";


function NotFound() {
  return (
    <div>
      <h1>Page not found...</h1>
      <p>You seem to be lost, or this page is broken</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

export default NotFound;

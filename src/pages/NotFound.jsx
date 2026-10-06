// Not Found Page (404)
// This page is shown when the user visits a URL that doesn't exist
// In App.jsx we use path="*" to catch all unknown routes

import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="page-wrapper">
      <div className="notfound-wrapper">
        {/* Big 404 number as a decorative heading */}
        <h1>404</h1>

        <h2>Oops! Page Not Found</h2>
        <p>The page you are looking for doesn't exist or has been moved.</p>

        {/* Link back to home */}
        <Link to="/" className="btn-go-home">
          ← Go Back Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;

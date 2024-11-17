import React from 'react';
import { Link } from 'react-router-dom';

import pageNotFound from '../../Assets/pageNotFound.png'

function PageNotFound() {
  return (
    <div className="text-center mt-5">
      <img
        src={pageNotFound}
        alt="Page Not Found"
        width="550"
        height="300"
        className="rounded"
      />
      <p className="mt-3">
        The page you are looking for does not exist.
      </p>
      <Link to="/">
        <button className="btn btn-secondary" style={{backgroundColor: '#61677A'}}>Go to Home Page</button>
      </Link>
    </div>
  );
}

export default PageNotFound;
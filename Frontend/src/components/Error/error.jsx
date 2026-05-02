import React from 'react';
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div id="wrapper">
      <div className="container-fluid">
        <div className="text-center">
          <div className="error mx-auto" data-text="404">404</div>
          <p className="lead text-gray-800 mb-5">Page Not Found</p>
          <p className="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>
          <a href="/" className="back-link">&larr; Back to Home</a>
        </div>
      </div>

      <footer className="sticky-footer bg-white">
        <div className="container my-auto">
          <div className="copyright text-center my-auto">
            <span>Copyright &copy; Foodie 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ErrorPage;

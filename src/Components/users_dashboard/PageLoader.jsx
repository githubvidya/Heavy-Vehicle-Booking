// components/PageLoader.jsx
import React from "react";

const PageLoader = () => {
  return (
    <div className="pageLoader">
      <div className="loaderWrapper">
        <div className="truckLoader">🚚</div>

        <h1 className="loaderTitle">
          Heavy Vehicle Booking
        </h1>

        <div className="loadingBar">
          <div className="loadingProgress"></div>
        </div>

        <p className="loaderText">
          Finding the best vehicles for you...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
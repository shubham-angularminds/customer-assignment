import React from "react";
import CustomerProfile from "../components/CustomerProfile";

function Profile() {
  return (
    <div>
      <div className="container">
        <div className="row mt-5 justify-content-center">
          <h1> Customer Profile </h1>
        </div>
        <div className="row mt-3 justify-content-center">
          <div className="col-md-10">
            <CustomerProfile />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;

import React, { Component } from "react";
import CustomerForm from "../components/CustomerForm";

export class Home extends Component {
  render() {
    return (
      <div>
        <div className="Home container">
          <div className="row mt-5 justify-content-center"></div>
          <div className="row mt-3 justify-content-center">
            <div className="col-md-6">
              <CustomerForm />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

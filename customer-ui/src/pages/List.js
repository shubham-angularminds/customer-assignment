import React, { Component } from "react";
import CustomerTable from "../components/CustomerTable";

export class List extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row mt-5 justify-content-center">
            <h1> Customer List </h1>
          </div>
          <div className="row mt-3 justify-content-center">
            <div className="col-md-10">
              <CustomerTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;

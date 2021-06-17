import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { withRouter } from "react-router-dom";
import "boxicons";

function CustomerTable(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/customers")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleDelete = (customerId) => {
    console.log("customer ID", customerId);
    alert("Confirm Delete the Customer");
    let updatedData = data.filter((item) => item._id !== customerId);
    setData(updatedData);

    axios
      .delete(`http://localhost:8080/api/customers/${customerId}`)
      .then((response) => {
        console.log(response);
        NotificationManager.success(
          "Customer Is Deleted Successfully",
          "Successful!",
          1000
        );
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleEdit = (customer) => {
    props.history.push({
      pathname: `/customer/edit/${customer._id}`,
      state: {
        data: customer,
      },
    });
  };

  const handleProfile = (id) => {
    props.history.push({
      pathname: `/customer/${id}`,
    });
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Sr No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Status</th>
            <th>Occupation</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer, index) => (
            <tr key={customer._id}>
              <td>{index + 1}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.status}</td>
              <td>{customer.occupation}</td>

              <td>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <box-icon
                  type="solid"
                  name="edit"
                  id="icons"
                  onClick={() => handleEdit(customer)}
                ></box-icon>
                {"   "} &nbsp; &nbsp;
                <box-icon
                  type="solid"
                  name="trash"
                  id="icons"
                  onClick={() => handleDelete(customer._id)}
                ></box-icon>
                {"   "} &nbsp; &nbsp;
                <box-icon
                  name="show"
                  id="icons"
                  onClick={() => handleProfile(customer._id)}
                ></box-icon>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default withRouter(CustomerTable);

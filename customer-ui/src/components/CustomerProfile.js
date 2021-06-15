import React, { useState, useEffect } from "react";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { withRouter, useParams, useHistory } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import moment from "moment";

function CustomerProfile() {
  const [data, setData] = useState([]);
  let history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/customers/${id}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div className="profile">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div class="card profile-card">
            <div class="card-body">
              <button onClick={() => history.goBack()}>Back</button>

              <div class="d-flex flex-column align-items-center text-center">
                <img
                  src={`http://localhost:8080/api/customers/photo/${id}`}
                  alt="Profile Pic"
                  class="rounded-circle"
                  width="150"
                />
                <div class="mt-3">
                  <h4>{data.firstName + " " + data.lastName}</h4>
                  <p class="text-secondary mb-1">{data.occupation}</p>
                  <p class="text-muted font-size-sm">
                    {moment(data.dob).format("DD/MM/YYYY")}
                  </p>
                  <p class="text-muted font-size-sm">Status: {data.status}</p>
                  <p class="text-muted font-size-sm">Bio: {data.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CustomerProfile);

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Row, Col } from "react-bootstrap";
import Datetime from "react-datetime";
import axios from "axios";
import { NotificationManager } from "react-notifications";
import { withRouter, useParams } from "react-router-dom";
import moment from "moment";
import { serialize } from "object-to-formdata";

import "react-datetime/css/react-datetime.css";

function CustomerForm(props) {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [isImageUpdated, setIsImageUpdated] = useState(false);
  const [img, SetImg] = useState(null);

  const [defaultData, setDefaultData] = useState({
    bio: "",
    dob: "",
    firstName: "",
    lastName: "",
    occupation: "",
    photo: null,
    status: "",
  });

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultData,
  });

  useEffect(() => {
    if (props.isEditing) {
      axios
        .get(`http://localhost:8080/api/customers/${id}`)
        .then((response) => {
          console.log(response.data);
          setDefaultData(response.data);
          reset(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }, [reset, props.isEditing, id]);

  const redirect = () => {
    props.history.push({
      pathname: `/`,
    });
  };

  const handleImage = (e) => {
    SetImg(e.target.files[0]);
    setIsImageUpdated(true);
  };

  const onSubmit = (data, e) => {
    console.log(data);
    e.preventDefault();
    //Convert Data into new formData object
    const formData = new FormData();
    const nform = serialize(data);
    console.log("Data :", data);
    for (let [key, value] of formData) {
      console.log(`${key}: ${value}`);
    }
    //Updating Existing Customer
    if (props.isEditing) {
      console.log("Update Data", nform);
      if (isImageUpdated) {
        nform.append("photo", img);
      }
      axios
        .put(`http://localhost:8080/api/customers/edit/${id}`, nform, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          NotificationManager.success(
            "Customer Is Successfully Updated!",
            "Redirecting!",
            2000
          );
        })
        .then(() => {
          setTimeout(redirect, 2000);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
    //Creating new Customer
    else {
      nform.append("photo", img);
      axios
        .post("http://localhost:8080/api/customers/add", nform, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          NotificationManager.success(
            "Customer Is Successfully Added to the Database!",
            "Redirecting!",
            2000
          );
        })
        .then(() => {
          setTimeout(redirect, 2000);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <div className="form">
      <div className="row justify-content-center">
        <h3> Customer Form </h3>
      </div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group controlId="formBasicName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter First Name"
            {...register("firstName", { required: true, maxLength: 20 })}
          />
          <p className="error-text">
            {errors.firstName?.type === "required" && "First name is required"}{" "}
          </p>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Last Name"
            {...register("lastName", { required: true, maxLength: 20 })}
          />
          <p className="error-text">
            {errors.lastName?.type === "required" && "Last name is required"}{" "}
          </p>
        </Form.Group>
        <Form.Group controlId="formBasicOccupation">
          <Form.Label>Occupation</Form.Label>
          <Form.Control
            as="select"
            {...register("occupation", { required: true, maxLength: 20 })}
          >
            <option>Employed</option>
            <option>Business</option>
            <option>Student</option>
          </Form.Control>
          <p className="error-text">
            {errors.occupation?.type === "required" && "Occupation is required"}{" "}
          </p>
        </Form.Group>

        <Form.Group controlId="formDob">
          <Form.Label>Date of Birth</Form.Label>
          {props.isEditing ? (
            <Controller
              control={control}
              name="dob"
              rules={{ required: true }}
              render={({ field }) => (
                <Datetime
                  onChange={(e) => field.onChange(e._d)}
                  timeFormat={false}
                  dateFormat="DD/MM/YYYY"
                  initialValue={moment(props.location.state.data.dob).format(
                    "DD/MM/YYYY"
                  )}
                />
              )}
            />
          ) : (
            <>
              <Controller
                control={control}
                name="dob"
                rules={{ required: true }}
                render={({ field }) => (
                  <Datetime
                    onChange={(e) => field.onChange(e._d)}
                    timeFormat={false}
                    dateFormat="DD/MM/YYYY"
                  />
                )}
              />
              <p className="error-text">
                {errors.dob?.type === "required" && "Date Of Birth is required"}{" "}
              </p>
            </>
          )}
        </Form.Group>

        <fieldset>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Status
            </Form.Label>
            <Col sm={10}>
              <Form.Check
                {...register("status", { required: true })}
                type="radio"
                label="Active"
                name="status"
                id="formHorizontalRadios1"
                value="active"
              />
              <Form.Check
                {...register("status", { required: true })}
                type="radio"
                label="Inactive"
                name="status"
                id="formHorizontalRadios2"
                value="inactive"
              />
            </Col>
            <p className="error-text ml-3">
              {errors.status?.type === "required" && "Please Select Status"}{" "}
            </p>
          </Form.Group>
        </fieldset>

        <Form.Group controlId="formBio">
          <Form.Label>Bio</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("bio", { required: true })}
          />
          <p className="error-text ml-3">
            {errors.bio?.type === "required" && "Bio is Required"}{" "}
          </p>
        </Form.Group>

        <Form.Group>
          <Form.File
            className="position-relative"
            name="photo"
            label="Profile Photo"
            id="profilephoto"
            onChange={handleImage}
            feedbackTooltip
          />
          {/* <Controller
            control={control}
            name="photo"
            render={({ field }) => (
              <Form.File
                className="position-relative"
                name="photo"
                label="Profile Photo"
                id="photo"
                onChange={
                  ((e) => field.onChange(e.target.files[0]),
                  setIsImageUpdated(true))
                }
                feedbackTooltip
              />
            )}
          /> */}
        </Form.Group>
        <Row className="mt-5 justify-content-left">
          <Col>
            <Row>
              {props.isEditing ? (
                <Button className="ml-3" variant="dark" type="submit">
                  Update
                </Button>
              ) : (
                <Button className="ml-3" variant="dark" type="submit">
                  Submit
                </Button>
              )}
              <Button
                className="ml-2"
                variant="dark"
                type="button"
                onClick={redirect}
              >
                Back
              </Button>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default withRouter(CustomerForm);

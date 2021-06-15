const _ = require("lodash");
const formidable = require("formidable");
const fs = require("fs");
const Customer = require("../models/customer");

exports.getAllCustomers = (req, res) => {
  Customer.find((err, customers) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json(customers);
  }).select("firstName lastName occupation dob status bio");
};

exports.addCustomers = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.parse(req, (err, fields, files) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    let customer = new Customer(fields);
    if (files.photo) {
      customer.photo.name = files.photo.name;
      customer.photo.data = fs.readFileSync(files.photo.path);
      customer.photo.contentType = files.photo.type;
    }

    customer.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(result);
    });
  });
};

exports.updateCustomer = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    console.log(err);
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }
    // save post
    let customer = req.customer;
    customer = _.extend(customer, fields);

    if (files.photo) {
      customer.photo.name = files.photo.name;
      customer.photo.data = fs.readFileSync(files.photo.path);
      customer.photo.contentType = files.photo.type;
    }

    customer.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: err,
        });
      }
      res.json(customer);
    });
  });
};

exports.photo = (req, res, next) => {
  res.set("Content-Type", req.customer.photo.contentType);
  return res.send(req.customer.photo.data);
};

exports.customerById = (req, res, next, id) => {
  Customer.findById(id)
    .select("_id firstName lastName occupation dob status bio photo")
    .exec((err, customer) => {
      if (err || !customer) {
        return res.status(400).json({
          error: "Customer not found",
        });
      }
      req.customer = customer; // adds customer object in req with customer info
      next();
    });
};

exports.deleteCustomer = (req, res) => {
  let customer = req.customer;
  customer.remove((err) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: "Customer deleted successfully",
    });
  });
};

exports.getCustomer = (req, res) => {
  return res.json(req.customer);
};

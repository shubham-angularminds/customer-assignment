const express = require("express");
const {
  addCustomers,
  getAllCustomers,
  deleteCustomer,
  customerById,
  updateCustomer,
  getCustomer,
  photo,
} = require("../controllers/customer");

const router = express.Router();

router.post("/customers/add", addCustomers);
router.get("/customers", getAllCustomers);
router.delete("/customers/:customerId", deleteCustomer);
router.put("/customers/edit/:customerId", updateCustomer);
router.get("/customers/:customerId", getCustomer);
router.get("/customers/photo/:customerId", photo);

//any routes containing :customerId, our app will first execute customerByid()
router.param("customerId", customerById);

module.exports = router;

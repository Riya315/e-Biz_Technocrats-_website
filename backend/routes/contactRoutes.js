const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

console.log(contactController);
console.log(typeof contactController.submitContact);

router.post("/", contactController.submitContact);

module.exports = router;
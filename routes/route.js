const express = require("express");
const router = express.Router();

const controller = require("../controller/auth");
const { viewCart, cartCount, updateCart } = require("../controller/cart");

//authenticate
router.post("/register", controller.register);
router.post("/login", controller.login);

//client routes

router.get("/viewCart", viewCart);
router.get("/cartCount", cartCount);
router.post("/updateCart", updateCart);


module.exports = router;

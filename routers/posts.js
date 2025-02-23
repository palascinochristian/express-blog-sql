const express = require("express");
const idValidation = require("../middlewares/idValidation");
const controller = require("../controller/postsController");
const router = express.Router();

router.use("/:id", idValidation);

//Index
router.get("/", controller.index);

//Show
router.get("/:id", controller.show);

//Store
router.post("/", controller.store);

//Update
router.put("/:id", controller.update);

//Modify
router.patch("/:id", controller.modify);

//Delete
router.delete("/:id", controller.destroy);

module.exports = router;

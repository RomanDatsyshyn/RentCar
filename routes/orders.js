const router = require("express").Router();
const orders = require("../controllers/orders");

router.post("/", orders.create);
router.get("/", orders.getAll);
router.get("/:id", orders.getById);
router.put("/:id", orders.update);
router.delete("/:id", orders.delete);

module.exports = router;

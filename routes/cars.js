const router = require("express").Router();
const multer = require("multer");
const cars = require("../controllers/cars");

router.get("/", cars.getAll);
router.get("/search", cars.getByParams);
router.get("/:id", cars.getById);
router.put("/:id", cars.update);
router.delete("/:id", cars.delete);

// For upload image in post request

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./carImage/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.post("/", upload.single("carImage"), cars.create);

module.exports = router;

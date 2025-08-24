const router = require("express").Router();
const FacilityController = require("../controllers/FacilityController");

// GET all facilities
router.get("/", FacilityController.getAllFacilities);

// GET facility by id
router.get("/search/:id", FacilityController.getFacilityById);

// POST new facility
router.post("/add", FacilityController.createFacility);

// PUT update facility
router.put("/update/:id", FacilityController.updateFacility);

// DELETE facility
router.delete("/delete/:id", FacilityController.deleteFacility);

module.exports = router;

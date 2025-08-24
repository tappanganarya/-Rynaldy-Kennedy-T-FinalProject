const router = require("express").Router();
const KosController = require("../controllers/KosController");

// GET all kos
router.get("/", KosController.getAllKos);

// GET kos by id
router.get("/search/:id", KosController.getKosById);

// POST new kos
router.post("/add", KosController.createKos);

// PUT update kos
router.put("/update/:id", KosController.updateKos);

// DELETE kos
router.delete("/delete/:id", KosController.deleteKos);

// Add Fasilities kos
router.post("/:kosId/facilities", KosController.addFacilitiesToKos);

// detail kos
router.get("/:id", KosController.detailKost)

module.exports = router;

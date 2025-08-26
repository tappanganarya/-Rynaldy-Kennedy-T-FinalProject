const router = require("express").Router();
const { authentication, authorization } = require("../middlewares/auth");
const KosController = require("../controllers/KosController");


// Public route (tanpa login)
router.get("/public", KosController.getAllKosPublic);

// GET all kos
router.get("/", authentication, KosController.getAllKos);

// GET kos by id
router.get("/search/:id", KosController.getKosById);

// POST new kos
router.post("/add", authentication, KosController.createKos);

// PUT update kos
router.put("/update/:id", authentication, KosController.updateKos);

// DELETE kos
router.delete("/delete/:id", authentication, KosController.deleteKos);

// Add Fasilities kos
router.post("/:kosId/facilities", KosController.addFacilitiesToKos);

// detail kos
router.get("/:id", KosController.detailKost)

module.exports = router;

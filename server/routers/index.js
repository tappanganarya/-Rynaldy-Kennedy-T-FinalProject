const router = require("express").Router();
const base = "api";

// Route dasar (cek server)
router.get(`/${base}`, (req, res) => {
    res.send({ message: "WEB API" });
});

// Import semua router
const userRouter = require("./userRoutes");
const kosRouter = require("./kosRoutes");
const facilityRouter = require("./facilityRoutes");

// Pasang router
router.use(`/${base}/users`, userRouter);
router.use(`/${base}/kos`, kosRouter);
router.use(`/${base}/facilities`, facilityRouter);

module.exports = router;

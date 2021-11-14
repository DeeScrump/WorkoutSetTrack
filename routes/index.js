const router = require("express").Router();
const path = require("path");
const Workout = require("../models/workoutModel.js");

router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

router.get("/", async (req, res) => {
    await Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .sort({ date: -1 })
        .limit(1)
        .then((dbFitlife) => {
            res.json(dbFitlife);
        })
        .catch((err) => {
            res.status(400).json(err);
        });
});

//get range of  workouts
router.get("/range", async (req, res) => {
    await Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .sort({ date: -1 })
        .limit(7)
        .then(dbFitlife => {
            res.json(dbFitlife);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

// router.post("api/workouts")

module.exports = router;
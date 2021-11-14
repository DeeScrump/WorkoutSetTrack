const path = require("path");
const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/workout.js");

// Routes to access each page
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/exercise", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

router.get("/stats", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});

//Route to workouts
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
              totalDuration: {
                  $sum: "$exercises.duration"
              }
            }
        }
    ])
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        }
    );
});

//get range of workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate(
        [
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            }
        }
        ]
    )
    .sort({ date: -1 })
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
})

// Create a new workout
router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        }
    );
});

//update an existing workout
router.put("/api/workouts/:id", (req, res) => {
    Workout.updateOne(
        {
            _id: req.params.id
        },
        {
            $push: {
            exercises: req.body,
            }
        }
        )
        .then((dbWorkout) => {
            res.json(dbWorkout);
        })
        .catch((err) => {
            res.status(400).json(err);
        }
    );
});

module.exports = router;
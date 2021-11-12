const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
  type: {
    type: String,
    trim: true,
    required: "String is Required"
  },

  name: {
    type: String,
    trim: true,
    required: "String is Required"
  },

  duration: {
    type: Number,
    required: false
  },

  weight: {
    type: Number,
    required: false
  },

  reps: {
    type: Number,
    required: false
  },

  sets: {
    type: Number,
    required: false
  }

});

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;
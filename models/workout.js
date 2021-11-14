const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model schema for Workout
const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  
  exercises: [{
    
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
      required: true
    },

    weight: {
      type: Number,
      required: true
    },

    reps: {
      type: Number,
      required: true
    },

    sets: {
      type: Number,
      required: true
    },
    
    distance: {
      type: Number,
      required: true
    }
  }],
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
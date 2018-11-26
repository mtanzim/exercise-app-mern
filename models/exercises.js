import mongoose  from 'mongoose';
let Schema = mongoose.Schema;

// const findUser = require("../controllers/user.controller").getOneUser;

let Exercise = new Schema({

  title: {
    type: String,
    maxlength: [25, 'Exercise title is too long!'],
    required: [true, 'Exercise title can not be empty'],
  },
  type: {
    type: String,
    maxlength: [25, 'Exercise type content too long'],
  },
  time: {
    type: Number,
    required: false,

  },
  sets: {
    type: [Number],
    required: [true, "Please provide at least one set of reps"],
    validate: {
      validator: v => {
        return v.some( rep => {
          return (rep > 0 && rep < 1000);
        })
      },
      message: "Invalid rep information"
    }
  }
}, {
  timestamps: true,

});


export default mongoose.model('Exercise', Exercise);


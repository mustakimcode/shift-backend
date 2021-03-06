import mongoose from "mongoose";
const { Schema } = mongoose;
let Scheme = new Schema({
  shift_user_name: {
    type: String,
  },
  shift_date: {
    type: Date,
  },
  shift_start_time: {
    type: String,
  },
  shift_end_time: {
    type: String,
  },
  shift_is_published: {
    type: Boolean,
    default: false,
  },
});

let Shift = mongoose.model("Shift", Scheme);
export default Shift;

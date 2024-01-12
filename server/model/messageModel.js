const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const messageSchema = new mongoose.Schema(
  {
    message: {
      text: {
        type: String,
        required: true,
      },
      users: Array,
      sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to the database
// userSchema.pre("save", async function (next) {
//   try {
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(this.password, salt);
//     this.password = hashedPassword;
//     next();
//   } catch (error) {
//     next(error);
//   }
// });

module.exports = mongoose.model("Message", messageSchema);

const mongoose = require("mongoose");

const habitLogSchema = new mongoose.Schema({
    habitId: {
        type: mongoose.ObjectId,
        ref: "Habit",
        requried: true
    },
    userId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: String,
        requried: true
    }
});

module.exports = mongoose.model("habitLog", habitLogSchema);
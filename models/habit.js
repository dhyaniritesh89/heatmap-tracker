const mongoose = require ("mongoose");

const habitSchema = new mongoose.Schema({
    userId: {
        type: mongoose.ObjectId,
        ref: "User",
        required: true
    },

    name: {
        type: String,
        required: true
    },

    color: {
        type: String,
        default: '#4ade80'
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Habit", habitSchema);
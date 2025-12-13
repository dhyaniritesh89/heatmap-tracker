const express = require("express");
const Habit = require("../models/habit");
const auth = require("../middleware/auth");
const habitLog = require("../models/habitLog");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    try {
        const { name, color} = req.body;

    if(!name) res.status(400).json({
        error: "Habit name is required"
    });

    const habit = await Habit.create({
        userId: req.userId,
        name,
        color
    });

    res.json({
        message: "Habit created",
        habit
    });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "server error"
        });
    }
});

router.get("/", auth, async(req, res) => {
    try {
        const habit = await Habit.find({ userId: req.userId});

        res.json(habit);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error"});
    }
});

router.delete("/:id", auth, async(req, res) => {
    try {
        const habit = await Habit.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        })

        if(!habit){
            return res.status(404).json({ error: "habit not found"});
        }

        res.json({ message: "habit deleted"});
    } catch (error) {
        console.log(err);
        res.status(500).json({
            error: "server error"
        });
    }
});

router.post("/:id/toggle", auth, async(req, res) => {
    try {
        const habitId = req.params.id;
        const userId = req.userId;

        const date = req.body.date ||
        new Date().toISOString().split("T")[0];

        const existingLog = await Habit.findOne({
            habitId,
            userId,
            date
        })

        if(existingLog) {
            await habitLog.deleteOne({ _id: existingLog._id });
            return res.json({
                status: "removed", date
            });
        }

        await habitLog.create({
            habitId,
            userId,
            date
        });

        return res.json({ status: "added", date });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error:"server error"});
    }
});
module.exports = router;
const bcrypt = require("bcrypt");
const User = require('../models/User');
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");



require("dotenv").config();

router.get("/protected", auth, (req, res) => {
    res.json({ message: "You are authenticated", user: req.userId });
});
router.post("/signup", async (req, res) => {
    const {username, password, email} = req.body;
    
    const existing = await User.findOne({ email });
    
    if(existing) {
        return res.status(409).json({
            error: "Email already registered"
        });
    } 
    
    const hashed = await bcrypt.hash(password, 5);
    
    const newUser = await User.create({
        username,
        email,
        password: hashed
    });
    
    const token = jwt.sign(
        { id: newUser._id },
        process.env.JWT_SECRET
    )
    
    res.json({
        message: "Signup successful",
        token
    })
    
})

router.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({ email });

    if(!user) {
        return res.status(401).json({
            error: "Invalid email or password"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).json({
            error:"invalid email or password"
        });
    }

    const token = jwt.sign(
        { id: user._id},
        process.env.JWT_SECRET,
    );

    res.json({
        message: "login successful",
        token
    });
})

module.exports = router;
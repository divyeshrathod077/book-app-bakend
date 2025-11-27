const express = require('express');
const bcrypt = require("bcrypt");   // <-- add this
const User = require('./user.model');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET_KEY;

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.find({ username, role: 'admin' });
        if (!admin) {
            return res.status(404).send({ message: "Admin not found!" });
        }

      

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "6h" }
        );

        res.status(200).json({
            message: "Authentication successful",
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });

    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(500).send({ message: "Server error" });
    }
});

module.exports = router;

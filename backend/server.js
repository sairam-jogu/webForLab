const express = require('express');
const UserModel = require('./models/UserModel');
const jwt = require('jsonwebtoken');
const { connectToDb } = require('./mongodb');
const { default: mongoose } = require('mongoose');
const app = express();

// connectToDb();

app.use(express.json());

const getToken = (name) => {
    const token = jwt.sign(name, "abc@2003");
    return token;
}
app.post("/signup", async (req, res) => {
    const { name, email, password } = await req.body;
    if (!name || !email || !password) {
        return res.status(500).json("All fields are mandatory");
    }
    const user = await UserModel.findOne({ name });

    if (user) {
        return res.status(500).json("User already Exists");
    }

    const newUser = await UserModel.create({ name, email, password })
    await newUser.save();
    const token = getToken(name);
    console.log(token);

    return res.status(200).json({ "User Create:": token });

})

app.post("/login", async (req, res) => {
    const { name, password } = await req.body;
    if (!name || !password) {
        return res.status(500).json("All fields are mandatory");
    }

    try {
        const user = await UserModel.findOne({ name });
        if (user) {
            return res.status(500).json("User already Exists");
        }
        const token = getToken(name);
        return res.status(200).json("User: ", name, "token: ", token);
    } catch (error) {
        return res.status(500).json(error);
    }
})

mongoose.connect("mongodb://localhost:27017/my_userDB").then(() => {
    app.listen(3000, () => {
        console.log("connected to Database");
    })
})
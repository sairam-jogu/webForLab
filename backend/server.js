const express = require('express');
const UserModel = require('./models/UserModel');
const jwt = require('jsonwebtoken');
const { connectToDb } = require('./mongodb');
const { default: mongoose } = require('mongoose');
const app = express();
const cors = require('cors')
// connectToDb();

app.use(express.json());

app.use(cors());

const getToken = (name) => {
    const token = jwt.sign(name, "abc@2003");
    return token;
}
app.post("/signup", async (req, res) => {
    const { name, email, password } = await req.body;
    if (!name || !email || !password) {
        return res.status(500).json({"message":"All fields are mandatory"});
    }
    const user = await UserModel.findOne({ name });

    if (user) {
        return res.status(500).json({"message":"User already Exists"});
    }

    const newUser = await UserModel.create({ name, email, password })
    await newUser.save();
    const token = getToken(name);
    console.log(token);

    return res.status(200).json({ "token:": token });

})

app.post("/login", async (req, res) => {
    const { name, password } = await req.body;
    if (!name || !password) {
        return res.status(500).json({"message":"All fields are mandatory"});
    }

    try {
        const user = await UserModel.findOne({ name });
        if (!user) {
            return res.status(500).json({"message":"User Not found"});
        }
        const token = getToken(name);
        return res.status(200).json({"User": name, "token": token});
    } catch (error) {
        return res.status(500).json(error);
    }
})

mongoose.connect("mongodb://localhost:27017/my_userDB").then(() => {
    app.listen(3000, () => {
        console.log("connected to Database");
    })
})
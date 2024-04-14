// const jwt = require('jsonwebtoken')
// const { Client, Users, ID } = require('node-appwrite')
// const bcrypt = require('bcrypt')

// const client = new Client()
//   .setEndpoint(`${process.env.APPWRITE_ENDPOINT}`) // Your API Endpoint
//   .setProject(`${process.env.APPWRITE_PROJECT_ID}`) // Your project ID
//   .setKey(`${process.env.APPWRITE_API_KEY}`)

// const users = new Users(client)

// exports.signup = async (req, res) => {
//   const hashedPassword = await bcrypt.hash(`${req.body.password}`, 10)
//   const user = await users.createBcryptUser(
//     ID.unique(),
//     `${req.body.email}`,
//     `${hashedPassword}`,
//     `${req.body.firstName}`
//   )
//   res.status(200).send(user)
// }

// exports.signin = async (req, res) => {
//   const userList = await users.list()
//   console.log(userList)
//   const usersDetails = userList.users
//   let userExist = false
//   for (let i = 0; i < usersDetails.length; i++) {
//     if (usersDetails[i].email == req.body.email) {
//       userExist = true

//       const authenticated = await bcrypt.compare(
//         req.body.password,
//         usersDetails[i].password
//       )

//       if (authenticated) {
//         const token = jwt.sign(
//           { email: usersDetails[i].email, password: usersDetails[i].password },
//           process.env.JWT_SECRET_KEY,
//           { expiresIn: '2h' }
//         )

//         res.status(200).send({ token: token, user: usersDetails[i] })
//       } else {
//         res.status(400).send('Password is incorrect')
//       }
//     }
//   }

//   if (!userExist) {
//     res.status(400).send('User Not Found')
//   }
// }

// exports.getUpdatedUser = async (req, res) => {
//   await users.updatePrefs(`${req.body.userId}`, {
//     goal: `${req.body.goal}`,
//   })
//   const user = await users.get(`${req.body.userId}`)
//   console.log(user)
//   res.status(200).send(user)
// }



const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// Define Mongoose schema for user data
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String }
});

// Define Mongoose model for users collection
const User = mongoose.model('User', userSchema);

exports.signup = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        firstName: req.body.firstName
    });

    try {
        const savedUser = await user.save();
        res.status(200).send(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating user');
    }
};

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body.email,user);
        if (!user) {
            return res.status(500).send('User Not Found');
        }
        const authenticated = await bcrypt.compare(req.body.password, user.password);
        if (authenticated) {
            const token = jwt.sign(
                { email: user.email, password: user.password },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '2h' }
            );

            res.status(200).send({ token, user });
        } else {
            res.status(400).send('Password is incorrect');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error signing in');
    }
};

exports.getUpdatedUser = async (req, res) => {
    try {
        await User.updateOne(
            { _id: req.body.userId },
            { $set: { goal: req.body.goal } }
        );
        const user = await User.findById(req.body.userId);
        res.status(200).send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error updating user preferences');
    }
};

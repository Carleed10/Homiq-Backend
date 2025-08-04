const adminModel = require("../Models/adminModel");
const bcryptjs = require('bcryptjs')


const adminSignIn = async (req, res) => {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ message: "All fields are mandatory" })
    } else {
        try {
            const verifyMail = await adminModel.findOne({ email })

            if (!verifyMail) {
                const hashedPassword = await bcryptjs.hash(password, 6)

                const createUser = await adminModel.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword
                })

                if (!createUser) {
                    res.status(402).send({ message: "Unable to create user" })
                } else {
                    res.status(200).send({ message: "User created successfully" })
                    console.log("Created user :", createUser);

                }
            } else {
                res.status(400).send({ message: "Email already in use" })
            }

        } catch (error) {
            console.log(error);
            res.status(500).send({ message: error.message, status: false })
            console.log(error);
            console.log("Sign up error, pls try again");

        }
    }
}


module.exports = { adminSignIn }

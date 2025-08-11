const userModel = require("../Models/userModel");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signUp = async (req, res) => {
    const { firstName, lastName, email, password } = req.body

    if (!firstName || !lastName || !email || !password) {
        res.status(400).send({ message: "All fields are mandatory" })
    } else {
        try {
            const verifyMail = await userModel.findOne({ email })

            if (!verifyMail) {
                const hashedPassword = await bcryptjs.hash(password, 6)

                const createUser = await userModel.create({
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


const signIn = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(402).send({ message: "All fields are mandatory" })
    } else {
        const findUser = await userModel.findOne({ email })
        if (!findUser) {
            res.status(400).send({ message: "User does not exist, pls sign up" })
        } else {
            try {
                const comparePassword = await bcryptjs.compare(password, findUser.password)
                const secretKey = process.env.SECRET_KEY

                if (!comparePassword) {
                    res.status(401).send({ message: "Password does not match, pls try again" })
                } else {
                    const genToken = jwt.sign({
                        user: { id : findUser._id }
                    },
                        secretKey, {
                        expiresIn: '1d'
                    }
                    )
                    res.status(200).send({ message: 'Login successful', genToken, status: 'success', Email: findUser.email })

                }
            } catch (error) {
                res.status(400).send({ message: 'Internal server error' })
                console.log('Login error, pls try again later');
                console.log(error);
            }
        }

    }

}


const deleteAccount = async(req, res) => {
    const user =  req.user
    if (!user) {
        res.status(400).send({ message : "Authorisation not provided"})
        console.log(req.user);
        
    } else {
        const {email} = user
        try {
            const findUser = await userModel.findOneAndDelete({email})

            if (findUser) {
                res.status(402).send({message : "Account deleted successfully"})
                console.log("Deleted User : ", findUser);
                
            } else {
                res.status(400).send({message : 'Unable to delete account'})
                
            }
        } catch (error) {
            console.log(error);
            res.status(401).send({message : "Internal Server Error"})
            
        }
    }
}



module.exports = { signUp, signIn, deleteAccount }
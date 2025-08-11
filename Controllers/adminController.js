const adminModel = require("../Models/adminModel");
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')


const adminSignUp = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(400).send({ message: "All fields are mandatory" });
  } else {
    try {
      const verifyMail = await adminModel.findOne({ email });

      if (!verifyMail) {
        const hashedPassword = await bcryptjs.hash(password, 6);

        const createUser = await adminModel.create({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });

        if (!createUser) {
          res.status(402).send({ message: "Unable to create user" });
        } else {
          res.status(200).send({ message: "User created successfully" });
          console.log("Created user :", createUser);
        }
      } else {
        res.status(400).send({ message: "Email already in use" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message, status: false });
      console.log(error);
      console.log("Sign up error, pls try again");
    }
  }
};

const adminSignIn = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    res.status(402).send({ message: "All fields are mandatory" });
  } else {
    const findAdmin = await adminModel.find({ firstName, lastName, email });
    if (!findAdmin) {
      res.status(400).send({ message: "This admin doesn't exist" });
    } else {
      try {
        const comparePassword = await bcryptjs.compare(
          password,
          findAdmin.password
        );
        const secretKey = process.env.SECRET_KEY;

        if (!comparePassword) {
          res
            .status(401)
            .send({ message: "Password does not match, pls try again" });
        } else {
          const genToken = jwt.sign({
              user: {
                id: findAdmin._id,
                role: "admin",
              },
            },
            secretKey,
            { expiresIn: "1d" }
          );

          res
            .status(200)
            .send({
              message: "Login successful",
              genToken,
              status: "success",
              Email: findAdmin.email,
            });
        }
      } catch (error) {
        res.status(400).send({ message: "Internal server error" });
        console.log("Login error, pls try again later");
        console.log(error);
      }
    }
  }
};

module.exports = { adminSignIn, adminSignUp };

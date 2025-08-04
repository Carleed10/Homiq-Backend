const mongoose = require('mongoose')

const userSchema = new mongoose.Schema ({
    firstName : {
        type : 'String',
        require : [true, "Firstname is required"]
    },
    lastName : {
        type : 'String',
        require : [true, "Lastname is required"]
    }, 
    email : {
        type : 'String', 
        require : [true, "Email is required"]
    },
    password : {
        type : 'String', 
        require : [true, "Password is required"],
        unique : false
    }

})

const userModel = mongoose.model("userModel", userSchema )
module.exports = userModel
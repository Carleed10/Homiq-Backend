const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema ({
    firstName : {
        type : String,
        require : [true, "Admin Firstname is required"]
    },
    lastName : {
        type : String,
        require : [true, "Admin Lastname is required"]
    }, 
    email : {
        type : String, 
        require : [true, "Admin Email is required"]
    },
    password : {
        type : String, 
        require : [true, "Admin Password is required"],
        unique : false
    }
})

const adminModel = mongoose.model("adminModel", adminSchema)
module.exports = adminModel
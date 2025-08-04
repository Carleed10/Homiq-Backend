const mongoose = require('mongoose')

const apartmentSchema = new mongoose.Schema({
    apartmentTitle : {
        type : String,
        require : [true, "Apartment title is required"]
    },
    apartmentDetail : {
        type : String,
        require : [true, "Apartment details is required"]
    },
    apartmentLocation : {
        address : {
            type : "String"
        },
        city: { 
            type: String, 
            required: true
        },
        state: { 
            type: String 
        },
        nearCampus: { 
            type: String,
            require : [true]
        }
    },
    features: {
        rooms: { 
            type: Number
        },
        bathroom: { 
            type: Number 
        },
        toilet : {
            type : Number
        },
        bathroomToiletCombined: { 
            type: Boolean 
        },
        hasKitchen: {
            type: Boolean 
        },
        wardrobe: { 
            type: Boolean
        },
    },
})

const apartmentModel = mongoose.model("apartmentModel", apartmentSchema)
module.exports = apartmentModel

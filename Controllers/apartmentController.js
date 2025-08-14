const adminModel = require("../Models/adminModel");
const apartmentModel = require("../Models/apartmentModel");

const createApartment = async (req, res) => {
    const admin = req.user;

    if (!admin) {
        res.status(401).send({ message: "Unauthorized access" });
    } else {
       
        const {lastName, email} = admin
        const {apartmentTitle, apartmentDescription, apartmentPrice, apartmentLocation, features} = req.body

        if (!apartmentTitle || !apartmentDescription || apartmentPrice || apartmentLocation, features) {
            res.status(402).send({message : "All fields are mandatory"})
        } else {
            try {
                const adminUser = await adminModel.find({lastName, email})
                if (!adminUser) {
                    res.status(400).send({message : "You're not and admin, you're unauthorised to post an apartment"})
                } else {
                    const createApartment = await apartmentModel.create({
                        apartmentTitle,
                        apartmentDescription, 
                        apartmentPrice, 
                        apartmentLocation, 
                        features
                    })

                    if (!createApartment) {
                        res.status(400).send({message : "Error uploading apartment"})
                    } else {
                        res.status(202).send({message : "Apartment uploaded successfully"})
                    }
                }

            } catch (error) {
                console.log(eroor);
                res.status(500).send({message : "Internal server error"})
                
            }
        }

    }
}


const fetchApartment = async (req, res)=>{
    const fetchApartments = await apartmentModel.find()

    if (!fetchApartments) {
        res.status(402).send({mesage : 'Error fetching apartments'})
    } else {
        res.status(201).send({message : "Apartments fetched successfully"})  
    }

}




module.exports = {createApartment, fetchApartment}
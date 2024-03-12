const serviceprovidermodel = require('../models/ServiceProviderModel');
const encrypt = require("../utils/Encrypt")


const createSprovider = async (req, res) => {

    try {


        const hashedPassword = encrypt.encryptpassword(req.body.password);
        const serviceProviderObj = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.body.role,
        };
        const savedServiceProvider = await serviceprovidermodel.create(serviceProviderObj);
        // const savedSprovider = await serviceprovidermodel.create(req.body)
        res.status(200).json({
            message: "Service provider created successfully...",
            data: savedServiceProvider,
            flag: -1
        })

    } catch (e) {

        res.status(500).json({
            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const getSprovider = async (req, res) => {

    try {

        const savedSprovider = await serviceprovidermodel.find(req.body)

        res.status(200).json({
            message: "Fetched all service provider...",
            data: savedSprovider,
            flag: 1
        })

    } catch (e) {

        res.status(500).json({
            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const deleteSprovider = async (req, res) => {

    try {

        const deletedSprovider = await serviceprovidermodel.findByIdAndDelete(req.params.id)

        if (deletedSprovider != null) {

            res.status(200).json({
                message: "Service provider deleted successfully...",
                data: deletedSprovider,
                flag: 1
            })

        } else {

            req.status(404).json({
                message: "Service provider not found !!!",
                flag: -1
            })
        }

    } catch (e) {

        res.status(500).json({
            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

const updateSprovider = async (req, res) => {

    try {

        const updatedSprovider = await serviceprovidermodel.findByIdAndUpdate(req.params.id, req.body);

        if (updatedSprovider != null) {

            res.status(200).json({
                message: "Service provider updated successfully...",
                data: updatedSprovider,
                flag: 1
            })

        } else {

            res.status(404).json({
                message: "Service provider not found !!!",
                flag: -1
            })
        }

    } catch (e) {

        res.status(500).json({
            message: "Error in server !!!",
            data: e,
            flag: -1
        })
    }
}

// const getSproviderByServiceId = async(req,res)=>{

//     try{

//         const id = req.params.service.id;
//         const Sprovider = await serviceprovidermodel.findById(id);

//         if (Sprovider == null) {

//             res.status(404).json({
//                 messaage: "service provider not found !!!",
//                 flag: -1
//             })

//         } else {
//             res.status(200).json({
//                 message: "Fetched service provider...",
//                 data: Sprovider,
//                 flag: 1
//             });
//         }


//     }catch(e){

//         res.status(500).json({
//             message:"Error in server !!!",
//             data:e,
//             flag:-1
//         })
//     }
// }
const loginserviceprovider = async (req, res) => {
    try {


        const email = req.body.email;
        const password = req.body.password;

        const serviceproviderFromEmail = await serviceprovidermodel.findOne({ email: email })
        if (serviceproviderFromEmail != null) {

            console.log("Serviceprovider found...")
            const flag = encrypt.comparepassword(
                password,
                serviceproviderFromEmail.password
            )

            if (flag == true) {

                res.status(200).json({
                    message: "ServiceProvider login successfully",
                    flag: 1,
                    data: serviceproviderFromEmail
                })

            } else {

                res.status(404).json({
                    message: "ServiceProvider not found",
                    flag: -1,
                });

            }

        } else {

            res.status(404).json({
                message: "ServiceProvider not found",
                flag: -1,
            });

        }
    } catch (e) {


        res.status(500).json({
            message: "Error in login ServiceProvider",
            data: e,
            flag: -1,
        });

    }
}

module.exports = {
    createSprovider,
    getSprovider,
    deleteSprovider,
    updateSprovider,
    loginserviceprovider
    // getSproviderByServiceId
}
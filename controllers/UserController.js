const userModel = require("../models/UserModel");
const encrypt = require("../utils/Encrypt")


const createuser = async (req, res) => {

    try {

        const hashedPassword = encrypt.encryptpassword(req.body.password);
        const userObj = {
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            phone: req.body.phone,
            role: req.body.role,
        };

        const saveduser = await userModel.create(userObj);
        res.status(200).json({
            message: "User created successfully...",
            data: saveduser,
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

const getuser = async (req, res) => {

    try {

        const saveduser = await userModel.find().populate('role')

        res.status(200).json({
            message: "Users fetched successfully...",
            data: saveduser,
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

const deleteuser = async (req, res) => {

    try {

        const deleteduser = await userModel.findByIdAndDelete(req.params.id)

        if (deleteduser != null) {

            res.status(200).json({
                message: "User deleted successfully...",
                data: deleteduser,
                flag: 1
            })

        } else {

            res.status(404).json({
                message: "User not found !!!",
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

const updateuser = async (req, res) => {

    try {

        const updateduser = await userModel.findByIdAndUpdate(req.params.id, req.body)

        if (updateduser != null) {

            res.status(200).json({
                message: "User updated successfully...",
                // data : updateduser,
                flag: 1
            })

        } else {

            res.status(404).json({
                message: "User not found !!!",
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

const loginuser = async (req, res) => {

    //select * from users where email = ? and password = ?
    //db -->password -->encrypt
    // req.body.password 123456 -->
    try {

        const email = req.body.email;
        const password = req.body.password;

        const userFromEmail = await userModel.findOne({ email: email });

        if (userFromEmail != null) {

            console.log('User found');
            const flag = encrypt.comparepassword(
                password,
                userFromEmail.password
            )
            if (flag == true) {
                res.status(200).json({
                    message: "User login successfully...",
                    flag: 1,
                    data: userFromEmail
                })
            } else {
                res.status(404).json({
                    message: "User not found !",
                    flag: -1,

                })
            }

        } else {

            res.status(404).json({
                message: "User not found !",
                flag: -1
            })

        }

    } catch (e) {

        res.status(500).json({
            message: "Error in login User",
            data: e,
            flag: -1,
        });
    }
}

module.exports = {

    createuser,
    getuser,
    deleteuser,
    updateuser,
    loginuser
}
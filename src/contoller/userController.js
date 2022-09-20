const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");


const createUser = async function (req, res) {
    try {
        let data = req.body;
        let { title, name, phone, email, password, address } = data
        if (Object.keys(data).length == 0||data==undefined||data==null) {
            return res.status(400).send({
                status: false, message: "body is empty",
            });
        }
        if (!title) { return res.status(400).send({ status: false, message: "please give a title" }) }
        if (title.includes(" ")) {
            return res.status(400).send({ status: false, message: "Space is not allowed" })
        }
       
        if (title != "Mr" && title != "Miss" && title != "Mrs") { return res.status(400).send({ status: false, message: "title should be Mr,Miss,Mrs" }) }
        
        if (!name) { return res.status(400).send({ status: false, message: "name is mandatory" }) }
        if (!(/^[a-z ,.'-]+$/i.test(name))) { return res.status(400).send({ status: false, message: "numeric values and special characters not allowed" }) }
        if (!phone) { return res.status(400).send({ status: false, message: "please enter phone number" }) }
        if (!/^[6-9]\d{9}$/.test(phone)) { return res.status(400).send({ status: false, message: "invaid mobile number" }) }
        if (phone.length < 10 || phone.length > 10) {
            return res.status(400).send({ status: false, message: "Mobile Number should be ten digit" })
        }
        let findPhone = await userModel.findOne({ phone: phone })
        if (findPhone) { return res.status(400).send({ status: false, message: "Phone number should be unique" }) }
        if (!email) { return res.status(400).send({ status: false, message: "email is mandatory" }) }
        if (!(/\S+@\S+\.\S+/).test(email)) { return res.status(400).send({ status: false, message: "email contain special charcter" }) }
        let findEmail = await userModel.findOne({ email: email })
        if (findEmail) { return res.status(400).send({ status: false, message: "email should be unique" }) }
        if (!password) { return res.status(400).send({ status: false, message: "password is mandatory" }) }
        if (password.length < 8 || password.length > 15) { return res.status(400).send({ status: false, message: "password's length must not be less than 8 and greater then 15" }) }
        let document ={
            title :title.trim(),
            name :name.trim(),
           phone:phone,
            email :email.toLowerCase(),
            password:password.trim()
            
        }

        const userData = await userModel.create(document);
        res.status(201).send({ status: true, message: userData });

    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};
/*------------------------------------------------------------------------------------------------------------------------------------*/
const loginUser = async function (req, res) {
    try {
        data = req.body;
        let userName = data.email;
        let password = data.password;

        //if give nothing inside req.body
        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({
                    status: false,
                    message: "Please provide email & password to login.",
                });
        }
        if (Object.keys(data).length > 2) {
            return res
                .status(400)
                .send({ status: false, message: "Only email & password is required." });
        }
        //---------------------------------------------//
        //if no Email inside req.
        if (!userName) {
            return res
                .status(400)
                .send({ status: false, message: "please provide an Email !" });
        }
        //if no password inside req.body
        if (!password) {
            return res
                .status(400)
                .send({ status: false, message: "please enter password !" });
        }
        //-------------------------------------//

        //if not user
        let user = await userModel.findOne({ email: userName });
        if (!user) {
            return res
                .status(400)
                .send({ status: false, message: "username is not corerct" });
        }
        //if password not correct
        let pass = await userModel.findOne({ password: password });
        if (!pass) {
            return res
                .status(400)
                .send({ status: false, message: "password is not corerct" });
        }
        //---------------------//
        //success creation starting

        let token = jwt.sign(
            {
                userId: user._id.toString(),
                batch: "project3",
                organisation: "group37",
            },
            "functionup-plutonium",
            { expiresIn: "24h" }
        );

        res.status(200).send({ status: true, message: "Success", data: token });
    } catch (err) {
        res.status(500).send({ message: "server error", error: err });
    }
};

module.exports = { createUser, loginUser };

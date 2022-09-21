const bookModel = require("../models/bookModel")

const cbv = async function (req, res, next) {

    let data = req.body;
    let { title, excerpt, userId, ISBN, catagory, subcatagory, releasedAt } = data;

    if (Object.keys(data).length == 0 || data == undefined || data == null) {
        return res.status(400).send({
            status: false,
            message: "body is empty",
        });
    }
    if (!title) {
        return res
            .status(400)
            .send({ status: false, message: "please give a title" });
    }
    if (title.includes(" ")) {
        return res
            .status(400)
            .send({ status: false, message: "Space is not allowed" });
    }
    if (!excerpt) {
        return res.status(400).send({ status: false, message: "please give a excerpt" });
    }
    if (!userId) {
        return res
            .status(400)
            .send({ status: false, message: "userId must be present" });
    }

    if (!/^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/
        .test(ISBN)) {
        return res
            .status(400)
            .send({ status: false, message: "valid ISBN should be 13 numbers" });
    }

    if (!catagory) {
        return res
            .status(400)
            .send({ status: false, message: "catagory must be present" });

    }
    if (!subcatagory) {
        return res
            .status(400)
            .send({ status: false, message: "subcatagory must be present" });

    }
    if (!\d{ 4 } \-(0 ? [1 - 9] | 1[012]) \-(0 ? [1 - 9] | [12][0 - 9] | 3[01])
        .test(releasedAt)) {
        return res
            .status(400)
            .send({ status: false, message: "valid ISBN should be 13 numbers" });
    }


    
}
catch (err) {
    res.status(500).send({ status: false, message: err.message });
}

module.exports = { cuv }








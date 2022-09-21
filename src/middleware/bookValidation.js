const bookModel = require("../models/booksModel")

const cbv = async function (req, res, next) {

    try {
        let data = req.body;
        let { title, excerpt, userId, ISBN, category,  subcategory, releasedAt } = data;

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
       
        let findTitle = await bookModel.findOne({ title: title });
        if (findTitle) {
            return res
                .status(400)
                .send({ status: false, message: "Title should be unique" });
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
        let findISBN = await bookModel.findOne({ ISBN: ISBN });
        if (findISBN) {
            return res
                .status(400)
                .send({ status: false, message: "ISBN should be unique" });
        }

        if (!category) {
            return res
                .status(400)
                .send({ status: false, message: "category must be present" });

        }
        if (! subcategory) {
            return res
                .status(400)
                .send({ status: false, message: "subcategory must be present" });

        }
        if (!releasedAt) {
            return res
                .status(400)
                .send({ status: false, message: "releasedAt must be present" });

        }
        if (!/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/.test(releasedAt)) {
            return res
                .status(400)
                .send({ status: false, message: "give date in yyyy-mm-dd format" });

        }

        next()

    }

    catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
}
module.exports = {  cbv }








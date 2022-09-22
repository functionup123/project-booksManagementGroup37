const jwt = require("jsonwebtoken");
const bookModel = require("../models/BooksModel");
const userModel = require("../models/userModel");
const authentication = async function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
    if (!token) {
      return res
        .status(404)
        .send({ status: false, msg: "token must be present" });
    }

    let decodedToken = jwt.verify(token, "functionup-plutonium");
    if (!decodedToken) {
      return res.status(401).send({ status: false, msg: "token is invalid" });
    }
    req.token = decodedToken;
    next();
  } catch (error) {
    return res.status(500).send({ msg: error.message });
  }
};

let authorisation =async function (req, res, next) {
      try {
    //     let authorLoggedIn = req.token.userId;
    //     let bookId = req.params.bookId;
    //     let checkBookId = await bookModel.findById(bookId)
    //     if (!checkBookId) {
    //       return res.status(404).send({status: false, message: "Book not Found"})
    //   }
    //   let reqUser=checkBookId.authorId
    //     if ( reqUser != authorLoggedIn) {
    //       return res.status(403).send({status: false,msg: "loggedin author not allowed to modify changes"});
    //     }
        next();
      } catch (err) {
        return res.status(500).send({ status: false, msg: err.messge });
      }
    };


module.exports = {authentication,authorisation};

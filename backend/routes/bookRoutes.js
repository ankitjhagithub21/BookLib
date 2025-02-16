const express = require('express')
const verifyToken = require('../middlewares/verifyToken')
const { addBook, getAllBooks, deleteBook } = require('../controllers/bookController')
const upload = require('../config/multer')
const bookRouter = express.Router()

bookRouter.post("/",verifyToken,upload.single('image'),addBook)
bookRouter.get("/",getAllBooks)
bookRouter.delete("/:id",verifyToken,deleteBook)


module.exports = bookRouter

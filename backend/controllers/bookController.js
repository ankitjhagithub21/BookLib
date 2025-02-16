const uploadImage = require("../helpers/uploadImage");
const BookModel = require("../models/bookModel");

const addBook = async (req, res) => {
  const { title, subTitle, author } = req.body;

  if (!title || !subTitle || !author) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  let imageUrl;
   

  if (req.file) {
    imageUrl = await uploadImage(req.file.path);
    if(!imageUrl){
      return res.status(400).json({success:false,message:"Image upload failed."})
    }
    
  }

 
  try {
    const book = new BookModel({
      title,
      subTitle,
      author,
      image: imageUrl,
    });

    await book.save();

    return res.status(201).json({
      success: true,
      message: "Book added successfully.",
      book,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAllBooks = async (req, res) => {
  try {
    const books = await BookModel.find();

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const book = await BookModel.findByIdAndDelete(bookId);

    if(!book){
      return res.status(404).json({
        success: false,
        message:"Book not found.",
      });
    }

    res.status(200).json({
      success: true,
      message:"Book deleted successfully.",
    });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  deleteBook
};

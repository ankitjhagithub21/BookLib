import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addNewBook } from "../redux/slices/bookSlice";
import { addBook } from "../api/book";


const AddBook = () => {
    const dispatch = useDispatch()
    const className = "border-b-1 border-gray-400 py-2 text-sm outline-none";
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()


    const initialData = {
        title: "",
        subTitle: "",
        author: "",
    }

    const [bookData, setBookData] = useState(initialData);
    const [image, setImage] = useState(null)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setBookData({
            ...bookData,
            [name]: value
        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()


        setLoading(true)
        const formData = new FormData();
        formData.append('title', bookData.title);
        formData.append('subTitle', bookData.subTitle);
        formData.append('author', bookData.author);
        formData.append('image', image);

        try {
            const data = await addBook(formData);
            if (data.success) {
                dispatch(addNewBook(data.book))
                toast.success(data.message)
                setBookData(initialData)
                navigate("/")
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }
    return (
        <section className="p-5">
            <div className="max-w-md w-full mx-auto bg-blue-100 my-12 shadow-2xl p-5">
                <h1 className="text-gray-800 text-2xl  mb-3 font-semibold">Add book to library</h1>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" value={bookData.title} onChange={handleChange} placeholder="Enter book title" className={className} required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="subTitle">Sub Title</label>
                        <input type="text" name="subTitle" value={bookData.subTitle} onChange={handleChange} placeholder="Enter book sub title" className={className} required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="author">Author</label>
                        <input type="text" name="author" value={bookData.author} onChange={handleChange} placeholder="Enter book author name" className={className} required />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="bookImage">Book Image</label>
                        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className={className} required />
                    </div>
                    <button className="bg-gray-800 text-white p-2 mt-4 hover:bg-gray-900 cursor-pointer " disabled={loading}>
                        {
                            loading ? 'Please wait...' : 'Add book'
                        }
                    </button>
                </form>

            </div>
        </section>
    )
}

export default AddBook
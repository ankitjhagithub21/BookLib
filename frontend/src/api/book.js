const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/books`

export const addBook = async(bookData) => {
    const res = await fetch(baseUrl,{
        method:"POST",
        credentials:'include',
        body:bookData
    })
    const resData = await res.json();
    return resData;
}

export const getAllBooks = async() => {
    const res = await fetch(baseUrl)
    const resData = await res.json();
    return resData;
}


export const deleteBook = async(bookId) => {
    const res = await fetch(`${baseUrl}/${bookId}`,{
        method:"DELETE",
        credentials:'include',
    })
    const resData = await res.json();
    return resData;
}



import { createSlice } from "@reduxjs/toolkit";

export const bookSlice = createSlice({
  name: "books",
  initialState: {
    books: [],
    isLoading:true
  },
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    addNewBook: (state, action) => {
        state.books = [...state.books,action.payload];
    },
    setIsLoading: (state, action) => {
        state.isLoading = action.payload;
      },
    
  },
});

export const { setBooks,setIsLoading,addNewBook } = bookSlice.actions;

export default bookSlice.reducer;

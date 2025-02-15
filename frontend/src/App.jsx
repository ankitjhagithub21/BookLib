import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import Navbar from "./components/Navbar"
import "./App.css"


const App = () => {
  return (
    <BrowserRouter>
    <Toaster/>
    <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
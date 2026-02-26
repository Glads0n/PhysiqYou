import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/PublicNavbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";


function App() {
  return (


    
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register/ >}></Route>
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;

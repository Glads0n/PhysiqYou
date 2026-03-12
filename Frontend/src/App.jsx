import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Navbar from "./components/PublicNavbar";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashLayout";
import Dashboard from "./pages/Dashboard";
import ProfileSetup from "./pages/SetProfile";
import MyPlan from "./pages/MyPlan";
import Profile from "./pages/Profile";
import FoodLog from "./pages/FoodLog";
import WorkoutLog from "./pages/WorkoutLog";
import UpdateWeight from "./pages/UpdateWeight";
import Progress from "./pages/Progress";
import FAQ from "./pages/FAQ";
import Feedback from "./pages/Feedback";


function App() {
  return (


    
    <BrowserRouter>
    
      <Routes>
        <Route element={<PublicLayout/>}>
          <Route path="/" element={<Landing />} />
          <Route path="register" element={<Register />}></Route>
        </Route>

        <Route element={<DashboardLayout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setprofile" element={<ProfileSetup />}></Route>
          <Route path="/myplan" element={<MyPlan />}></Route>
          <Route path="/profile" element={<Profile/>}></Route>
          <Route path="/foodlog" element={<FoodLog/>}></Route>
          <Route path="/workoutlog" element={<WorkoutLog/>}></Route>
          <Route path="/update_weight" element={<UpdateWeight/>}></Route>
          <Route path="/progress" element={<Progress />} />
          <Route path="/faqs" element={<FAQ/>}></Route>
          <Route path="/feedback" element={<Feedback/>}></Route>

        </Route>
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;

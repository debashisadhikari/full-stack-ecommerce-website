
//core module
import { Route, Routes } from "react-router-dom";


//local module
import Signup from "./auth-ui/Signup";
import Login from "./auth-ui/Login";
import Header from "./Components/Header";





const App=()=>{
  
  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <Routes>

        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
};
export default App;
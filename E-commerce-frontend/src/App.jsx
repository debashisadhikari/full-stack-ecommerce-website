import { Route, Routes } from "react-router-dom";

import Signup from "./auth-ui/Signup";
import Login from "./auth-ui/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ProtectedRoute from "./Auth-Contex/ProtectRoute";
import ProductPost from "./Components/ProductPost";

import EditItems from "./Components/Edit-items";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <Routes>

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />


        <Route
          path="/home"
          element={
           
              <Home />
            
          }
        />
         <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <ProductPost />
            </ProtectedRoute>
          }
        />
         <Route
          path="/edit-items"
          element={
            <ProtectedRoute>
              <EditItems />
            </ProtectedRoute>
          }
        />

      </Routes>

    </div>
  );
};

export default App;
import { Route, Routes } from "react-router-dom";

import Signup from "./auth-ui/Signup";
import Login from "./auth-ui/Login";
import Header from "./Components/Header";
import Home from "./Components/Home";
import ProtectedRoute from "./Auth-Contex/ProtectRoute";
import ProductPost from "./Components/ProductPost";

import EditItems from "./Components/Edit-items";
import ProductDetails from "./Components/ProductsDetails";
import Myaccount from "./Components/Myaccount";
import BuyHandler from "./Components/BuyHandler";
import AddAddress from "./Components/AddAddress";
import Setting from "./Components/Setting";
import OrderPage from "./Components/OrderPage";
import OrderDetailsPage from "./Components/OrderDetails";

const App = () => {
  return (
    <div className="min-h-screen bg-slate-100">

      <Header />

      <Routes>

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />


        <Route
          path="/"
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
          path="/profile"
          element={
            <ProtectedRoute>
              <Myaccount />
            </ProtectedRoute>
          }
        />
         <Route
          path="/checkout/:id"
          element={
            <ProtectedRoute>
              <BuyHandler />
            </ProtectedRoute>
          }
        />
         <Route
          path="/address"
          element={
            <ProtectedRoute>
              <AddAddress />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute>
              <OrderPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/orderdetails/:id"
          element={
            <ProtectedRoute>
              < OrderDetailsPage/>
            </ProtectedRoute>
          }
        />
         <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Setting/>
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
        <Route
  path="/product/:id"
  element={ 
    
      <ProductDetails />
   
  
  }
/>

      </Routes>

    </div>
  );
};

export default App;
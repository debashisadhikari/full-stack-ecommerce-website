import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";
import ItemsList from "./ItemsList";
import Search from "./Search";
import AllProducts from "./AllProducts";


const Home=()=>{
  return <div>


  <ItemsList></ItemsList>
  <Search></Search>
  <AllProducts/>

  </div>
}
export default Home;
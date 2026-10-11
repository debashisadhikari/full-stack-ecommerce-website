import { useContext, useEffect } from "react";
import { AuthContext } from "../Auth-Contex/AuthContex";
import ItemsList from "./ItemsList";
import Search from "./Search";


const Home=()=>{
  return <div>


  <ItemsList></ItemsList>
  <Search></Search>
  </div>
}
export default Home;
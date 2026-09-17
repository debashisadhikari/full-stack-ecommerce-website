import { useState } from "react";
import { useEffect } from "react";



const App=()=>{
  const [message,setMessage]=useState();
  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);
  return <>
  <h1>{message}</h1>
  </>
}
export default App;
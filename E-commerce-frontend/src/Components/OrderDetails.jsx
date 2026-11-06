import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetailsPage=()=>{
const { id } = useParams();
console.log(id);
  const [order,setOrder]=useState();
  const fetchOrder=async()=>{
       const res=await fetch(`http://localhost:5001/api/GetOneOrder/${id}`,{
        credentials:"include",
       })
       const data=await res.json();
       setOrder(data.order);
       console.log(data.order);

  };
  useEffect(()=>{
    fetchOrder();
  },[]);
  return<>
  
  </>

}
export default OrderDetailsPage;
import { useEffect, useState } from "react"
import BusCard from "../../Components/Home/BusCard/BusCard";
import Spinner from "../../Components/Spinner/Spinner";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
const Home = () => {
  const role = localStorage.getItem('role');
  const [isLoading, setIsLoading] = useState(true);
  const [busList,setBusList] = useState();
  useEffect(() => {
    // get request to fetch
    // data from backend
    fetch(BASE_URL + `${role==="A"? '/bus/get':'/ticket/bus/get'}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('token'),
      },
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Invalid request');
    }).then((data) => {
      console.log(data);
      setBusList(data.busList);
      setIsLoading(false);
    }).catch((err) => {
      console.log(err);
    });},[])
    if(isLoading){
      return <Spinner />
    }
  return (
    <div className="w-full grid grid-cols-4">
      {busList?.map((bus) => (
        <BusCard key={bus._id} busData={bus} />
      ))}
    </div>
  )
}

export default Home;
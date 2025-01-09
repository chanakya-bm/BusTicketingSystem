import { useParams } from "react-router-dom";
import Reset from "../../Components/View/Reset";
import Seats from "../../Components/View/Seats";
import { useEffect, useState } from "react";
import Book from "../../Components/View/Book";
import Spinner from "../../Components/Spinner/Spinner";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const View = () => {
  const { id } = useParams();
  const role = localStorage.getItem('role');
  const [busData,setBusData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      // get request to fetch
      // data from backend
      fetch(BASE_URL + `${role === 'A'?`/bus/get/${id}`:`/ticket/bus/get/${id}`}`, {
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
        setBusData(data.bus);
        setIsLoading(false);
      }).catch((err) => {
        console.log(err);
      });},[id])
      if(isLoading){
        return <Spinner />
      }
      console.log("busAdat",busData)
  return (
      <div className="min-h-screen flex flex-col items-center">
      <div className="mt-[70%]" />
        {/* Header */}
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 mt-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">
            View Bus: {busData.BusName}
          </h1>
          {/* display other details also */}
            <p className="text-gray-600 text-center mb-4">
                Source: {busData.Source} | Destination: {busData.Destination}
            </p>
            <p className="text-gray-600 text-center mb-4">
                Start Date: {busData.StartDate.substring(0,10)} | Duration: {busData.Duration} hours
            </p>
          {role==='A' && <Reset id={id} />}
        </div>
        {role==='A' && <Seats id={id} />}
        {role === 'U' && <Book id={id} />}
      </div>
  );
};

export default View;

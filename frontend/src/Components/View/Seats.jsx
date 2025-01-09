import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// eslint-disable-next-line react/prop-types
const Seats = ({ id }) => {
  const [seats, setSeats] = useState([]);
  const [isOpen, setIsOpen] = useState(null);
  const [selected, setSelected] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const toggleInfoBox = (details) => {
    setIsOpen(details);
  };
  useEffect(() => {
    // fech get request to fetch
    // data from backend
    fetch(BASE_URL + `/bus/seats-view?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Invalid request");
      })
      .then((data) => {
        console.log(data);
        setSeats(data.responseLayout);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  }, [id]);

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Bus Layout</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full flex justify-center gap-4">
            {row.map((seat, seatIndex) => {
              return (
                <div
                  key={seatIndex}
                  className={`w-16 h-16 flex items-center justify-center text-gray-800 font-semibold rounded-lg shadow-md
                    ${
                      selected[0] === rowIndex && selected[1] === seatIndex
                        ? "bg-blue-500"
                        : seat
                        ? "bg-green-500 hover:bg-green-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  
                  onClick={() => {
                    setSelected([rowIndex, seatIndex]);
                    toggleInfoBox(seat);
                  }}
                >
                  {rowIndex * 4 + seatIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
        {isOpen && (
          <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 w-64">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Information
            </h3>
            {/* Display name, email and seat number */}
            <p className="text-gray-600">
              Name: <span className="font-semibold">{isOpen?.name}</span>
            </p>
            <p className="text-gray-600">
              Email: <span className="font-semibold"> {isOpen?.email} </span> 
            </p>
            <p className="text-gray-600">
              Seat Number: <span className="font-semibold">{selected[0] * 4 + selected[1] + 1}</span>
            </p>
            <button onClick={()=>{
              setIsOpen(null);
            }} className="bg-blue-500">
              Ok
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seats;

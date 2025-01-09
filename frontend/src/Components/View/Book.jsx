import { useEffect, useState } from "react";
import Spinner from "../Spinner/Spinner";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// eslint-disable-next-line react/prop-types
const Book = ({ id }) => {
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState([]);
  const [available, setAvailable] = useState([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };
  const bookTicket = () => {
    // post req to book ticket
    fetch(BASE_URL + "/ticket/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: id, seat: selected }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Invalid request");
      })
      .then((data) => {
        console.log(data);
        alert("Booked Successfully");
        window.location.reload();
      })
      .then((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // fech get request to fetch
    // data from backend
    fetch(BASE_URL + `/ticket/seats/?id=${id}`, {
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
        console.log("mydata", data);
        setSeats(data.layout);
        setAvailable(data.available);
        setTotal(data.seats);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      }, []);
  }, [id]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="mt-8 w-full max-w-4xl bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Bus Layout</h2>
      {/* display available and total */}
      <p className="text-gray-600 text-center mb-4">
        Available: {available} | Total: {total}
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full flex justify-center gap-4">
            {row.map((seat, seatIndex) => {
              return (
                <div
                  key={seatIndex}
                  className={`w-16 h-16 flex items-center justify-center text-gray-800 font-semibold rounded-lg shadow-md
                    ${
                      selected[0] === rowIndex &&
                      selected[1] === seatIndex &&
                      !seat
                        ? "bg-blue-500"
                        : seat
                        ? seat === localStorage.getItem("id")?"bg-green-500 hover:bg-green-600":"bg-red-500"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  onClick={() => {
                    if (!seat) {
                      setSelected([rowIndex, seatIndex]);
                      toggleDialog();
                    }
                  }}
                >
                  {rowIndex * 4 + seatIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
        {isOpen && !seats[selected[0]][selected[1]] && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800">Dialog Title</h2>
              <p className="mt-4 text-gray-600">
                {`Are you sure you want to book Seat ${
                  selected[0] * 4 + selected[1] + 1
                }?`}
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={toggleDialog}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  onClick={bookTicket}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Book;

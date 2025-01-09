import { useEffect, useState } from "react";
import Spinner from "../Components/Spinner/Spinner";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

  const showDialog = (id) => {
    setIsOpen(!isOpen);
    setSelectedId(id);
  };

  const handleCancel =() =>{
    // post req to cancel ticket
    fetch(BASE_URL + "/ticket/cancel", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ id: selectedId }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Invalid request");
      })
      .then((data) => {
        console.log(data);
        alert("Cancelled Successfully");
        window.location.reload();
      })
      .then((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    // Fetch bookings data for the user
    fetch(`${BASE_URL}/ticket/booked`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("token")}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch bookings");
      })
      .then((data) => {
        setBookings(data.ticket);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error(error);
        alert("Unable to fetch your bookings. Please try again later.");
      });
  }, [BASE_URL]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="mt-[5%] p-6 space-y-6">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">My Bookings</h1>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead>
            <tr className="bg-blue-50 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Booking ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Bus Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Source
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Destination
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Start Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Duration
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Seat No.
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Booking Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                Update
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking._id}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-blue-100 transition-all duration-200`}
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking._id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.Bus.BusName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.Bus.Source}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.Bus.Destination}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.Bus.StartDate.substring(0, 10)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.Bus.Duration}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.Seat[0] * 4 + booking.Seat[1] + 1}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {booking.BookingDate.substring(0, 10)}
                </td>
                <td
                  className={`px-6 py-4 text-sm text-gray-700 ${
                    booking.Status === "Booked"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {booking.Status}
                </td>
                <td className={`px-6 py-4 text-sm text-gray-700 `}>
                  {booking.Status == "Booked" ? (
                    <button key={booking._id} className="bg-red-500" onClick={()=>{showDialog(booking._id)}}>Cancel</button>
                  ) : (
                    "---"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-96 p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-xl font-bold text-gray-800">Dialog Title</h2>
              <p className="mt-4 text-gray-600">
                {`Are you sure you want to Cancel Seat?`}
              </p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={()=>{setIsOpen(false)}}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-reed-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* If no bookings found */}
      {bookings.length === 0 && (
        <p className="text-gray-600 text-center mt-4">No bookings found.</p>
      )}
    </div>
  );
};

export default MyBookings;

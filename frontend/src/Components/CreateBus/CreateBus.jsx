import  { useState } from "react";
import {  useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CreateBus = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    BusName: "",
    Source: "",
    Destination: "",
    StartDate: "",
    Duration: "",
    Seats: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // post request
    fetch(BASE_URL+"/bus/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Invalid request");
      })
      .then((data) => {
        console.log(data);
        alert(data.message);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Create Bus
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="flex flex-row ">
              {/* Bus Name */}
              <div className="m-1">
                <label
                  htmlFor="BusName"
                  className="block text-sm font-medium text-gray-600"
                >
                  Bus Name
                </label>
                <input
                  type="text"
                  id="BusName"
                  name="BusName"
                  value={formData.BusName}
                  onChange={handleChange}
                  placeholder="Enter Bus Name"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
              {/* Seats */}
              <div className="m-1">
                <label
                  htmlFor="Seats"
                  className="block text-sm font-medium text-gray-600"
                >
                  Seats
                </label>
                <input
                  type="number"
                  id="Seats"
                  name="Seats"
                  value={formData.Seats}
                  onChange={handleChange}
                  placeholder="Enter Number of Seats"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div className="flex flex-row ">
              {/* Source */}
              <div className="m-1">
                <label
                  htmlFor="Source"
                  className="block text-sm font-medium text-gray-600"
                >
                  Source
                </label>
                <input
                  type="text"
                  id="Source"
                  name="Source"
                  value={formData.Source}
                  onChange={handleChange}
                  placeholder="Enter Source"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Destination */}
              <div className="m-1">
                <label
                  htmlFor="Destination"
                  className="block text-sm font-medium text-gray-600"
                >
                  Destination
                </label>
                <input
                  type="text"
                  id="Destination"
                  name="Destination"
                  value={formData.Destination}
                  onChange={handleChange}
                  placeholder="Enter Destination"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>
              {/* Start Date */}
              <div className="m-1">
                <label
                  htmlFor="StartDate"
                  className="block text-sm font-medium text-gray-600"
                >
                  Start Date
                </label>
                <input
                  type="date"
                  id="StartDate"
                  name="StartDate"
                  value={formData.StartDate}
                  onChange={handleChange}
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              {/* Duration */}
              <div className="m-1">
                <label
                  htmlFor="Duration"
                  className="block text-sm font-medium text-gray-600"
                >
                  Duration (in hours)
                </label>
                <input
                  type="number"
                  id="Duration"
                  name="Duration"
                  value={formData.Duration}
                  onChange={handleChange}
                  placeholder="Enter Duration"
                  className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Create Bus
            </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBus;

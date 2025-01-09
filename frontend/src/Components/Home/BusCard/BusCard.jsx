import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const BusCard = ({ busData }) => {
    const navigate = useNavigate();
    // eslint-disable-next-line react/prop-types
    const { _id,BusName, Source, Destination, StartDate, Duration, Seats } = busData;
    return (
      <div className="m-5 min-w-[300px] bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div className="p-6">
          {/* Bus Name */}
          <h3 className="text-2xl font-semibold text-gray-800 text-center">{BusName}</h3>
  
          {/* Route: Source & Destination */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-700">From:</span>
              <span>{Source}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-700">To:</span>
              <span>{Destination}</span>
            </div>
          </div>
  
          {/* Start Date & Duration */}
          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-700">Start Date:</span>
              <span>{new Date(StartDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <span className="font-medium text-gray-700">Duration:</span>
              <span>{Duration} hrs</span>
            </div>
          </div>
  
          {/* Seats Available */}
          <div className="mt-4 text-sm text-gray-600">
            <p><span className="font-medium text-gray-700">Seats Available:</span> {Seats}</p>
          </div>


          <div className="mt-6">
            <button onClick={()=>navigate(`/view/${_id}`)} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-200">
            View Details
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BusCard;
  
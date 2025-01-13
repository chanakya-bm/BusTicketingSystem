import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutesComponent from "./RoutesComponent/RoutesComponent";
import Navbar from "./Components/Auth/Navbar/Navbar";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const App = () => {
  var token = localStorage.getItem('token');
  useEffect(()=>{
    fetch(BASE_URL + '/auth-check', {
      method: 'GET',
      headers: {
        'Content-Type': 'application-json',
        Authorization: token,
      }
    }).then((response)=>{
      if (!response.ok){
        localStorage.removeItem('token');
      }
    });
  },[token]);
  token = localStorage.getItem('token');
  if(!token){
    return (
      <div>
        <Router>
          <RoutesComponent isAuthenticated={false} />
        </Router>
      </div>
    )
  }
  return (
    <div>
      <Router>
        <Navbar />
        <div className="mt-[80px]">
        <RoutesComponent isAuthenticated={true} />
        </div>
      </Router>
    </div>
  );
};

export default App;
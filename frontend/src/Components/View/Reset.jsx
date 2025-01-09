const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// eslint-disable-next-line react/prop-types
const Reset = ({id}) => {

  const handleReset = () => {
    // post request
    fetch(BASE_URL + "/bus/reset", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body:JSON.stringify({busId:id})
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
        window.location.reload();
        // navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
    }
  return (
    <div>
         <button
          onClick={handleReset}
          className="w-full py-2 px-4 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Reset Tickets
        </button>
    </div>
  )
}

export default Reset
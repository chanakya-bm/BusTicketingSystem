import { useState } from "react";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

// eslint-disable-next-line react/prop-types
const Signup = ({ toggle }) => {
  const [role, setRole] = useState("U"); // Default role is User

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };
  const handleSignup = (event) =>{
    // post signup request
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(email)
    if (!name || !email || !password) {
      alert("All fields are required!");
      return;
    }
    fetch(BASE_URL + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        role: role,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }  
        console.log(response)
        throw new Error("User Already Exists");
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
        window.location.reload();
        toggle();
        alert(data.message);
      })
      .catch((err) => {
        // console.log(err);
        alert(err);
      });
  }

  return (
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700">Sign Up</h2>
      <form className="space-y-4" onSubmit={handleSignup}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Create a password"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={handleRoleChange}
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="U">User</option>
            <option value="A">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <button onClick={toggle} className="text-blue-500 hover:underline">
          Login
        </button>
      </p>
    </div>
  );
};

export default Signup;

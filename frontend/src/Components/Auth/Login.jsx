const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// eslint-disable-next-line react/prop-types
const Login = ({ toggle }) => {
  const onSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    fetch(BASE_URL + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Invalid email or password");
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("name", data.name);
        localStorage.setItem("id", data.id);
        window.location.reload();
        alert(data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err);
      });
  };
  return (
    <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center text-gray-700">Login</h2>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
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
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-100 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center text-gray-600">
        {" "}
        Dont have an account?{" "}
        <button onClick={toggle} className="text-blue-500 hover:underline">
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Login;

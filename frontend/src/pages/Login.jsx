import { useState, useContext } from "react";
import { loginUser } from "../services/auth";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data.user, res.data.token);
      navigate("/");
    } catch (error) {
      console.log("AUTH ERROR:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--base-color)] dark:bg-[var(--base-color-dark)] transition-colors duration-300">
      <div className="bg-white dark:bg-zinc-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 font-poppins text-black dark:text-white">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-black dark:text-gray-200">
              Email
            </label>
            <input
              name="email"
              placeholder="Enter your email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-black dark:text-gray-200">
              Password
            </label>
            <input
              name="password"
              placeholder="Enter your password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all duration-200 ease-linear hover:scale-[1.02]"
          >
            Log In
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

import axios from "axios";
import { Button } from "../component/Button";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react"; // ✅ Add icons

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { username, password });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      alert("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Signin failed:", error);
      alert("Invalid credentials. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Branding Panel */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-indigo-700 to-blue-600 text-white flex-col justify-center px-16 py-12">
        <h1 className="text-4xl font-bold mb-4">🧠 Second Brain</h1>
        <p className="text-lg leading-relaxed text-blue-100">
          Welcome back to your intelligent workspace — where all your thoughts, ideas, 
          and inspirations are securely stored and easy to rediscover.
        </p>
        <div className="mt-8">
          <p className="text-sm text-blue-200">
            Your ideas deserve structure and memory. Let's pick up where you left off.
          </p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Sign in to your <span className="font-medium text-gray-700">Second Brain</span> and continue building smarter habits.
          </p>

          {/* Input fields with icons */}
          <div className="space-y-5">
            {/* Username Field */}
            <div className="relative">
              <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                ref={usernameRef}
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                ref={passwordRef}
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="mt-8">
            <Button
              onClick={signin}
              variant="primary"
              text="Sign In"
              fullWidth={true}
              size="md"
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium hover:underline"
            >
              Create one
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

import { useRef } from "react";
import { Button } from "../component/Button";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, Lock } from "lucide-react"; 

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, { username, password });
      alert("Account created successfully! Please sign in to continue.");
      navigate("/signin");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again later.");
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section – Branding */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex-col justify-center px-16 py-12">
        <h1 className="text-4xl font-bold mb-4">🧠 Second Brain</h1>
        <p className="text-lg leading-relaxed text-blue-100">
          Capture, organize, and rediscover your ideas with AI-powered clarity.  
          Build your second brain for smarter thinking and effortless recall.
        </p>
        <div className="mt-8">
          <p className="text-sm text-blue-200">
            Trusted by learners, creators, and developers worldwide.
          </p>
        </div>
      </div>

      {/* Right Section – Form */}
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-6">
        <div className="w-full max-w-lg bg-white/90 backdrop-blur-xl shadow-2xl rounded-3xl p-12 border border-gray-100">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
            Create your account
          </h2>
          <p className="text-center text-gray-500 text-sm mb-8">
            Join <span className="font-medium text-gray-700">Second Brain</span> to start capturing ideas smarter.
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
              onClick={signup}
              variant="primary"
              text="Sign Up"
              fullWidth={true}
              size="md"
            />
          </div>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/signin")}
              className="text-blue-600 font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

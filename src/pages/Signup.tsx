import { useRef } from "react";
import { Button } from "../component/Button";
import { Input } from "../component/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      alert("You have signed up successfully!");
      navigate('/signin')
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed. Please try again.");
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white rounded-xl border min-w-48 p-8">
        <Input ref={usernameRef} placeholder="Username" type="text"/>
        <Input ref={passwordRef} placeholder="Password" type="password" />
        <div className="flex justify-center pt-4 p-2">
          <Button onClick={signup} variant="primary" text="Signup" fullWidth={true} size={"sm"} />
        </div>
      </div>
    </div>
  );
};

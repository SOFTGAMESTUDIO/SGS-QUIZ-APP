import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../DataBase/firebaseConfig";
import { toast } from "react-toastify";


// Email/password login
export const handleLogin = async (email, password, navigate) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Login successful", {
      position: "top-right",
      autoClose: 2000,
      theme: "colored",
    });
    localStorage.setItem("user", JSON.stringify(result.user));
    navigate("/");
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Invalid credentials. Please try again or sign up.");
  }
};



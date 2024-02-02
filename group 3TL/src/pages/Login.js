//Nguyen Do Nhat Nam-104061616 - Tran Thanh Minh - 103809048
import React, { useEffect, useState } from "react";
import Signupbutton from "../components/Button/Signupbutton";
import { LoginData } from "../data/LoginData";
import { useAuth } from "../contexts/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LoadingContainer from "../components/LoadingContainer";

// Login Component
const Login = () => {
  // Authentication context
  const { login, isAuthenticated } = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  // State for loading indicator
  const [loading, setLoading] = useState(false);

  // State for form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Wait for the login function to complete
      const result = await login(formData);
      // Show success toast
      if (!isAuthenticated && result === undefined) {
        toast.error("Invalid email or password", { toastId: "toast" });
      }
    } catch (error) {
      toast.error(error.message, { toastId: "toast" });
      // Handle the error (optional)
    } finally {
      setLoading(false);
    }
  };

  // Redirect after successful login
  useEffect(() => {
    if (isAuthenticated) {
      // Show success toast for 1 second
      const successToastId = toast.success("Login Successfully", {
        autoClose: 1000,
      });

      // Navigate to settings after the toast is closed
      const timer = setTimeout(() => {
        navigate("/transaction");
      }, 1000);

      // Cleanup the timer on component unmount
      return () => {
        clearTimeout(timer);
        toast.dismiss(successToastId); // Dismiss the toast on unmount
      };
    }
  }, [isAuthenticated, navigate]);

  // JSX rendering
  return (
    <div className="w-auto overflow-hidden flex flex-col">
      {/* Login Header */}
      <h2 className="flex font-bold justify-center text-4xl text-white mt-32 pb-12">
        Login
      </h2>

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="flex flex-col">
        {/* Render input fields dynamically from LoginData */}
        {LoginData.map(({ src, alt, type, id, placeholder }) => (
          <div className="flex justify-center text-2xl text-white m-5" key={id}>
            <img src={src} alt={alt} className="h-14 w-14 mr-4" />
            <input
              type={type}
              id={id}
              name={id}
              placeholder={placeholder}
              onChange={handleChange}
              required
              className="text-black rounded-lg h-15 w-50 bg-white-500 p-2"
            />
          </div>
        ))}

        {/* Loading indicator or Login button */}
        <div className="mt-[35px] flex justify-center items-center h-full text-3xl">
          {loading ? (
            <LoadingContainer />
          ) : (
            <Signupbutton type="submit">Login</Signupbutton>
          )}
        </div>
      </form>

      {/* Toast notification container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
};

export default Login;

//Nguyen Do Nhat Nam-104061616 - Tran Thanh Minh - 103809048
import React, { useState, useEffect } from "react";
import Input from "../components/Input/index.js";
import Signupbutton from "../components/Button/Signupbutton.js";
import Inputs from "../components/Input/input.js";
import { inputFields } from "../data";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import submission from "../utils/SignUpSubmit.js";
import { useAuth } from "../contexts/AuthContext";
import checkPassword from "../utils/checkPassword.js";
import checkEmail from "../utils/checkEmail.js";
import LoadingContainer from "../components/LoadingContainer";
export default function RegisterPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    retypePassword: "",
    email: "",
    phoneNumber: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState({
    password: "",
    retypePassword: "",
    email: "",
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/settings");
    }
  }, [isAuthenticated, navigate]);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleChangenum = (event) => {
    const { name, value } = event.target;
    const filteredValue = value.replace(/\D/g, "");
    setFormData((prevState) => ({ ...prevState, [name]: filteredValue }));
  };

  const handleChangename = (event) => {
    const { name, value } = event.target;
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, "");
    setFormData((prevState) => ({ ...prevState, [name]: filteredValue }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    for (const key in formData) {
      if (formData[key] === "") {
        key === "email" && toast.error(`Email field cannot be empty`);
        key === "phoneNumber" &&
          toast.error(`Phone number field cannot be empty`);
        key === "first_name" && toast.error(`First name field cannot be empty`);
        key === "last_name" && toast.error(`Last name field cannot be empty`);
        key === "username" && toast.error(`Username cannot be empty`);
        key === "retypePassword" &&
          toast.error(`Retype password field cannot be empty`);
        key === "password" && toast.error(`Password field cannot be empty`);
        setLoading(false);
        return;
      }
    }

    const [passwordError, retypePasswordError] = checkPassword(
      formData.password,
      formData.retypePassword
    );

    setError((prevState) => ({
      ...prevState,
      password: passwordError,
      retypePassword: retypePasswordError,
    }));

    const emailError = checkEmail(formData.email);
    setError((prevState) => ({ ...prevState, email: emailError }));

    try {
      if (passwordError[0] || retypePasswordError[1] || emailError) {
        throw new Error("Please fix the errors in the form.");
      }
      const response = await submission("signup", "post", formData);
      // I want to toast for 2 seconds and then navigate to /login

      if (response.error) {
        toast.error(response.error, { toastId: "toast" });
      } else {
        toast.success("Successfully signed up.", { toastId: "toast" });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      toast.error(error.message, { toastId: "toast" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black overflow-hidden text-white flex justify-center items-center mx-auto">
        <div className="">
          {/* Sign Up Header */}
          <h1 className="text-center mb-4 text-[40px]">
            <strong>Sign Up</strong>
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col ">
            {/* username Input */}
            <div className="flex flex-row justify-center items-center ">
              <img
                src="./images/icon/person.png"
                alt="user"
                className="h-14 w-14 mt-2 mr-1"
              />
              <Input
                id="user-name"
                label="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
              />
            </div>

            {/* first_name and Lastname Inputs */}
            <div className="flex flex-row justify-between items-center mt-2 w-auto">
              <div className="flex justify-between md:ml-[4.5rem] sm:ml-[8.6rem] ml-14">
                {/* first_name Input */}
                <img
                  src="./images/icon/person.png"
                  alt="lock"
                  className="h-16 w-16 md:mr-1 md:ml-4 mr-1"
                />
                <div className="ml-3">
                  <Inputs
                    id="firstname"
                    label="Firstname"
                    type="text"
                    pattern="^[a-zA-Z ]*$"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChangename}
                    placeholder="Firstname"
                  />
                </div>
              </div>

              {/* Lastname Input */}
              <div className="sm:mr-[9.5rem] md:mr-[6.8rem] mr-[4.5rem]">
                <Inputs
                  id="lastname"
                  label="Lastname"
                  type="text"
                  pattern="^[a-zA-Z ]*$"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChangename}
                  placeholder="Lastname"
                />
              </div>
            </div>

            {/* Dynamic Input Fields */}
            {inputFields.map((field) => (
              <div key={field.id} className="flex flex-col mt-2">
                <div className="flex flex-row justify-center items-center">
                  <img
                    src={`./images/icon/${field.icon}.png`}
                    alt={field.icon}
                    className="h-16 w-16 mr-1 mt-2"
                  />
                  <Input
                    id={field.id}
                    label={field.label}
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={
                      field.name === "phoneNumber"
                        ? handleChangenum
                        : handleChange
                    }
                    placeholder={field.placeholder}
                  />
                </div>
                {error[field.name] && (
                  <div className="w-3/4 text-red-500 self-center text-center text-wrap">
                    {error[field.name]}
                  </div>
                )}
              </div>
            ))}

            {/* Sign Up Button */}
            <div className="mt-[35px] flex justify-center items-center h-full">
              {loading ? (
                <LoadingContainer />
              ) : (
                <Signupbutton type="submit" className="m-5">
                  Sign Up
                </Signupbutton>
              )}
            </div>
          </form>
        </div>
      </div>{" "}
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </>
  );
}

//Nguyen Do Nhat Nam-104061616 - Tran Thanh Minh - 103809048
import React, { useState } from "react";
import Signupbutton from "../components/Button/Signupbutton";
import { Profilefields } from "../data";
import Transactionsetting from "../components/Transaction/Transactionsetting.js";
import checkEmail from "./../utils/checkEmail";
import checkPassword from "./../utils/checkPassword";
import { ToastContainer, toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";
import submission from "./../utils/SignUpSubmit";
import LoadingContainer from "./../components/LoadingContainer";
function Profile() {
  // State to manage form data
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: user.email,
    phone: user.phone,
    password: "",
    confirmPassword: "",
    difficulty: user.difficulty || 2,
    miningReward: user.miningReward || 0.001,
  });

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    for (const key in form) {
      if (form[key] === "") {
        key === "email" && toast.error("Please enter a valid email");
        key === "phone" && toast.error("Please enter a valid phone number");
        key === "password" && toast.error("Please enter a valid password");
        key === "confirmPassword" && toast.error("Passwords do not match");
        key === "difficulty" &&
          toast.error("Please enter difficulty from 1 - 5");
        key === "miningReward" && toast.error("Please enter a valid reward");
        setLoading(false);
        return;
      }
    }
    if (form.difficulty < 1 || form.difficulty > 5) {
      toast.error("Please enter difficulty from 1 - 5");
      setLoading(false);
      return;
    }
    const emailError = checkEmail(form.email);
    if (emailError) {
      toast.error(emailError, { toastId: "toast" });
    }
    const [passwordError, retypePasswordError] = checkPassword(
      form.password,
      form.confirmPassword
    );
    if (passwordError || retypePasswordError) {
      toast.error(passwordError || retypePasswordError, { toastId: "toast" });
    }
    try {
      if (passwordError || retypePasswordError || emailError) {
        throw new Error("Please fix the errors in the form.");
      }
      await submission("updateProfile", "put", form);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center w-auto overflow-hidden"
      >
        {/* Profile Header */}
        <h1 className="text-3xl text-red-600">Profile settings</h1>
        {/* Profile Fields Section */}
        <div className="flex flex-col p-5">
          {/* Email and Phone Fields */}
          <div className="flex md:flex-row flex-col">
            {Profilefields[0].map((field) => (
              <div
                key={field.name}
                className={`flex ${
                  field.name !== "email" ? "md:ml-10 mt-4 md:mt-0" : ""
                }`}
              >
                <div className="flex flex-col text-2xl">
                  {field.label}:
                  <input
                    className="rounded-lg border-8 w-96 border-white text-black"
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Password Fields */}
          <div className="flex md:flex-row flex-col mt-4">
            {Profilefields[1].map((field) => (
              <div
                key={field.name}
                className={`flex ${
                  field.name !== "password" ? "md:ml-10 mt-4 md:mt-0" : ""
                }`}
              >
                <div className="flex flex-col text-2xl">
                  {field.label}:
                  <input
                    className="rounded-lg border-8 w-96 border-white text-black"
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pt-10">
          <Transactionsetting
            handleChange={handleChange}
            difficulty={form.difficulty}
            miningReward={form.miningReward}
          />
        </div>
        {/* Save Changes Button */}
        <div className="flex justify-center items-center pt-10">
          {loading ? (
            <LoadingContainer />
          ) : (
            <Signupbutton type="submit">Save Changes</Signupbutton>
          )}
        </div>
      </form>
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
    </>
  );
}

export default Profile;

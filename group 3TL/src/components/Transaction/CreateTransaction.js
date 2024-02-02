//Nguyen Do Nhat Nam-104061616 && Tran Thanh Minh - 103809048
import React, { useState } from "react";
import Signupbutton from "../Button/Signupbutton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingContainer from "../LoadingContainer";
import submission from "../../utils/SignUpSubmit";
const CreateTransaction = ({ fromAddress }) => {
  const [form, setForm] = useState({
    fromAddress: fromAddress,
    toAddress: "",
    amount: 0,
  });
  const [loading, setLoading] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (form.amount === "" || form.amount <= 0) {
      toast.error(
        form.amount === ""
          ? "Amount cannot be empty"
          : "Amount must be greater than 0",
        { toastId: "toast" }
      );
      setLoading(false);
      return;
    }

    for (const key in form) {
      if (form[key] === "") {
        toast.error(
          `${key.charAt(0).toUpperCase() + key.slice(1)} field cannot be empty`,
          {
            toastId: "toast",
          }
        );
        setLoading(false);
        return;
      }
    }

    // Access form data using form.fromAddress, form.toAddress, form.amount
    // Implement transaction sending logic here
    try {
      const response = await submission("transaction", "post", form);
      if (!response.error) {
        toast.success("Transaction created successfully", { toastId: "toast" });
      } else {
        toast.error("Failed to create transaction", { toastId: "toast" });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { toastId: "toast" });
    } finally {
      setLoading(false);
    }
    // For example, you can log the form data to the console
  };
  return (
    <>
      <div className="flex flex-col w-auto mx-auto items-center justify-center">
        <h2 className="flex justify-center pt-14 font-bold text-3xl md:text-4xl lg:text-5xl">
          Create Transaction
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-2xl pt-10">
            <label
              className="text-2xl md:text-3xl lg:text-4xl"
              htmlFor="fromAddress"
            >
              From Address
            </label>
            <div className="pt-4">
              <input
                type="text"
                className="text-black rounded-lg border-8 sm:w-[500px] md:w-[900px] w-96 md:h-16 h-10 border-white text-xl md:text-2xl lg:text-3xl"
                id="fromAddress"
                value={form.fromAddress}
                readOnly
              />
            </div>
            <p className="text-sm text-slate-400 md:w-full w-96 pt-2">
              This is your wallet address. You cannot change it because you can
              only spend your own coins.
            </p>
          </div>

          <div className="flex flex-col text-2xl pt-10">
            <label
              className="text-2xl md:text-3xl lg:text-4xl"
              htmlFor="toAddress"
            >
              To Address
            </label>
            <div className="pt-4">
              <input
                type="text"
                className="text-black rounded-lg border-8 sm:w-[500px] md:w-[900px] w-96 md:h-16 h-10 border-white text-xl md:text-2xl lg:text-3xl"
                id="toAddress"
                value={form.toAddress}
                name="toAddress"
                onChange={handleInputChange}
              />
            </div>
            <p className="text-sm text-slate-400 md:w-full w-96 pt-2">
              The address of the wallet where you want to send the money to.
            </p>
            <p className="text-sm text-slate-400 md:w-full w-96 pt-2">
              Note: Please enter the correct address or you will lost all the
              transferring funds.
            </p>
          </div>

          <div className="flex flex-col text-2xl pt-10">
            <label
              className="text-2xl md:text-3xl lg:text-4xl"
              htmlFor="amount"
            >
              Amount (ETH)
            </label>
            <div className="pt-4">
              <input
                type="number"
                className="text-black rounded-lg border-8 sm:w-[500px] md:w-[900px] w-96 md:h-16 h-10 border-white text-xl md:text-2xl lg:text-3xl"
                id="amount"
                value={form.amount}
                name="amount"
                onChange={handleInputChange}
              />
            </div>
            <p className="text-sm text-slate-400 md:w-full w-96 pt-2">
              You can transfer any amount.
            </p>
          </div>

          <div className="flex justify-center pt-10">
            {loading ? (
              <LoadingContainer />
            ) : (
              <Signupbutton type="submit">
                Sign & Create Transaction
              </Signupbutton>
            )}
          </div>
        </form>
      </div>
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
};

export default CreateTransaction;

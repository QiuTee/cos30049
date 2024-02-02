//Nguyen Do Nhat Nam-104061616 - Tran Thanh Minh - 103809048
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import CreateTransaction from "../components/Transaction/CreateTransaction";
const Transaction = () => {
  const { user } = useAuth();
  return (
    <div className="overflow-hidden w-auto">
      <div className="flex flex-col md:flex-row m-4 w-full">
        <div className="basis-1/2 flex flex-col m-4 items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl">
            Your Wallet Address:
          </h2>
          <p className="text-xl sm:text-2xl md:text-2xl">{user.address}</p>
        </div>
        <div className="basis-1/2 flex flex-col m-4 items-center justify-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl">Balance:</h2>
          <p className="text-xl sm:text-2xl md:text-2xl">{user.balance} ETH</p>
        </div>
      </div>
      <div className="flex justify-center">
        <CreateTransaction fromAddress={user.address} />
      </div>
    </div>
  );
};

export default Transaction;

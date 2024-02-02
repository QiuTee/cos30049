//Nguyen Do Nhat Nam-104061616
import React from "react";

const Transactionsetting = ({ handleChange, difficulty, miningReward }) => {
  return (
    <>
      <h1 className="flex items-center justify-center text-3xl text-red-500">
        Transaction settings
      </h1>
      <div className="pt-8">
        <div className="flex flex-col text-2xl">
          <label htmlFor="difficulty">Difficulty</label>
          <input
            className="text-black rounded-lg border-8 md:w-[810px] w-96 border-white "
            type="number"
            id="difficulty"
            name="difficulty"
            value={difficulty}
            onChange={handleChange}
          />
          <p className="text-sm text-slate-400 md:w-full w-96 pt-2">
            Difficulty controls how long the mining process takes. Higher
            numbers will make mining a lot slower!
          </p>
        </div>

        <div className="flex flex-col text-2xl pt-8">
          <label htmlFor="miningReward">Mining reward (ETH)</label>
          <input
            className="text-black rounded-lg border-8 md:w-[810px] w-96 border-white"
            type="number"
            id="miningReward"
            name="miningReward"
            value={miningReward}
            onChange={handleChange}
          />
          <p className="text-sm text-slate-400 md:w-full w-96 pt-2">
            How much reward a miner receives for successfully creating a new
            block for the chain
          </p>
        </div>
      </div>
    </>
  );
};

export default Transactionsetting;

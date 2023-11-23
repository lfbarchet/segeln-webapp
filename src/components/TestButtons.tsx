import { useState } from "react";
//import { useMqttStore } from "@mirevi/puzzlecube-core";

const TestButton = () => {
  // const { client } = useMqttStore();

  const [start, setStart] = useState(false);
  const [stop, setStop] = useState(false);

  const handleStart = () => {
    setStart(!start);
    setStop(false);

    /* let payload = {
      controllable: true,
      state: "STARTED",
    };
    if (client)
      client.publish("puzzleCubes/app/phaseControl", JSON.stringify(payload));*/
  };

  const handleStop = () => {
    setStop(!stop);
    setStart(false);

    /* let payload = {
      controllable: true,
      number: 0,
      state: "STOPPED",
    };
    if (client)
      client.publish("puzzleCubes/app/phaseControl", JSON.stringify(payload));*/
  };

  return (
    <div className="flex flex-col justify-center items-center h-80vh gap-10  ">
      <div className="flex text-8xl gap-10">
        <button
          className={`w-52 border-4 border-black rounded px-2 font-martin tracking-wide ${
            start === true ? " bg-white" : ""
          }`}
          onClick={handleStart}
        >
          START
        </button>
        <button
          className={`w-52 border-4 border-black rounded px-2 font-martin tracking-wide ${
            stop === true ? " bg-white" : ""
          }`}
          onClick={handleStop}
        >
          STOP
        </button>
      </div>
      <div className=" mt-4 bg-white text-black px-4 py-2 rounded max-w-4xl">
        This is the text underneath the buttons. ökahs dfökha sdälkfhä aklsjfaöl
        sfkaös
      </div>
    </div>
  );
};

export default TestButton;

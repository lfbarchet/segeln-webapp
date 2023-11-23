import usePerformanceBotStore from "../../stores/useStore.ts";
import { useCubeStateStore, useMqttStore } from "@mirevi/puzzlecube-core";

const CubeMode = () => {
  const { cubeState } = useCubeStateStore();
  const { findAppState } = usePerformanceBotStore();

  return (
    <>
      <div className="mx-16 mb-6 block w-full h-full">
        <div className="text-white flex flex-wrap gap-8 font-sourceSansPro font-bold">
          {cubeState.map((cube, index) => {
            let appState = findAppState(cube.id);

            return (
              <div key={index}>
                {findAppState(cube.id)?.isRunning && (
                  <div className="w-[320px] h-[320px] bg-cubestate-grey/10 p-[30px]">
                    <p className="tracking-wider uppercase text-2xl">
                      {cube.id} ACTIVE
                    </p>
                  </div>
                )}

                {!findAppState(cube.id)?.isRunning && (
                  <div className="w-[320px] h-[120px] bg-cubestate-grey/10 p-[30px text-center flex items-center">
                    <p className="uppercase text-4xl px-[60px] py-[75px] opacity-50">
                      {cube.id} INACTIVE
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default CubeMode;

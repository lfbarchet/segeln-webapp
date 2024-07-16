import { MqttCommunication } from './MqttCommunication'
import useHelloCubeStore from '../stores/useHelloCubeStore'

/**
 * Test button component
 * @returns JSX.Element
 */
const TestButton = () => {
  const handleEventReceived = (eventMessage) => {
    if (eventMessage && eventMessage.name) {
    }
  }
  const { helloCubes } = useHelloCubeStore()
  const mqttCommunication = MqttCommunication(handleEventReceived)

  /**
   * Handle the click event on the button
   * @returns
   */
  const handleStart = () => mqttCommunication.sendHelloCubes()

  return (
    <div className='flex flex-col justify-center items-center h-80vh gap-10  '>
      <div className='flex flex-col items-center text-8xl'>
        <p className='text-lg italic m-0 p-0'>Click to start</p>
        <button
          className={`w-52 border-8 border-black rounded px-2 font-martin tracking-wide active:bg-white active:transition-all duration-1000`}
          onClick={handleStart}
        >
          START GAME
        </button>
      </div>
      <div className=' mt-4 bg-white text-black px-10 py-2 rounded max-w-4xl max-h-80 overflow-auto'>
        {helloCubes.length > 0 ? (
          helloCubes.map((cube, index) => {
            return (
              <div key={index}>
                <p>{cube.message}</p>
              </div>
            )
          })
        ) : (
          <p>No messages yet.</p>
        )}
      </div>
    </div>
  )
}

export default TestButton

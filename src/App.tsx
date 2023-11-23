import { Connector, useMqttStore } from '@mirevi/puzzlecube-core'
import Header from './components/Header'
import TestButton from './components/TestButtons'
import CubeWindow from './components/cubedisplay/CubeWindow'
import { MqttCommunication } from './components/MqttCommunication'

// The Connector component is the entry point for the puzzlecube-core library.
// It connects to the MQTT broker and handles the communication for the cube state.
// It also provides default functions to send and receive messages.
// The Connector connects to the default broker at 192.168.111.1 on the production server in the puzzlecube network.
// It can be configured to connect to a different broker by passing the brokerUrl as a prop.
// Example: <Connector brokerUrl='localhost:9001' />y

const mqttConfig = {
  username: 'miniwelt',
  password: 'pastelquail546',
}

function App() {
  const { connectionStatus } = useMqttStore()
  const mqttCommunication = MqttCommunication()

  if (connectionStatus === 'connected') {
    mqttCommunication.subsribeAndListenToAppState()
  }

  return (
    <div className='flex relative'>
      <div className='px-7 min-h-screen h-fit bg-fft-yellow flex-1'>
        <Connector
          brokerUrl='ws://localhost:9001'
          options={mqttConfig}
        />
        <Header />
        <TestButton />
        <CubeWindow />
      </div>
    </div>
  )
}

export default App

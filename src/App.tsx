import { Connector, useMqttStore } from '@mirevi/puzzlecube-core'
import Header from './components/Header'
import TestButton from './components/TestButtons'
import CubeWindow from './components/cubedisplay/CubeWindow'
import { MqttCommunication } from './components/MqttCommunication'
import { useState } from 'react'

// The Connector component is the entry point for the puzzlecube-core library.
// It connects to the MQTT broker and handles the communication for the cube state.
// It also provides default functions to send and receive messages.
// The Connector connects to the default broker at 192.168.111.1 on the production server in the puzzlecube network.
// It can be configured to connect to a different broker by passing the brokerUrl as a prop.
// Example: <Connector brokerUrl='localhost:9001' />y

function App() {
  const { connectionStatus } = useMqttStore()
  const mqttCommunication = MqttCommunication()
  const [mqttInitialized, setMqttInitialized] = useState(false)

  // Check the connection status and subscribe to the app state topic and helloCubes topic and listen for messages
  // This is done only once when the connection status changes to connected
  if (connectionStatus === 'connected' && !mqttInitialized) {
    mqttCommunication.subscribeAndListenToAppState()
    setMqttInitialized(true)
  }

  return (
    <div className='flex relative'>
      <div className='px-7 min-h-screen h-fit bg-fft-yellow flex-1'>
        <Connector />
        <Header />
        <TestButton />
        <CubeWindow />
      </div>
    </div>
  )
}

export default App
